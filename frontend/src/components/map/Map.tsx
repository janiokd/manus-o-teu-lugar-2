import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
// @mui
import { Box, Stack, Typography } from '@mui/material';
// config-global
import { MAP_API } from 'src/config-global';
// assets
import MapIcon from 'src/assets/icons/MapIcon';

const center = {
  lat: 37.7749, // Replace with your latitude
  lng: -122.4194, // Replace with your longitude
};

interface MapProps {
  text?: string;
  height?: string;
}

export default function Map({ text, height = '460px' }: MapProps) {
  const apiKey = MAP_API as string;

  const mapOptions = {
    fullscreenControl: false, // Disable fullscreen control
    mapTypeControl: false, // Disable map type selector
    streetViewControl: false, // Disable Street View
    zoomControl: false, // Keep zoom control (optional)
    disableDefaultUI: true,
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '30px',
      }}
    >
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          zoom={12}
          center={center}
          options={mapOptions}
          mapContainerStyle={{ width: '100%', height }}
        >
          {/* Add markers or additional map features here */}
        </GoogleMap>
      </LoadScript>
      {text && (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            position: 'absolute',
            top: 30,
            right: 30,
            px: 2.5,
            py: 1,
            borderRadius: '40px',
            bgcolor: 'secondary.main',
          }}
        >
          <MapIcon />
          <Typography variant="subtitle2" color="primary">
            {text}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
