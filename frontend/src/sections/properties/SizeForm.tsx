// form
import { useFormContext } from 'react-hook-form';
// @mui
import { InputAdornment, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// utils
import capitalizeFirstLetter from 'src/utils/capital';
// assets
import SquareIcon from 'src/assets/icons/SquareIcon';
// components
import { RHFNumberField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function SizeForm() {
  const { t } = useLocales();
  const { watch } = useFormContext();

  const values = watch();

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {t(`propertiesPage.size`)}
      </Typography>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SquareIcon />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {capitalizeFirstLetter(t(`card.usable_area`))}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(`propertiesPage.min_area`)}
            </Typography>
            <RHFNumberField
              name="minArea"
              value={values.minArea}
              size="small"
              variant="outlined"
              thousandSeparator=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      m²
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="column" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(`propertiesPage.max_area`)}
            </Typography>
            <RHFNumberField
              name="maxArea"
              value={values.maxArea}
              size="small"
              variant="outlined"
              thousandSeparator=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      m²
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <SquareIcon />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t(`propertiesPage.total_area`)}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(`propertiesPage.min_area`)}
            </Typography>
            <RHFNumberField
              name="totalMinArea"
              value={values.totalMinArea}
              size="small"
              variant="outlined"
              thousandSeparator=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      m²
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="column" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {t(`propertiesPage.max_area`)}
            </Typography>
            <RHFNumberField
              name="totalMaxArea"
              value={values.totalMaxArea}
              size="small"
              variant="outlined"
              thousandSeparator=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                      m²
                    </Typography>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
