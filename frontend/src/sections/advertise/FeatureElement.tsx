// @mui
import { Grid, MenuItem, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  type: string;
  prefix: string;
};

export default function FeatureElement({ name, type, prefix }: Props) {
  const { t } = useLocales();

  return (
    <Grid container>
      <Grid item xs={3}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t(name)}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Grid container>
          {type === 'boolean' ? (
            <Grid item xs={4}>
              <RHFSelect
                name={`${prefix}.${name}`}
                label=""
                variant="standard"
                sx={{
                  '& .MuiInput-underline:before': { borderBottom: 'none' }, // Removes default underline
                  '& .MuiInput-underline:after': { borderBottom: 'none' }, // Removes active underline
                  '& .MuiInputBase-input': { borderBottom: 'none' }, // Ensures no extra borders
                }}
              >
                <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
                  {t(`select`)}
                </MenuItem>

                <MenuItem value="yes">{t(`yes`)}</MenuItem>
                <MenuItem value="no">{t(`no`)}</MenuItem>
              </RHFSelect>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <RHFTextField
                type={type === 'number' ? 'number' : 'text'}
                name={`${prefix}.${name}`}
                variant="standard"
                sx={{
                  '& .MuiInput-underline:before': { borderBottom: 'none' }, // Removes default underline
                  '& .MuiInput-underline:after': { borderBottom: 'none' }, // Removes active underline
                  '& .MuiInputBase-input': { borderBottom: 'none' }, // Ensures no extra borders
                }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
