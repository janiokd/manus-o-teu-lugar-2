// @mui
import { Box } from '@mui/material';
// auth
import Header from '../dashboard/header';
import NavHorizontal from '../dashboard/nav/NavHorizontal';
import Main from '../dashboard/Main';
import Footer from '../dashboard/Footer';
//

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Box width="100%" mx="auto">
        <Header />
        <NavHorizontal />
      </Box>
      <Main sx={{ bgcolor: '#F4F7FD' }}>{children}</Main>
      <Footer />
    </>
  );
}
