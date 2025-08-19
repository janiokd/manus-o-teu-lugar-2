// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  helperText?: React.ReactNode;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  label,
  helperText,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          freeSolo={(other as any).freeSolo}
          onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}
          renderInput={(params) => (
            <TextField
              label={label}
              variant="standard"
              error={!!error}
              helperText={error ? error?.message : helperText}
              {...params}
              InputLabelProps={{
                shrink: true,
                sx: {
                  fontWeight: 600,
                  fontSize: '19px',
                  color: 'text.primary',
                },
              }}
              sx={{
                '& .MuiInputBase-input': {
                  typography: 'body2',
                  color: 'text.secondary'
                },
              }}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
