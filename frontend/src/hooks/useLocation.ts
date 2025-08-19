'use client';

import { useState, useMemo } from 'react';
import { State, City, IState, ICity } from 'country-state-city';

type INeighborhood = {
  label: string;
  value: string;
};

interface ReturnType {
  states: IState[];
  cities: ICity[];
  neighborhoods: INeighborhood[];
  getNeighborhoods: (lat: number, lng: number) => Promise<void>;
  setNeighborhoods: React.Dispatch<React.SetStateAction<INeighborhood[]>>;
}

export function useLocation(): ReturnType {
  const [neighborhoods, setNeighborhoods] = useState<INeighborhood[]>([]);

  // Only get Brazilian states and cities once using useMemo
  const states = useMemo(() => State.getStatesOfCountry('BR'), []);
  const cities = useMemo(() => City.getCitiesOfCountry('BR') || [], []);

  // Reverse geocode lat/lng to get city/state
  const reverseGeocode = async (lat: number, lon: number) => {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`, {
      headers: {
        'User-Agent': 'YourApp/1.0 (email@example.com)',
      },
    });

    if (!res.ok) throw new Error('Reverse geocoding failed');

    const data = await res.json();
    return {
      city: data.address.city || data.address.town || data.address.village,
      state: data.address.state,
    };
  };

  // Get city ID from city + state name
  const getCityIdFromName = async (cityName: string, stateName: string) => {
    const stateRes = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const statesList = await stateRes.json();

    const matchedState = statesList.find((s: any) => s.nome.toLowerCase() === stateName.toLowerCase());
    if (!matchedState) return null;

    const cityRes = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${matchedState.id}/municipios`);
    const citiesList = await cityRes.json();

    const matchedCity = citiesList.find((c: any) => c.nome.toLowerCase() === cityName.toLowerCase());
    return matchedCity?.id || null;
  };

  // Get neighborhoods from city ID
  const getNeighborhoodsFromCityId = async (cityId: number) => {
    const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cityId}/distritos`);
    if (!res.ok) throw new Error('Failed to fetch districts');

    const districts = await res.json();
    return districts.map((d: any) => ({
      label: d.nome,
      value: d.nome,
    }));
  };

  // Main function to call
  const getNeighborhoods = async (lat: number, lng: number) => {
    if (!lat || !lng) return;

    try {
      const { city, state } = await reverseGeocode(lat, lng);
      if (!city || !state) throw new Error('Invalid location data');

      const cityId = await getCityIdFromName(city, state);
      if (!cityId) throw new Error('City ID not found');

      const neighborhoodsData = await getNeighborhoodsFromCityId(cityId);
      console.log("neighborhood", neighborhoodsData)
      setNeighborhoods(neighborhoodsData);
    } catch (err) {
      console.error('getNeighborhoods error:', err);
      setNeighborhoods([]);
    }
  };

  return {
    states,
    cities,
    neighborhoods,
    getNeighborhoods,
    setNeighborhoods,
  };
}
