import { useEffect } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, MenuItem, Typography, InputAdornment } from '@mui/material';
// hooks
import { useLocation } from 'src/hooks/useLocation';
// locales
import { useLocales } from 'src/locales';
// config-global
import { HEADER } from 'src/config-global';
// assets
import { categories } from 'src/assets/data';
// components
import {
  RHFTextField,
  RHFMultiSelect,
  RHFNumberField,
  RHFAutocomplete,
  RHFPlaceAutoComplete,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function PropertisePage() {
  const { t } = useLocales();
  const { watch } = useFormContext();

  const { cities, states, neighborhoods, getNeighborhoods } = useLocation();

  const values = watch();

  const scrollToTop = () => {
    window.scrollTo({
      top: HEADER.H_DASHBOARD_DESKTOP,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    if (values.location === 'draw_location') {
      scrollToTop();
    }
  }, [values.location]);

  useEffect(() => {
    if (values.city?.lat && values.city?.lng) {
      getNeighborhoods(values.city?.lat, values.city?.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.city]);

  return (
    <Stack spacing={2} sx={{ width: 1 }}>
      <RHFTextField
        name="keyword"
        label={t(`propertiesPage.keyword`)}
        variant="standard"
        placeholder={t(`Palavra-chave`)}
      />
      <RHFMultiSelect
        // chip
        checkbox
        name="categories"
        label={t(`category`)}
        placeholder={t(`select`)}
        variant="standard"
        options={categories.map((category) => ({ ...category, label: t(category.label) }))}
      />
      <RHFPlaceAutoComplete name="location" label={t(`location`)} />

      <RHFAutocomplete
        name="state"
        label={t(`state`)}
        placeholder={t(`select`)}
        options={states.map((state) => ({
          label: `${state.name} (${state.isoCode})`,
          value: state.isoCode,
        }))}
        renderOption={(props, option) => (
          <MenuItem key={option.value} {...props}>
            {option.label}
          </MenuItem>
        )}
      />

      <RHFAutocomplete
        name="city"
        label={t(`city`)}
        placeholder={t(`select`)}
        options={cities
          .filter((city) => city.stateCode === values.state?.value)
          .map((c) => ({ label: c.name, value: c.name, lat: c.latitude, lng: c.longitude }))}
        renderOption={(props, option) => (
          <MenuItem key={option.value} {...props}>
            {option.label}
          </MenuItem>
        )}
      />

      <RHFAutocomplete
        name="neighborhood"
        label={t(`neighborhood`)}
        placeholder={t(`select`)}
        options={neighborhoods}
        freeSolo
        renderOption={(props, option) => (
          <MenuItem key={option.value} {...props}>
            {option.label}
          </MenuItem>
        )}
      />

      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {t(`propertiesPage.property_value`)}
      </Typography>

      <Stack direction="row" spacing={1.5}>
        <Stack spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(`propertiesPage.min_value`)}
          </Typography>

          <RHFNumberField
            name="minPrice"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    R$
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(`propertiesPage.max_value`)}
          </Typography>

          <RHFNumberField
            name="maxPrice"
            size="small"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                    R$
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
