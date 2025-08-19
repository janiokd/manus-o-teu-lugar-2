// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// layouts
import LoginLayout from 'src/layouts/login';
// locales
import { useLocales } from 'src/locales';
// routes
import { PATH_AUTH } from 'src/routes/paths';
//
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  const { t } = useLocales();

  return (
    <LoginLayout title="Login">
      <AuthWithSocial />

      <AuthRegisterForm />

      <Stack direction="row" justifyContent='center' spacing={0.5} sx={{ mt: 2 }}>
        <Typography variant="body2"> {`${t('have_account')}`} </Typography>

        <Link component={NextLink} href={PATH_AUTH.login} variant="subtitle2">
          {`${t('login')}`}
        </Link>
      </Stack>
    </LoginLayout>
  );
}
