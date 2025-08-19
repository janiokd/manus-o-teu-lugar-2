import NextLink from 'next/link';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Typography, Link, IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// _mock
import { _socials } from 'src/_mock/arrays';
// assets
import StarIcon from 'src/assets/icons/StarIcon';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// locales
import { useTranslation } from 'react-i18next';
// config
import { HEADER } from 'src/config-global';
// components
import SvgColor from 'src/components/svg-color';
//
import { useAuthContext } from 'src/auth/useAuthContext';
import LanguagePopover from './LanguagePopover';

// ----------------------------------------------------------------------

const StyledIconButton = styled(NextLink)({
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
  textDecoration: 'none',
});

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const { t, ready } = useTranslation();

  const { user, isAuthenticated } = useAuthContext();

  if (!ready) {
    return null;
  }

  const renderContent = (
    <Box maxWidth="lg" mx="auto" sx={{ width: '100%', height: HEADER.H_MAIN_HEADER }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={4} direction="row" alignItems="center" justifyContent="flex-start">
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccountCircleOutlinedIcon />
            {isAuthenticated ? (
              <Typography color="white" fontSize={14}>
                {user?.name || user?.email}
              </Typography>
            ) : (
              <StyledIconButton href={PATH_AUTH.login}>
                {t('login')} / {t('create_account')}
              </StyledIconButton>
            )}
          </Stack>
          <LanguagePopover />
          <Link component={NextLink} href="/dashboard/advertise">
            <Stack direction="row" alignItems="center" spacing={1}>
              <StarIcon color={theme.palette.secondary.main} size={22} />
              <Typography variant="body2" sx={{ color: 'common.white' }} paragraph>
                {t('advertise_free')}
              </Typography>
            </Stack>
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {_socials.map((item, index) => (
            <Link
              key={index}
              component={NextLink}
              href={item.path}
              target="_blank"
              underline="none"
            >
              <IconButton size="small" sx={{ color: 'common.white' }}>
                <SvgColor src={item.icon} sx={{ width: '30px', height: '30px' }} />
              </IconButton>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Box>
  );

  return <AppBar>{renderContent}</AppBar>;
}
