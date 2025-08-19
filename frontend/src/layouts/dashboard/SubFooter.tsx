import { Box, Container, Stack, SxProps, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

interface SubFooterProps {
  sx?: SxProps;
}

export const SubFooter = ({ sx }: SubFooterProps) => {
  const { t } = useLocales();

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: '#587792',
        color: 'white',
        ...sx,
      }}
    >
      <Container sx={{ padding: '16px' }} maxWidth="lg">
        <Stack direction="row" justifyContent="space-between">
          <Typography textAlign="left" fontSize={14} fontWeight={400}>
            {`© ${new Date().getFullYear()} ${t(`footer.all_rights`)}`}
          </Typography>
          <Typography textAlign="left" fontSize={14} fontWeight={400}>
            {t(`footer.developed_by`)}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
