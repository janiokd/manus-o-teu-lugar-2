// @mui
import { Box } from '@mui/material';
// auth
import AuthGuard from 'src/auth/AuthGuard';
//
import Main from './Main';
import Footer from './Footer';
import Header from './header';
import NavHorizontal from './nav/NavHorizontal';

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const renderContent = () => (
    <>
      <Box width="100%" mx="auto">
        <Header />
        <NavHorizontal />
      </Box>
      <Main sx={{ bgcolor: '#F4F7FD' }}>{children}</Main>
      <Footer />
    </>
  );

  return <AuthGuard> {renderContent()} </AuthGuard>;
}
