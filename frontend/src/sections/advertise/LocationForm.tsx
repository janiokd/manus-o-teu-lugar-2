import { CiCirclePlus } from 'react-icons/ci';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Box, Stack, Typography, IconButton } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// assets
import TrashIcon from 'src/assets/icons/TrashIcon';
import LocationIcon from 'src/assets/icons/LocationIcon';
// components
import RoundButton from 'src/components/customs/RoundButton';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LocationForm() {
  const { t } = useLocales();

  const { watch, setValue } = useFormContext();
  const values = watch();

  const addLocation = () => {
    if (values.location) {
      setValue('locations', [...values.locations, values.location]);
      setValue('location', '');
    }
  };

  const removeLocation = (id: number) => {
    setValue('locations', [...values.locations.filter((_: string, index: number) => index !== id)]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      addLocation();
    }
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {t(`advertisePage.property_proximity`)} ({t("optional")})
      </Typography>

      {values.locations?.length === 0 && (
        <Stack direction="row" justifyContent="space-between" sx={{ pr: 2 }}>
          <Stack direction="row" spacing={2}>
            <LocationIcon />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(`advertisePage.add_new_location`)}
            </Typography>
          </Stack>
          <TrashIcon />
        </Stack>
      )}

      {values.locations.map((location: string, index: number) => (
        <Stack
          key={index}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pr: 2 }}
        >
          <Stack direction="row" spacing={2}>
            <LocationIcon />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {location}
            </Typography>
          </Stack>
          <IconButton onClick={() => removeLocation(index)} sx={{ p: 0 }}>
            <TrashIcon />
          </IconButton>
        </Stack>
      ))}

      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
        <RHFTextField
          name="location"
          label=""
          variant="standard"
          placeholder={t(`advertisePage.enter_business_similar`)}
          onKeyDown={handleKeyDown}
        />
        <Box>
          <RoundButton variant="outlined" startIcon={<CiCirclePlus />} onClick={addLocation}>
            <span style={{ whiteSpace: 'nowrap' }}>{t(`advertisePage.add_new_proxity`)}</span>
          </RoundButton>
        </Box>
      </Stack>
    </Stack>
  );
}
