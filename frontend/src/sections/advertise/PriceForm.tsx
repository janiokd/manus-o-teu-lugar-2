// form
import { useFormContext } from 'react-hook-form';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, InputAdornment, Stack, Tooltip, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// assets
import ExclamationIcon from 'src/assets/icons/ExclamationIcon';
// components
import {
  RHFCheckbox,
  RHFTextField,
  RHFNumberField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function PriceForm() {
  const theme = useTheme();
  const { t } = useLocales();

  const { watch } = useFormContext();

  const values = watch();

  return (
    <>
      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {t(`advertisePage.hideAddress`)} ({t("optional")})
          </Typography>
          <Tooltip
            title={
              <Stack spacing={0.5}>
                <Typography variant="subtitle1" color="primary">
                  {`${t(`advertisePage.hide_address_tooltip_title`)} R$9,90`}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t(`advertisePage.hide_address_tooltip`)}
                </Typography>
              </Stack>
            }
            arrow
            placement="top-start"
            slotProps={{
              tooltip: {
                sx: {
                  p: 1.5,
                  backgroundColor: '#FFFFFF',
                  boxShadow: theme.customShadows.z24,
                },
              },
              arrow: {
                sx: {
                  color: '#FFFFFF',
                  boxShadow: theme.customShadows.z24,
                },
              },
            }}
          >
            <Box>
              <ExclamationIcon />
            </Box>
          </Tooltip>
        </Stack>

        <RHFCheckbox name="hideAddress" label={`${t(`advertisePage.hide_address_for`)} R$9,90`} />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Stack spacing={2} sx={{ mb: 2 }}>
        <RHFTextField
          name="description"
          label={t(`advertisePage.property_description`)}
          variant="standard"
          placeholder={t(`advertisePage.enter_description_of_property`)}
          rows={3}
          multiline
        />

        <RHFNumberField
          name="price"
          label={t(`advertisePage.price`)}
          value={values.price}
          variant="standard"
          placeholder="319.000,00"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body2">R$</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </>
  );
}
