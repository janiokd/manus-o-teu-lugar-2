// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box } from '@mui/material';
// form
import { useFormContext } from 'react-hook-form';
// locales
import { useLocales } from 'src/locales';
// utils
import capitalizeFirstLetter from 'src/utils/capital';
// components
import Iconify from 'src/components/iconify';
import FabButton from 'src/components/customs/FabButton';

// ----------------------------------------------------------------------

const StyledBox = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  display: 'flex',
  cursor: 'pointer',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #D9D9D9',
  '&:hover': { backgroundColor: '#f5f5f5' },
}));

type Props = {
  name: string;
  Icon: React.ElementType;
  onChange: (name: string, type: boolean) => void;
};

export default function Counter({ name, Icon, onChange }: Props) {
  const { t } = useLocales();

  const { setValue, watch } = useFormContext();
  const values = watch();

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Icon />
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {capitalizeFirstLetter(t(`card.${name}`))}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <StyledBox>
          <Iconify
            icon="eva:minus-outline"
            style={{ color: '#000' }}
            onClick={() => onChange(name, false)}
          />
        </StyledBox>

        {[...new Array(4)].map((key, index) => (
          <FabButton
            key={index}
            focus={index === values.subFeatures[name]}
            onClick={() => setValue(`subFeatures.${name}`, index)}
          >
            {index}
          </FabButton>
        ))}
        {values.subFeatures[name] > 3 && (
          <FabButton
            key={values.subFeatures[name]}
            focus
            onClick={() => setValue(`subFeatures.${name}`, values.subFeatures[name])}
          >
            {values.subFeatures[name]}
          </FabButton>
        )}
        <StyledBox>
          <Iconify
            icon="eva:plus-fill"
            style={{ color: '#000' }}
            onClick={() => onChange(name, true)}
          />
        </StyledBox>
      </Stack>
    </Stack>
  );
}
