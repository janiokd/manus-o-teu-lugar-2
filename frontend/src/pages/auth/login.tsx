// next
import Head from 'next/head';
// locales
import { useLocales } from 'src/locales';
// auth
import GuestGuard from 'src/auth/GuestGuard';
// sections
import Login from 'src/sections/auth/Login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useLocales();

  return (
    <>
      <Head>
        <title>{t(`login`)}</title>
      </Head>

      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
}
