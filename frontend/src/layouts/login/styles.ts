// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  backgroundColor: '#F4F7FD',
  padding: '40px',
  minHeight: 'calc(100vh - 53px)',
  overflowY: 'scroll',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  width: 519,
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '20px 20px 25px 20px',
  height: 'fit-content',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  marginTop: '32px',
  display: 'flex',
}));
