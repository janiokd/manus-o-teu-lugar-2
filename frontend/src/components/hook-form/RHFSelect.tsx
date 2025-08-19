// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Checkbox,
  Chip,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
  Typography,
} from '@mui/material';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  sx,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          error={!!error}
          helperText={error ? error?.message : helperText}
          inputProps={{
            sx: {
              typography: 'body2',
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
          SelectProps={{
            displayEmpty: true,
          }}
          sx={sx}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: {
    label: string;
    value: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  ...other
}: RHFMultiSelectProps) {
  const { t } = useLocales();
  const { control } = useFormContext();

  // Function to get selected values
  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item: { value: string }) =>
      selectedIds.includes(item.value)
    );

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="span" sx={{ color: 'text.disabled' }}>
          <Typography variant="body2">{placeholder}</Typography>
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selectedItems.map((item: { label: string; value: string }) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item: { label: string; value: string }) => item.label).join(', ');
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const isAllSelected = field.value.length === options.length;
        const isSomeSelected = field.value.length > 0 && !isAllSelected;

        const handleSelectAllClick = () => {
          if (isAllSelected) {
            field.onChange([]); // Deselect all
          } else {
            field.onChange(options.map((o) => o.value)); // Select all
          }
        };

        return (
          <Stack sx={sx}>
            <Typography variant="subtitle2">{label}</Typography>

            <Select
              {...field}
              multiple
              displayEmpty={!!placeholder}
              labelId={name}
              renderValue={renderValues}
              MenuProps={{
                PaperProps: {
                  sx: { px: 1, maxHeight: 280 },
                },
              }}
              inputProps={{
                sx: {
                  typography: 'body2',
                  color: 'text.secondary',
                },
              }}
              {...other}
            >
              {/* Placeholder Option */}
              {placeholder && (
                <MenuItem
                  disabled
                  value=""
                  sx={{
                    py: 1,
                    px: 2,
                    borderRadius: 0.75,
                    typography: 'body2',
                  }}
                >
                  {placeholder}
                </MenuItem>
              )}

              {/* "Select All" Option */}
              {checkbox && (
                <MenuItem onClick={handleSelectAllClick}>
                  <Checkbox
                    disableRipple
                    size="small"
                    checked={isAllSelected}
                    indeterminate={isSomeSelected}
                  />
                  {t(`select_all`)}
                </MenuItem>
              )}

              {/* Regular Options */}
              {options.map((option: { label: string; value: string }) => {
                const selected = field.value.includes(option.value);

                return (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    sx={{
                      py: 0,
                      px: 2,
                      borderRadius: 0.75,
                      typography: 'body2',
                      ...(selected && {
                        fontWeight: 'fontWeightMedium',
                      }),
                      ...(checkbox && {
                        p: 0.25,
                      }),
                    }}
                  >
                    {checkbox && <Checkbox disableRipple size="small" checked={selected} />}
                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>

            {/* Error Message */}
            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </Stack>
        );
      }}
    />
  );
}
