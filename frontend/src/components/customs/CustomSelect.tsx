import React from 'react';
import { Stack, Select, styled, MenuItem, Typography, SelectProps } from '@mui/material';
import { useLocales } from 'src/locales';

type Props = SelectProps & {
  label: string;
  value?: string;
  options: { label: string; value: string }[];
  placeholder?: string;
};
export default function CustomSelect({ label, value = '', options, placeholder, ...other }: Props) {
  const { t } = useLocales();

  const StyledTextField = styled(Select)(({ theme }) => ({
    '& .MuiInput-underline:before': {
      borderBottomColor: '#D9D9D9', // Default underline color
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#000000', // Change color on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#000000', // Change color on focus
    },
    '& .MuiSelect-select': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '14px',
      color: value ? theme.palette.common.black : theme.palette.text.disabled, // Placeholder color
    },
  }));

  return (
    <Stack direction="column" spacing={1} width="100%">
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
      <StyledTextField variant="standard" displayEmpty value={value} {...other}>
        <MenuItem disabled sx={{ color: 'text.disabled' }} value="">
          {placeholder}
        </MenuItem>

        {options.map((item: any) => (
          <MenuItem key={item.value} value={item.value}>
            {t(item.label)}
          </MenuItem>
        ))}
      </StyledTextField>
    </Stack>
  );
}
