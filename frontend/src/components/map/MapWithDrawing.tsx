import React, { useState, useEffect, useRef } from 'react';
import {
  Marker,
  GoogleMap,
  LoadScript,
  DrawingManager,
  InfoWindow,
} from '@react-google-maps/api';
// @mui
import { Box, Stack, Typography } from '@mui/material';
// config-global
import { MAP_API, HOST_API } from 'src/config-global';
// assets
import MapIcon from 'src/assets/icons/MapIcon';
import RoundButton from '../customs/RoundButton';

export const center = {
  lat: -19.9167, // Belo Horizonte, Brasil
  lng: -43.9345,
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
        } /*  else {
          reject('Geocoder failed: ' + status);
        } */
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
  fullscreenControl: false, // Disable fullscreen control
  mapTypeControl: false, // Disable map type selector
  streetViewControl: false, // Disable Street View
  zoomControl: false, // Keep zoom control (optional)
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

  const [zoomLevel, setZoomLevel] = useState(8);

  const [shapes, setShapes] = useState<any[]>([]);

  const [location, setLocation] = useState<{ lat: number; lng: number }>(center);

  const [selectedTool, setSelectedTool] = useState<google.maps.drawing.OverlayType | null>(null);

  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

  // Estados para imóveis no mapa
  const [properties, setProperties] = useState<PropertyMapData[]>([]);
  const [allProperties, setAllProperties] = useState<PropertyMapData[]>([]); // Backup de todos os imóveis
  const [selectedProperty, setSelectedProperty] = useState<PropertyMapData | null>(null);
  const [loadingProperties, setLoadingProperties] = useState(false);

  // Função para resetar filtros e mostrar todos os imóveis
  const resetFilters = () => {
    setProperties(allProperties);
    // Limpar todas as formas desenhadas
    shapes.forEach(({ shape }) => {
      if (shape && shape.setMap) {
        shape.setMap(null);
      }
    });
    setShapes([]);
    // Voltar para o centro de Belo Horizonte
    setLocation(center);
    setZoomLevel(8);
    console.log('Filtros resetados, mostrando todos os imóveis');
  };

  useEffect(() => {
    if (defaultLocation && defaultLocation?.geometry?.location) {
      setLocation({
        lat: defaultLocation.geometry.location.lat(),
        lng: defaultLocation.geometry.location.lng(),
      })
      setMarkerPosition({
        lat: defaultLocation.geometry.location.lat(),
        lng: defaultLocation.geometry.location.lng(),
      })
    }
  }, [defaultLocation])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          // setMarkerPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Carregar imóveis da API
  useEffect(() => {
    const loadProperties = async () => {
      setLoadingProperties(true);
      try {
        const response = await fetch(`${HOST_API}/api/property`);
        const propertiesData = await response.json();
        
        // Geocodificar endereços para obter coordenadas
        const propertiesWithCoords = await Promise.all(
          propertiesData.map(async (property: any) => {
            let lat = property.latitude;
            let lng = property.longitude;
            
            // Se não tem coordenadas salvas, geocodificar o endereço
            if (!lat || !lng) {
              const coords = await getLatLngFromAddress(property.address);
              if (coords) {
                lat = coords.lat;
                lng = coords.lng;
              }
            }
            
            return {
              id: property.id,
              title: property.title,
              price: property.price,
              address: property.address,
              latitude: lat,
              longitude: lng,
              type: property.type,
              neighborhood: typeof property.neighborhood === 'string' 
                ? property.neighborhood 
                : property.neighborhood?.name || 'N/A'
            };
          })
        );
        
        // Filtrar apenas imóveis com coordenadas válidas
        const validProperties = propertiesWithCoords.filter(
          (property) => property.latitude && property.longitude
        );
        
        setProperties(validProperties);
        setAllProperties(validProperties); // Salvar backup
        console.log('Imóveis carregados:', validProperties);
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      } finally {
        setLoadingProperties(false);
      }
    };

    loadProperties();
  }, []);

  useEffect(() => {
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setOptions({
        polygonOptions: {
          fillColor: selectedTool === 'polygon' ? selectedColor : defaultColor,
          strokeColor: selectedTool === 'polygon' ? selectedColor : defaultColor,
          fillOpacity: 0.5,
          strokeWeight: 2,
        },
        polylineOptions: {
          strokeColor: selectedTool === 'polyline' ? selectedColor : defaultColor,
          strokeWeight: 3,
        },
        rectangleOptions: {
          fillColor: selectedTool === 'rectangle' ? selectedColor : defaultColor,
          strokeColor: selectedTool === 'rectangle' ? selectedColor : defaultColor,
          fillOpacity: 0.5,
          strokeWeight: 2,
        },
        circleOptions: {
          fillColor: selectedTool === 'circle' ? selectedColor : defaultColor,
          strokeColor: selectedTool === 'circle' ? selectedColor : defaultColor,
          fillOpacity: 0.5,
          strokeWeight: 2,
        },
      });
    }
  }, [selectedTool]);

  // const addCustomVertex = (
  //   polygon: google.maps.Polygon,
  //   latLng: google.maps.LatLng,
  //   index: number
  // ) => {
  //   const marker = new google.maps.Marker({
  //     position: latLng,
  //     map: polygon.getMap(),
  //     icon: {
  //       path: google.maps.SymbolPath.CIRCLE,
  //       scale: 8, // Size of the vertex
  //       strokeColor: '#FF0000',
  //       strokeWeight: 2,
  //       fillColor: '#FFFFFF',
  //       fillOpacity: 1,
  //     },
  //     draggable: true, // Allow moving the vertex
  //   });

  //   // Move the vertex when dragged
  //   marker.addListener('drag', () => {
  //     polygon.getPath().setAt(index, marker.getPosition() as google.maps.LatLng);
  //   });
  // };

  const addDeleteIcon = (
    polygon: google.maps.Polygon,
    latLng: google.maps.LatLng,
    index: number
  ) => {
    const deleteMarker = new google.maps.Marker({
      position: latLng,
      map: polygon.getMap(),
      icon: {
        url: 'https://cdn-icons-png.flaticon.com/512/61/61155.png', // Replace with your custom delete icon
        scaledSize: new google.maps.Size(16, 16), // Adjust icon size
        anchor: new google.maps.Point(8, 8),
      },
    });

    // Click event to remove the polygon
    deleteMarker.addListener('click', () => {
      polygon.setMap(null); // Remove the polygon
      deleteMarker.setMap(null); // Remove the delete button
    });
  };

  const handleMapClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Decrease zoom level when clicking (max is typically 12)
      setZoomLevel((prevZoom) => Math.min(prevZoom - 1, 12)); // Prevent exceeding min zoom
      setLocation({ lat, lng }); // Center map on clicked location
    }
  };

  const handleMapRightClick = async (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // setMarkerPosition({ lat, lng });
      const address = await getAddressFromLatLng(lat, lng);
      setAddress(address);

      // Increase zoom level when clicking (max is typically 21)
      setZoomLevel((prevZoom) => Math.min(prevZoom + 1, 21)); // Prevent exceeding max zoom
      setLocation({ lat, lng }); // Center map on clicked location
    }
  };

  // Função para verificar se um ponto está dentro de um polígono
  const isPointInPolygon = (point: { lat: number; lng: number }, polygon: google.maps.Polygon) => {
    const path = polygon.getPath();
    const latLng = new google.maps.LatLng(point.lat, point.lng);
    return google.maps.geometry.poly.containsLocation(latLng, polygon);
  };

  // Função para filtrar imóveis por área desenhada
  const filterPropertiesByArea = (shape: any, shapeType: string) => {
    if (!allProperties.length) return;

    let filteredProperties: PropertyMapData[] = [];

    if (shapeType === 'polygon' && shape instanceof google.maps.Polygon) {
      // Filtrar imóveis dentro do polígono
      filteredProperties = allProperties.filter(property => {
        if (!property.latitude || !property.longitude) return false;
        return isPointInPolygon(
          { lat: property.latitude, lng: property.longitude },
          shape
        );
      });
    } else if (shapeType === 'rectangle' && shape instanceof google.maps.Rectangle) {
      // Filtrar imóveis dentro do retângulo
      const bounds = shape.getBounds();
      if (bounds) {
        filteredProperties = allProperties.filter(property => {
          if (!property.latitude || !property.longitude) return false;
          const point = new google.maps.LatLng(property.latitude, property.longitude);
          return bounds.contains(point);
        });
      }
    } else if (shapeType === 'circle' && shape instanceof google.maps.Circle) {
      // Filtrar imóveis dentro do círculo
      const center = shape.getCenter();
      const radius = shape.getRadius();
      if (center) {
        filteredProperties = allProperties.filter(property => {
          if (!property.latitude || !property.longitude) return false;
          const point = new google.maps.LatLng(property.latitude, property.longitude);
          const distance = google.maps.geometry.spherical.computeDistanceBetween(center, point);
          return distance <= radius;
        });
      }
    }

    console.log(`Imóveis encontrados na área: ${filteredProperties.length}`, filteredProperties);
    
    // Atualizar estado para mostrar apenas imóveis filtrados
    setProperties(filteredProperties);
    
    // Se encontrou imóveis, centralizar mapa na primeira propriedade
    if (filteredProperties.length > 0) {
      const firstProperty = filteredProperties[0];
      if (firstProperty.latitude && firstProperty.longitude) {
        setLocation({
          lat: firstProperty.latitude,
          lng: firstProperty.longitude
        });
        setZoomLevel(13); // Zoom mais próximo para ver os imóveis
      }
    }
  };

  const onOverlayComplete = (event: google.maps.drawing.OverlayCompleteEvent) => {
    const newShape = event.overlay;
    const shapeType = event.type;

    // Store the drawn shape
    setShapes((prevShapes) => [...prevShapes, { type: shapeType, shape: newShape }]);
    
    // Filtrar imóveis pela área desenhada
    filterPropertiesByArea(newShape, shapeType);
    
    console.log('Shape Drawn:', shapeType, newShape);
    console.log('Filtering properties by drawn area...');
  };

  const onShapeComplete = async (
    shape:
      | google.maps.Polygon
      | google.maps.Rectangle
      | google.maps.Circle
      | google.maps.Polyline
      | google.maps.Marker
  ) => {
    drawingManagerRef.current?.setDrawingMode(null);

    let locations: google.maps.LatLng[] = [];

    if (shape instanceof google.maps.Polygon) {
      locations = shape.getPath().getArray();
      drawingManagerRef.current?.setDrawingMode(null);

      const path = shape.getPath();
      let topVertexIndex = 0;
      let topVertex = path.getAt(0);

      path.forEach((vertex, index) => {
        if (vertex.lat() > topVertex.lat()) {
          topVertex = vertex;
          topVertexIndex = index;
        }

        // addCustomVertex(shape, vertex, index);
      });

      addDeleteIcon(shape, topVertex, topVertexIndex);

      // google.maps.event.addListener(path, 'set_at', (index: number) => {
      //   addCustomVertex(shape, path.getAt(index), index);
      // });

      // google.maps.event.addListener(path, 'insert_at', (index: number) => {
      //   addCustomVertex(shape, path.getAt(index), index);
      // });
    } else if (shape instanceof google.maps.Rectangle) {
      const bounds = shape.getBounds();
      if (bounds) {
        locations = [bounds.getNorthEast(), bounds.getSouthWest()];
      }
    } else if (shape instanceof google.maps.Circle) {
      const latLng = shape.getCenter();
      if (latLng) {
        locations = [latLng];
      }
    } else if (shape instanceof google.maps.Polyline) {
      locations = shape.getPath().getArray();
    } else if (shape instanceof google.maps.Marker) {
      const position = shape.getPosition();
      if (position) {
        locations = [position];
        setMarkerPosition({ lat: position.lat(), lng: position.lng() }); // Store marker position
      }
    }

    // Fetch addresses for drawn locations
    try {
      const addressResults = await Promise.all(
        locations.map((item) => getAddressFromLatLng(item.lat(), item.lng()))
      );
      setAddresses(addressResults);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrawingModeChanged = () => {
    if (drawingManagerRef.current) {
      const mode = drawingManagerRef.current.getDrawingMode();

      setSelectedTool(mode);
    }
  };

  const handleDrawingMode = () => {
    if (drawingManagerRef.current) {
      drawingManagerRef.current.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng }); // Update the marker position
      getAddressFromLatLng(lat, lng).then(setAddress); // Optionally update the address
    }
  };


  return (
    <LoadScript googleMapsApiKey={MAP_API || ''} libraries={['drawing', 'places', 'geometry']}>
      <Box
        sx={{
          bgcolor: 'white',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '30px',
        }}
      >
        <GoogleMap
          zoom={zoomLevel}
          center={location}
          options={mapOptions}
          mapContainerStyle={{ width: '100%', height }}
          onLoad={(map) => {
            mapRef.current = map;
          }}
          onClick={handleMapClick}
          onRightClick={handleMapRightClick}
        >
          <DrawingManager
            onLoad={(dm) => {
              drawingManagerRef.current = dm;
              dm.addListener('drawingmode_changed', handleDrawingModeChanged);
            }}
            onOverlayComplete={onOverlayComplete}
            onRectangleComplete={onShapeComplete}
            onCircleComplete={onShapeComplete}
            onPolygonComplete={onShapeComplete}
            onPolylineComplete={onShapeComplete}
            onMarkerComplete={onShapeComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                // position: google.maps.ControlPosition.TOP_CENTER,
              },
            }}
          />
          {/* <Marker position={location} /> */}
          {markerPosition ? <Marker position={markerPosition} draggable onDragEnd={handleMarkerDragEnd} /> : null}
          
          {/* Marcadores dos imóveis */}
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.latitude!,
                lng: property.longitude!,
              }}
              onClick={() => setSelectedProperty(property)}
              icon={{
                url: 'data:image/svg+xml;base64,' + btoa(`
                  <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="#FF6B35"/>
                    <circle cx="15" cy="15" r="8" fill="white"/>
                    <text x="15" y="19" text-anchor="middle" font-size="10" font-weight="bold" fill="#FF6B35">R$</text>
                  </svg>
                `),
                scaledSize: new google.maps.Size(30, 40),
                anchor: new google.maps.Point(15, 40),
              }}
            />
          ))}
          
          {/* InfoWindow para mostrar detalhes do imóvel */}
          {selectedProperty && (
            <InfoWindow
              position={{
                lat: selectedProperty.latitude!,
                lng: selectedProperty.longitude!,
              }}
              onCloseClick={() => setSelectedProperty(null)}
            >
              <Box sx={{ minWidth: 200, p: 1 }}>
                <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 'bold', mb: 1 }}>
                  {selectedProperty.title}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', mb: 0.5 }}>
                  {selectedProperty.address}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', mb: 0.5 }}>
                  Tipo: {selectedProperty.type}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px', mb: 0.5 }}>
                  Bairro: {selectedProperty.neighborhood}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    color: '#FF6B35',
                    mt: 1 
                  }}
                >
                  R$ {Number(selectedProperty.price).toLocaleString('pt-BR')}
                </Typography>
              </Box>
            </InfoWindow>
          )}
        </GoogleMap>
        {text && (
          <Stack
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
            sx={{
              top: '30px',
              right: '30px',
              borderRadius: '40px',
              position: 'absolute',
            }}
          >
            <RoundButton
              size="large"
              color="secondary"
              variant="contained"
              startIcon={<MapIcon />}
              onClick={handleDrawingMode}
            >
              {text}
            </RoundButton>
            
            {shapes.length > 0 && (
              <RoundButton
                size="medium"
                color="primary"
                variant="outlined"
                onClick={resetFilters}
                sx={{ 
                  backgroundColor: 'white',
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                Limpar Filtros ({properties.length} imóveis)
              </RoundButton>
            )}
          </Stack>
        )}
      </Box>
    </LoadScript>
  );
}
