import { NumericFormat, NumericFormatProps } from 'react-number-format'; // For formatting
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';

// ----------------------------------------------------------------------

type Props = Omit<NumericFormatProps, 'size'> &
  TextFieldProps & {
    name: string;
    helperText?: React.ReactNode;
    format?: boolean
  };

export default function RHFNumberField({ name, helperText, format = true, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <NumericFormat
          {...field}
          customInput={TextField as React.ComponentType<any>}
          thousandSeparator="."
          decimalSeparator=","
          {...(format && { decimalScale: 2, fixedDecimalScale: true })}
          fixedDecimalScale
          allowNegative={false}
          variant="standard"
          error={!!error}
          helperText={error ? error?.message : helperText}
          onValueChange={(values) => field.onChange(values.floatValue)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
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
      )
      }
    />
  );
}
