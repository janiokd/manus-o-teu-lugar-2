import React, { ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
// config-global
import { MAP_API } from 'src/config-global';

interface Props {
  apiKey?: string;
  children: ReactNode;
}

export default function WrappedMapComponent({ apiKey = MAP_API, children }: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
    libraries: ['drawing'],
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>; // Prevents rendering before Google Maps is ready

  return <>{children}</>;
}
