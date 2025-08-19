// @mui
import { Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
//
import { StyledRoot, StyledSection, StyledContent } from './styles';
import { SubFooter } from '../dashboard/SubFooter';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <>
      <StyledRoot>
        <StyledSection>
          <Stack direction="row" justifyContent="center">
            <Logo />
          </Stack>
          <StyledContent>
            <Stack sx={{ width: 1 }}> {children} </Stack>
          </StyledContent>
        </StyledSection>
      </StyledRoot>
      <SubFooter
        sx={{
          bgcolor: '#001D4A',
        }}
      />
    </>
  );
}
