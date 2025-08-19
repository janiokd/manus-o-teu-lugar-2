import axios from 'axios';
import { useEffect } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
// fooks
import { useLocation } from 'src/hooks/useLocation';
// locales
import { useLocales } from 'src/locales';
// config-global
import { HOST_API } from 'src/config-global';
// assets
import { categories, negotiations, owners, rentalPeriodOptions } from 'src/assets/data';
// components
import { useSnackbar } from 'src/components/snackbar';
import { RHFSelect, RHFTextField, RHFAutocomplete, RHFRadioGroup } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function MainForm() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { cities, states, neighborhoods, getNeighborhoods } = useLocation();

  const { watch, setValue } = useFormContext();

  const values = watch();

  useEffect(() => {
    if (values.city?.lat && values.city?.lng) {
      console.log("city", values.city)
      getNeighborhoods(values.city?.lat, values.city?.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.city]);

  useEffect(() => {
    fetchCep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.zipCode]);

  // Handle rental duration input change
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) || 0;
    setValue('rentalDuration', value);

    // Auto-select the unit based on the value
    if (value <= 5) {
      setValue('rentalPeriod', 'days');
    } else if (value <= 21) {
      setValue('rentalPeriod', 'weeks');
    } else {
      setValue('rentalPeriod', 'months');
    }
  };

  const formatZipCode = (value: string) => {
    const cleanValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    if (cleanValue.length > 5) {
      return `${cleanValue.slice(0, 5)}-${cleanValue.slice(5, 8)}`;
    }
    return cleanValue;
  };

  const fetchCep = async () => {
    if (values.zipCode.length === 9) {
      const response = await axios.get(`${HOST_API}/util/fetchCep`, {
        params: {
          zipCode: values.zipCode,
        },
      });
      const result = await response.data;

      if (Object.keys(result).length > 1) {
        setValue('state', `${result.estado}(${result.uf})`);
        setValue('city', result.localidade);
        setValue('neighborhood', result.bairro);
        setValue(
          'address',
          `${result.logradouro}`
          // `${result.logradouro},  ${result.bairro}, ${result.localidade} - ${result.uf}, ${result.cep}`
        );
      } else {
        enqueueSnackbar(t(`invalid_zipCode`));
      }
    }
  };

  return (
    <Stack>
      <Stack direction="row" spacing={4} alignItems="center">
        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
          {`${t(`owner`)} ${t(`or`)} ${t(`broker`)}`}
        </Typography>
        <RHFRadioGroup row spacing={2} name="owner" options={owners} />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Box
        gap={{ xs: 3, md: 2.5 }}
        display="grid"
        alignItems={{ md: 'center' }}
        gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}
      >
        <RHFSelect name="type" label={t(`advertisePage.type_of_property`)} variant="standard">
          <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
            {t(`select`)}
          </MenuItem>

          {categories.map((item: any) => (
            <MenuItem key={item.value} value={item.value}>
              {t(item.label)}
            </MenuItem>
          ))}
        </RHFSelect>

        <RHFSelect
          name="negotiation"
          label={t(`advertisePage.intended_negotiation`)}
          variant="standard"
        >
          <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
            {t(`select`)}
          </MenuItem>

          {negotiations.map((item: any) => (
            <MenuItem key={item.value} value={item.value}>
              {t(item.label)}
            </MenuItem>
          ))}
        </RHFSelect>

        {/* Show Minimum Rental Period if "Alugar" (rental) is selected */}
        {values.negotiation.includes('rental') && (
          <>
            {/* Rental Duration Input */}
            <RHFTextField
              name="rentalDuration"
              label={t(`rentalDuration`)}
              variant="standard"
              placeholder={t(`rentalDuration`)}
              onChange={handleDurationChange}
            />

            {/* Rental Period Dropdown (Auto-Selected) */}
            <RHFSelect name="rentalPeriod" label={t(`rentalPeriod`)} variant="standard">
              <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
                {t(`select`)}
              </MenuItem>

              {rentalPeriodOptions.map((item: any) => (
                <MenuItem key={item.value} value={item.value}>
                  {t(item.label)}
                </MenuItem>
              ))}
            </RHFSelect>
          </>
        )}
        <RHFTextField
          name="title"
          label={t(`title`)}
          variant="standard"
          placeholder={t(`advertisePage.property_title`)}
        />

        <RHFTextField
          name="zipCode"
          label={t(`zipCode`)}
          variant="standard"
          placeholder="99999-999"
          onChange={(e) => {
            const formatted = formatZipCode(e.target.value);
            setValue('zipCode', formatted, { shouldValidate: true });
            console.log(formatted);
            // const state = State.getStateByCodeAndCountry(formatted, 'BR');
          }}
        />

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

        <RHFTextField
          name="address"
          label={t(`address`)}
          variant="standard"
          placeholder={t(`advertisePage.enter_street`)}
        />

        <RHFTextField
          name="addOn"
          label={`${t(`advertisePage.add_on`)} (${t("optional")})`}
          variant="standard"
          placeholder={t(`advertisePage.add_on_placeholder`)}
        />
      </Box>
    </Stack>
  );
}
