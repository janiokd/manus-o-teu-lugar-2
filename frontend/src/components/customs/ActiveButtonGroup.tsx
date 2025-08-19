// @mui
import { Stack } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// components
import { useFormContext } from 'react-hook-form';
import ActiveButton from 'src/components/customs/ActiveButton';

// ----------------------------------------------------------------------

const buttonArray = ['buy', 'rent', 'lease', 'built_to_suit', 'partnerships', 'services'];

type Props = {
  name: string;
  arrow?: boolean;
  direction?: 'row' | 'column';
  color: 'primary' | 'secondary';
};

export default function ActivateButtonGroup({
  name,
  arrow = true,
  color,
  direction = 'row',
}: Props) {
  const { t } = useLocales();
  const { setValue, watch } = useFormContext();

  const values = watch();

  const handleSelect = (selected: string) => {
    const isExist = values[name].find((service: string) => service === selected);
    if (isExist) {
      setValue(
        name,
        values[name].filter((service: string) => service !== selected)
      );
    } else {
      setValue(name, [...values[name], selected]);
    }
  };

  return (
    <Stack direction={direction} justifyContent="center" spacing={1}>
      {buttonArray.map((item: string, index) => (
        <ActiveButton
          arrow={arrow}
          key={index}
          color={color}
          borderColor={color}
          focus={values[name].find((service: string) => service === item)}
          onClick={() => handleSelect(item)}
        >
          {t(item)}
        </ActiveButton>
      ))}
    </Stack>
  );
}
