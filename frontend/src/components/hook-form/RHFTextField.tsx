// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  helperText?: React.ReactNode;
};

export default function RHFTextField({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          inputProps={{
            sx: {
              fontWeight: 400,
              fontSize: '14px',
              color: 'text.secondary',
            },
          }}
          InputLabelProps={{
            shrink: true,
            sx: {
              fontWeight: 600,
              fontSize: '19px',
              color: 'text.primary',
            },
          }}
          {...other}
        />
      )}
    />
  );
}
