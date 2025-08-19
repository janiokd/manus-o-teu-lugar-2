// @mui
import { Stack, Typography } from '@mui/material';
// form
import { useFormContext } from 'react-hook-form';
// assets
import { ICONS } from 'src/assets/data';
// locales
import { useLocales } from 'src/locales';
//
import Counter from './Counter';

// ----------------------------------------------------------------------

export default function RoomForm() {
  const { t } = useLocales();

  const { setValue, watch } = useFormContext();
  const values = watch();

  const handleChange = (name: string, type: boolean) => {
    const newValue = type
      ? values.subFeatures[name] + 1
      : Math.max(values.subFeatures[name] - 1, 0);

    setValue(`subFeatures.${name}`, newValue);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {t('advertisePage.property_features')}
      </Typography>

      {Object.keys(values.subFeatures).map((key, index) => (
        <Counter
          name={key}
          key={index}
          Icon={ICONS[key]}
          onChange={(name, type) => handleChange(name, type)}
        />
      ))}
    </Stack>
  );
}
