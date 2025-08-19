// next
import Head from 'next/head';
// auth
import GuestGuard from 'src/auth/GuestGuard';
// locales
import { useLocales } from 'src/locales';
// sections
import Register from 'src/sections/auth/Register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useLocales();

  return (
    <>
      <Head>
        <title>{t(`register`)}</title>
      </Head>

      <GuestGuard>
        <Register />
      </GuestGuard>
    </>
  );
}
