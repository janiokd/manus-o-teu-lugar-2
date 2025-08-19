import { signIn } from 'next-auth/react';
// @mui
import { Divider, IconButton, Stack, styled, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// auth
import { useAuthContext } from 'src/auth/useAuthContext';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const ButtonTypography = styled(Typography)(() => ({
  color: 'white',
  fontSize: '14px',
  lineHeight: '14px',
  fontWeight: '600',
  marginLeft: '12px',
}));

interface SocialButtonProps {
  customColor: string;
}

const SocialButton = styled(IconButton)<SocialButtonProps>((props) => ({
  backgroundColor: props.customColor,
  height: '50px',
  borderRadius: '40px',
  padding: '8px 35px',
  '&:hover': {
    backgroundColor: props.customColor,
    opacity: 0.8,
  },
}));

export default function AuthWithSocial() {
  const { t } = useLocales();

  const { loginWithGoogle, loginWithApple, loginWithFacebook } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      if (loginWithGoogle) {
        loginWithGoogle();
        signIn('google', { prompt: 'select_account' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      if (loginWithApple) {
        loginWithApple();
        signIn('apple', { prompt: 'select_account' });
      }
      console.log(' LOGIN');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      if (loginWithFacebook) {
        loginWithFacebook();
        signIn('facebook', { prompt: 'select_account' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Stack direction="column" justifyContent="center" spacing={1}>
        <SocialButton customColor="#4285F4" onClick={handleGoogleLogin}>
          <SvgColor
            src="/assets/icons/social/google.svg"
            sx={{ width: 15.68, height: 16, fill: 'white', backgroundColor: 'white' }}
          />
          <ButtonTypography>{`${t('register_google')}`}</ButtonTypography>
        </SocialButton>

        <SocialButton customColor="#000000" onClick={handleAppleLogin}>
          <SvgColor
            src="/assets/icons/social/apple.svg"
            sx={{ width: 16, height: 19.66, fill: 'white', backgroundColor: 'white' }}
          />
          <ButtonTypography>{`${t('register_apple')}`}</ButtonTypography>
        </SocialButton>

        <SocialButton customColor="#4267B2" onClick={handleFacebookLogin}>
          <SvgColor
            src="/assets/icons/social/facebook.svg"
            sx={{ width: 8.5, height: 17, fill: 'white', backgroundColor: 'white' }}
          />
          <ButtonTypography>{`${t('register_facebook')}`}</ButtonTypography>
        </SocialButton>
      </Stack>

      <Divider sx={{ pt: '20px', mb: '30px' }} />
    </div>
  );
}
