import React from 'react';
import { Stack } from '@mui/system';
import { TextField, Typography, TextFieldProps, styled } from '@mui/material';

type Props = TextFieldProps & {
  label: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
};
export default function CustomTextField({ label, placeholder, multiline, rows, ...other }: Props) {
  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInput-underline:before': {
      borderBottomColor: '#D9D9D9', // Default underline color
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: '#000000', // Change color on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#000000', // Change color on focus
    },
    input: {
      '&::placeholder': {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '14px',
      },
    },
  }));

  return (
    <Stack direction="column" spacing={1} width="100%">
      <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {label}
      </Typography>
      <StyledTextField
        variant="standard"
        placeholder={placeholder}
        multiline={multiline}
        rows={rows}
        {...other}
      />
    </Stack>
  );
}
