import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Stack } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, BoxProps, Button } from '@mui/material';
// assets
import StarIcon from 'src/assets/icons/StarIcon';
import UserIcon from 'src/assets/icons/UserIcon';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// config
import { HEADER } from 'src/config-global';
// utils
import { bgBlur } from 'src/utils/cssStyles';
// components
import Logo from 'src/components/logo';
import { NavSectionHorizontal } from 'src/components/nav-section';
//
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();
  const { t } = useLocales();

  return (
    <AppBar
      color="inherit"
      sx={{
        color: 'black',
        height: HEADER.H_MAIN_NAV,
        boxShadow: 0,
        top: HEADER.H_MAIN_HEADER,
      }}
    >
      <Box maxWidth="lg" width="100%" height="100%" mx="auto">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            height: '100%',
            ...bgBlur({
              color: theme.palette.background.default,
            }),
          }}
        >
          <Stack spacing={3} direction="row" alignItems="center">
            <Logo />
            <NavSectionHorizontal data={navConfig} />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="end">
            <Button
              component={NextLink}
              href={PATH_AUTH.register}
              size="large"
              color="primary"
              variant="outlined"
              startIcon={<UserIcon />}
              sx={{ borderRadius: 40, textTransform: 'none' }}
            >
              {t(`personal_area`)}
            </Button>
            <Button
              component={NextLink}
              href="/dashboard/advertise"
              size="large"
              color="secondary"
              variant="contained"
              startIcon={<StarIcon />}
              sx={{ borderRadius: 40, textTransform: 'none' }}
            >
              {t('advertise_here')}
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Shadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        width: 1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
