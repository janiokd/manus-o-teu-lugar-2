// @mui
import { Box, BoxProps } from '@mui/material';
// config
import { HEADER } from '../../config-global';

// ----------------------------------------------------------------------

const SPACING = 40;

export default function Main({ children, sx }: BoxProps) {
  return (
    <Box
      component="main"
      sx={{
        pt: `${HEADER.H_MAIN_HEADER + HEADER.H_MAIN_NAV}px`,
        pb: `${HEADER.H_MAIN_HEADER + SPACING}px`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
