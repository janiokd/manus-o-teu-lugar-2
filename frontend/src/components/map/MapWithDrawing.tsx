import {
  Marker,
  GoogleMap,
  DrawingManager,
  InfoWindow,
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
// @mui
import { Box, Stack, Typography, Button, CircularProgress } from '@mui/material';
// config-global
import { MAP_API, HOST_API } from 'src/config-global';
// assets
import MapIcon from 'src/assets/icons/MapIcon';
import RoundButton from '../customs/RoundButton';

// Centro padrão mundial (será substituído por geolocalização)
export const defaultCenter = {
  lat: 0, // Centro mundial
  lng: 0,
};

// Função para obter localização por IP
const getLocationByIP = async (): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    if (data.latitude && data.longitude) {
      console.log('IP Geolocation success:', data.latitude, data.longitude, data.city, data.country);
      return {
        lat: parseFloat(data.latitude),
        lng: parseFloat(data.longitude),
      };
    }
  } catch (error) {
    console.error('IP Geolocation failed:', error);
  }
  
  // Fallback para Brasil se IP geolocation falhar
  return {
    lat: -14.2350, // Centro do Brasil
    lng: -51.9253,
  };
};

// Interface para dados dos imóveis no mapa
interface PropertyMapData {
  id: string;
  title: string;
  price: string;
  address: string;
  latitude?: number;
  longitude?: number;
  type: string;
  neighborhood: string;
}

export const getAddressFromLatLng = (lat: number, lng: number) => {
  const geocoder = new google.maps.Geocoder();
  const latLng = { lat, lng };

  return new Promise<string>((resolve, reject) => {
    geocoder.geocode(
      { location: latLng },
      (results: google.maps.GeocoderResult[] | null, status: string) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].formatted_address);
        }
      }
    );
  });
};

// Função para geocodificar endereço para coordenadas
export const getLatLngFromAddress = (address: string) => {
  const geocoder = new google.maps.Geocoder();

  return new Promise<{ lat: number; lng: number } | null>((resolve) => {
    geocoder.geocode(
      { address: address },
      (results: google.maps.GeocoderResult[] | null, status: string) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.log('Geocoding failed for address:', address, 'Status:', status);
          resolve(null);
        }
      }
    );
  });
};

interface MapProps {
  text?: string;
  height?: string;
  location?: google.maps.places.PlaceResult | null;
  setAddress: (address: string) => void;
  setAddresses: (addresses: string[]) => void;
}

const mapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
  disableDefaultUI: true,
};

export default function MapWithDrawing({
  text,
  height = '460px',
  setAddress,
  setAddresses,
  location: defaultLocation,
}: MapProps) {
  const defaultColor = '#000000';
  const selectedColor = '#FF0000';

  const mapRef = useRef<google.maps.Map | null>(null);
  const drawingManagerRef = useRef<google.maps.drawing.DrawingManager | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Estados
  const [location, setLocation] = useState<{ lat: number; lng: number }>(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [shapes, setShapes] = useState<google.maps.drawing.OverlayCompleteEvent[]>([]);
  const [properties, setProperties] = useState<PropertyMapData[]>([]);
  const [allProperties, setAllProperties] = useState<PropertyMapData[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyMapData | null>(null);
  const [loadingProperties, setLoadingProperties] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(10);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [locationSource, setLocationSource] = useState<'browser' | 'ip' | 'fallback'>('fallback');

  // Função para obter localização inteligente
  const getSmartLocation = async () => {
    setIsLocationLoading(true);
    
    // Tentar geolocalização do browser primeiro
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true,
            maximumAge: 300000 // 5 minutos
          });
        });
        
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        console.log('Browser Geolocation success:', newLocation);
        setLocation(newLocation);
        setLocationSource('browser');
        setZoomLevel(12);
        setIsLocationLoading(false);
        return;
      } catch (error) {
        console.log('Browser Geolocation failed:', error);
      }
    }
    
    // Fallback para IP geolocation
    try {
      const ipLocation = await getLocationByIP();
      if (ipLocation) {
        console.log('Using IP Geolocation:', ipLocation);
        setLocation(ipLocation);
        setLocationSource('ip');
        setZoomLevel(10);
      }
    } catch (error) {
      console.error('All geolocation methods failed:', error);
      // Usar centro do Brasil como último recurso
      setLocation({ lat: -14.2350, lng: -51.9253 });
      setLocationSource('fallback');
      setZoomLevel(5);
    }
    
    setIsLocationLoading(false);
  };

  // Função para solicitar localização manual
  const requestBrowserLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setLocationSource('browser');
          setZoomLevel(12);
          setIsLocationLoading(false);
          console.log('Manual browser location success:', newLocation);
        },
        (error) => {
          console.error('Manual browser location failed:', error);
          setIsLocationLoading(false);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    }
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setProperties(allProperties);
    shapes.forEach((event) => {
      if (event.overlay && event.overlay.setMap) {
        event.overlay.setMap(null);
      }
    });
    setShapes([]);
    setZoomLevel(8);
  };

  // Effect para localização padrão
  useEffect(() => {
    if (defaultLocation && defaultLocation.geometry) {
      setLocation({
        lat: defaultLocation.geometry.location.lat(),
        lng: defaultLocation.geometry.location.lng(),
      });
      setMarkerPosition({
        lat: defaultLocation.geometry.location.lat(),
        lng: defaultLocation.geometry.location.lng(),
      });
    }
  }, [defaultLocation]);

  // Effect para geolocalização inteligente
  useEffect(() => {
    getSmartLocation();
  }, []);

  // Carregar imóveis da API
  useEffect(() => {
    const loadProperties = async () => {
      setLoadingProperties(true);
      try {
        const response = await fetch(`${HOST_API}/api/property`);
        const propertiesData = await response.json();
        
        const propertiesWithCoords = await Promise.all(
          propertiesData.map(async (property: any) => {
            let lat = property.latitude;
            let lng = property.longitude;

            if (!lat || !lng) {
              const coords = await getLatLngFromAddress(property.address);
              if (coords) {
                lat = coords.lat;
                lng = coords.lng;
              }
            }

            return {
              id: property._id,
              title: property.title,
              price: property.price,
              address: property.address,
              latitude: lat,
              longitude: lng,
              type: property.type,
              neighborhood: property.neighborhood,
            };
          })
        );

        const validProperties = propertiesWithCoords.filter(
          (property) => property.latitude && property.longitude
        );

        setProperties(validProperties);
        setAllProperties(validProperties);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoadingProperties(false);
      }
    };

    loadProperties();
  }, []);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const onDrawingManagerLoad = (drawingManager: google.maps.drawing.DrawingManager) => {
    drawingManagerRef.current = drawingManager;
  };

  const onOverlayComplete = (event: google.maps.drawing.OverlayCompleteEvent) => {
    setShapes((prevShapes) => [...prevShapes, event]);

    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay as google.maps.Polygon;
      const path = polygon.getPath();
      const coordinates: google.maps.LatLng[] = [];

      for (let i = 0; i < path.getLength(); i++) {
        coordinates.push(path.getAt(i));
      }

      const filteredProperties = allProperties.filter((property) => {
        if (property.latitude && property.longitude) {
          const propertyLatLng = new google.maps.LatLng(property.latitude, property.longitude);
          return google.maps.geometry.poly.containsLocation(propertyLatLng, polygon);
        }
        return false;
      });

      setProperties(filteredProperties);

      const addresses = filteredProperties.map((property) => property.address);
      setAddresses(addresses);

      if (addresses.length > 0) {
        setAddress(addresses[0]);
      }
    }
  };

  const getLocationStatusText = () => {
    if (isLocationLoading) return 'Detectando sua localização...';
    
    switch (locationSource) {
      case 'browser':
        return 'Usando sua localização atual';
      case 'ip':
        return 'Localização baseada no seu IP';
      case 'fallback':
        return 'Localização padrão (Brasil)';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Status da localização */}
      <Box sx={{ 
        position: 'absolute', 
        top: 10, 
        left: 10, 
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 1,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {isLocationLoading && <CircularProgress size={16} />}
        <Typography variant="caption">
          {getLocationStatusText()}
        </Typography>
        {locationSource !== 'browser' && (
          <Button 
            size="small" 
            variant="outlined" 
            onClick={requestBrowserLocation}
            disabled={isLocationLoading}
          >
            Usar minha localização
          </Button>
        )}
      </Box>

      {/* Controles do mapa */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <RoundButton onClick={resetFilters}>
          <MapIcon />
        </RoundButton>
      </Stack>

      <GoogleMap
        mapContainerStyle={{ width: '100%', height }}
        center={location}
        zoom={zoomLevel}
        onLoad={onLoad}
        options={mapOptions}
      >
        <DrawingManager
          onLoad={onDrawingManagerLoad}
          onOverlayComplete={onOverlayComplete}
          options={{
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.POLYGON],
            },
            polygonOptions: {
              fillColor: selectedColor,
              fillOpacity: 0.2,
              strokeWeight: 2,
              strokeColor: selectedColor,
              clickable: false,
              editable: true,
              zIndex: 1,
            },
          }}
        />

        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${selectedColor}"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(24, 24),
            }}
          />
        )}

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={{ lat: property.latitude!, lng: property.longitude! }}
            onClick={() => setSelectedProperty(property)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="${defaultColor}"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(20, 20),
            }}
          />
        ))}

        {selectedProperty && (
          <InfoWindow
            position={{ lat: selectedProperty.latitude!, lng: selectedProperty.longitude! }}
            onCloseClick={() => setSelectedProperty(null)}
          >
            <Box sx={{ maxWidth: 200 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {selectedProperty.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedProperty.address}
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="primary">
                {selectedProperty.price}
              </Typography>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>

      {text && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            backgroundColor: 'primary.main',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
            zIndex: 1000,
          }}
        >
          <Typography variant="body2">{text}</Typography>
        </Box>
      )}
    </Box>
  );
}

