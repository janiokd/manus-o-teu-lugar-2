// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Link } from '@mui/material';
// auth
import { useLocales } from 'src/locales';
// layouts
import LoginLayout from 'src/layouts/login';
// routes
import { PATH_AUTH } from 'src/routes/paths';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { t } = useLocales();

  return (
    <LoginLayout>
      <AuthWithSocial />
      <AuthLoginForm />

      <Stack direction="row" justifyContent="center" spacing={0.5} sx={{ mt: 2 }}>
        <Typography variant="body2">{`${t('no_account')}`}</Typography>
        <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
          {`${t('register')}`}
        </Link>
      </Stack>
    </LoginLayout>
  );
}
