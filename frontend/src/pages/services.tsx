// next
import Head from 'next/head';
// @mui
import { Box, Container, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// components
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

ServicesPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function ServicesPage() {
  const { t } = useLocales();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>{t(`investment`)}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
        >
          <Typography> </Typography>
        </Box>
      </Container>
    </>
  );
}
