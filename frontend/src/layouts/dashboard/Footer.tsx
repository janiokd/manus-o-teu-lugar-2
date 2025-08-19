// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Link,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
// _mock
import { _socials } from 'src/_mock/arrays';
// locales
import { useLocales } from 'src/locales';
// assets
import ArrowUpIcon from 'src/assets/icons/ArrowUpIcon';
// components
import SvgColor from 'src/components/svg-color';
import WhiteLogo from 'src/components/logo/WhiteLogo';
//
import { SubFooter } from './SubFooter';

// ----------------------------------------------------------------------

const BROWSE = {
  headline: 'footer.browse',
  children: [
    { name: 'footer.home', href: '#' },
    { name: 'footer.search_for_properties', href: '#' },
    { name: 'footer.register_properties', href: '#' },
    { name: 'footer.contact_us', href: '#' },
    { name: 'footer.footer_about_us', href: '#' },
    { name: 'footer.security_tips', href: '#' },
    { name: 'footer.program_tutorials', href: '#' },
    { name: 'login', href: '#' },
  ],
};

const PROPERTIES = {
  headline: 'properties',
  children: [
    { name: 'buy', href: '#' },
    { name: 'rent', href: '#' },
    { name: 'lease', href: '#' },
    { name: 'built_to_suit', href: '#' },
    { name: 'partnerships', href: '#' },
    { name: 'services', href: '#' },
  ],
};

const CONTACT = {
  headline: 'footer.contact_us',
  children: [
    { name: 'Tel: (11) 32323-2929', href: '#' },
    { name: 'What’s App: (11) 282828-9292', href: '#' },
    { name: 'Email: lorem@lorem.com.br', href: '#' },
  ],
};

const LOCATION = {
  headline: 'footer.where_we_are',
  children: [
    { name: 'Brasil', subText: ['Av. Lorem Ipsum, 1212', 'Bairro Lorem - São Paulo / SP'] },
    { name: 'Portugal', subText: ['Av. Lorem Ipsum, 1212', 'Bairro Lorem - São Paulo / SP'] },
  ],
};

// ----------------------------------------------------------------------

export default function Footer() {
  const theme = useTheme();
  const { t } = useLocales();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour
     in place of 'smooth' */
    });
  };

  const mainFooter = (
    <Box>
      <Box
        component="footer"
        sx={{
          position: 'relative',
          bgcolor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Divider />

        <Container maxWidth="lg">
          <Grid
            container
            justifyContent={{
              xs: 'center',
              md: 'space-between',
            }}
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            <Grid item xs={12} sx={{ py: 4 }}>
              <Stack
                spacing={5}
                alignItems="start"
                justifyContent="space-between"
                direction={{ xs: 'column', md: 'row' }}
                sx={{ color: 'white' }}
              >
                <WhiteLogo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
                <Button
                  size="large"
                  variant="contained"
                  startIcon={<ArrowUpIcon />}
                  sx={{ textTransform: 'none', typography: 'body1' }}
                  onClick={scrollToTop}
                >
                  {t(`footer.back_to_top`)}
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ py: 4 }}>
              <Grid container>
                <Stack
                  spacing={5}
                  justifyContent="space-between"
                  direction={{ xs: 'column', md: 'row' }}
                  sx={{width: 1, color: 'white' }}
                >
                  <Grid item xs={4} alignItems={{ md: 'flex-start' }}>
                    <Typography variant="h4" sx={{ color: 'common.white' }}>
                      {t(BROWSE.headline)}
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      {BROWSE.children.map((link) => (
                        <Typography key={link.name} variant="body1" sx={{ color: 'common.white' }}>
                          {t(link.name)}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={4} alignItems={{ md: 'flex-start' }}>
                    <Typography variant="h4" sx={{ color: 'common.white' }}>
                      {t(PROPERTIES.headline)}
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      {PROPERTIES.children.map((link) => (
                        <Typography key={link.name} variant="body1" sx={{ color: 'common.white' }}>
                          {t(link.name)}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={4} alignItems={{ md: 'flex-start' }}>
                    <Typography variant="h4" sx={{ color: 'common.white' }}>
                      {t(CONTACT.headline)}
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      {CONTACT.children.map((link) => (
                        <Typography key={link.name} variant="body1" sx={{ color: 'common.white' }}>
                          {t(link.name)}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={4} alignItems={{ md: 'flex-start' }}>
                    <Typography variant="h4" sx={{ color: 'common.white' }}>
                      {t(LOCATION.headline)}
                    </Typography>

                    {LOCATION.children.map((link) => (
                      <Stack key={link.name} sx={{ pb: 2 }}>
                        <Typography
                          key={link.name}
                          variant="subtitle1"
                          sx={{ color: 'common.white' }}
                        >
                          {t(link.name)}
                        </Typography>
                        {link.subText.map((item) => (
                          <Typography key={item} variant="body1" sx={{ color: 'common.white' }}>
                            {t(item)}
                          </Typography>
                        ))}
                      </Stack>
                    ))}
                  </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Stack
            flexGrow={1}
            direction="row"
            alignItems="start"
            justifyContent="space-between"
            spacing={{ xs: 0.5, sm: 4 }}
            sx={{ py: 4 }}
          >
            <Typography variant="body1" sx={{ color: 'common.white' }}>
              {t(`footer.terms_of_use`)}
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              {_socials.map((item, index) => (
                <Link
                  key={index}
                  component={NextLink}
                  href={item.path}
                  target="_blank"
                  underline="none"
                >
                  <IconButton size="small" sx={{ color: 'secondary.main' }}>
                    <SvgColor src={item.icon} sx={{ width: '30px', height: '30px' }} />
                  </IconButton>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
      <SubFooter />
    </Box>
  );

  return mainFooter;
}
