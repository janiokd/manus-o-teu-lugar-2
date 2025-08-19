// next
import Head from 'next/head';
// @mui
import { Box, Container, Typography } from '@mui/material';
// routes
// locales
import { useLocales } from 'src/locales';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { useSettingsContext } from 'src/components/settings';
// sections

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { t } = useLocales();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title>{t(`account`)}</title>
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
