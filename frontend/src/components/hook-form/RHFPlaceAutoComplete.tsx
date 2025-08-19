import React, { useState, useRef, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { Box, TextField, TextFieldProps, MenuItem, Paper, ClickAwayListener } from '@mui/material';
import { Autocomplete, LoadScript } from '@react-google-maps/api';
// locales
import { useLocales } from 'src/locales';
// assets
import MapIcon from 'src/assets/icons/MapIcon';
import LocationIcon from 'src/assets/icons/LocationIcon';
// config-global
import { HEADER, MAP_API } from 'src/config-global';
//
import { center } from '../map/MapWithDrawing';

type Props = TextFieldProps & {
  name: string;
  label: string;
  onSelectPlace?: (value: google.maps.places.PlaceResult) => void;
};

export default function RHFPlaceAutoComplete({ name, label, onSelectPlace, ...other }: Props) {
  const { t } = useLocales();
  const { control, setValue, watch } = useFormContext();

  const values = watch();

  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [inputValue, setInputValue] = useState('');
  const [showPredefined, setShowPredefined] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>(center);

  const movingScroll = () => {
    setShowPredefined(false);

    const mapElement = document.getElementById('mapWithDrawing');
    if (mapElement) {
      const topOffset = mapElement.offsetTop; // Get the top position of the element
      window.scrollTo({
        top: topOffset - 250,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: HEADER.H_DASHBOARD_DESKTOP,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleFocus = () => {
    if (!inputValue) setShowPredefined(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(newValue);

    if (newValue) {
      setShowPredefined(false);
    } else {
      setShowPredefined(true);
    }
  };

  const handleSelect = (selectedValue: string, onChange: (value: string) => void) => {
    setInputValue(selectedValue);
    onChange(selectedValue);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !values.location) {
      event.preventDefault();

      setShowPredefined(false);

      const geocoder = new google.maps.Geocoder();

      await geocoder.geocode(
        { location },
        (results: google.maps.GeocoderResult[] | null, status: string) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;

            setValue('location', address);

            results[0].address_components.forEach((component) => {
              if (component.types.includes('locality') || component.types.includes('sublocality')) {
                const city = component.long_name;
                setValue('city', city);
              }
              if (component.types.includes('administrative_area_level_1')) {
                const state = component.long_name;
                setValue('state', state);
              }
              if (component.types.includes('neighborhood')) {
                const neighborhood = component.long_name;
                setValue('neighborhood', neighborhood);
              }
            });
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey={MAP_API || ''} libraries={['drawing', 'places']}>
      <Box sx={{ width: 1, position: 'relative' }}>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onLoad={(ref) => {
                autocompleteRef.current = ref;
                if (ref) {
                  ref.setOptions({ componentRestrictions: { country: 'BR' } });
                }
              }}
              onPlaceChanged={() => {
                if (autocompleteRef.current) {
                  const place = autocompleteRef.current.getPlace();
                  if (place?.formatted_address) {
                    handleSelect(place.formatted_address, onChange);
                  }
                  if (place && onSelectPlace) {
                    onSelectPlace(place);
                  }
                }
              }}
            >
              <ClickAwayListener onClickAway={() => setShowPredefined(false)}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    fullWidth
                    value={value}
                    label={label}
                    variant="standard"
                    inputRef={inputRef}
                    placeholder={label}
                    onChange={(e) => handleInputChange(e, onChange)}
                    onClick={handleFocus}
                    inputProps={{
                      sx: {
                        fontWeight: 400,
                        fontSize: '14px',
                        color: 'text.secondary',
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                      sx: {
                        fontWeight: 600,
                        fontSize: '19px',
                        color: 'text.primary',
                      },
                    }}
                    onKeyDown={handleKeyDown}
                    {...other}
                  />

                  {/* Predefined Options - Shown on Focus */}
                  {showPredefined && (
                    <Paper sx={{ position: 'absolute', width: '100%', zIndex: 10 }}>
                      <MenuItem
                        onClick={() => {
                          setShowPredefined(false);
                          inputRef.current?.focus();
                        }}
                      >
                        <LocationIcon sx={{ pr: 1, ml: -1 }} />
                        {t('write_location')}
                      </MenuItem>
                      <MenuItem onClick={() => movingScroll()}>
                        <MapIcon sx={{ pr: 1, ml: -1 }} />
                        {t('draw_location')}
                      </MenuItem>
                    </Paper>
                  )}
                </Box>
              </ClickAwayListener>
            </Autocomplete>
          )}
        />
      </Box>
    </LoadScript>
  );
}
