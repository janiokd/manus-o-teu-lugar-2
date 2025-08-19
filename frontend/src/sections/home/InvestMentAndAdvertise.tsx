// @mui
import { Box, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// assets
import img1 from 'src/assets/images/img1.png';
import img2 from 'src/assets/images/img2.png';
import DialIcon from 'src/assets/icons/DialIcon';
import StarIcon from 'src/assets/icons/StarIcon';
// components
import RoundButton from 'src/components/customs/RoundButton';
import ImageBox from 'src/components/customs/BackgroundImage';

// ----------------------------------------------------------------------

export default function InvestMentAndAdvertise() {
  const { t } = useLocales();

  return (
    <Stack alignItems="center" sx={{ width: 1 }}>
      <Box sx={{ height: '250px', width: '970px', bgcolor: '#D9D9D9', my: 10 }} />

      <Stack spacing={4} sx={{ width: 1, mb: 10 }}>
        <ImageBox src={img1.src} position="left">
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Box sx={{ maxWidth: '432px' }} textAlign="right">
              <Stack spacing={3} justifyContent="space-between">
                <Typography variant="h1" sx={{ color: 'common.white' }}>
                  {t(`homePage.investment_simulations`)}
                </Typography>
                <Typography variant="body1" sx={{ color: 'common.white' }}>
                  {`${t(`homePage.simulations_with_back`)} / ${t(
                    `homePage.real_estate_financing`
                  )} / ${t(`homePage.monetary_insurance`)} / ${t(
                    `homePage.real_estate_insurance`
                  )}`}
                </Typography>
                <Box>
                  <RoundButton
                    size="medium"
                    color="secondary"
                    variant="contained"
                    startIcon={<DialIcon />}
                  >
                    {t(`homePage.simulate_here`)}
                  </RoundButton>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </ImageBox>

        <ImageBox src={img2.src} position="right">
          <Stack direction="row" justifyContent="flex-start">
            <Box sx={{ maxWidth: '432px', color: 'white' }} textAlign="left">
              <Stack spacing={3} justifyContent="space-between">
                <Typography variant="h1" sx={{ color: 'common.white' }}>
                  {t(`homePage.advertise_property_free`)}
                </Typography>
                <Typography variant="body1" sx={{ color: 'common.white' }}>
                  {t(`homePage.simple_easy_fase`)}
                </Typography>
                <Box>
                  <RoundButton
                    size="medium"
                    color="secondary"
                    variant="contained"
                    startIcon={<StarIcon />}
                  >
                    {t(`homePage.advertise_here`)}
                  </RoundButton>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </ImageBox>
      </Stack>

      <Stack alignItems="center">
        <Box sx={{ height: '90px', width: '728px', bgcolor: '#D9D9D9' }} />
      </Stack>
    </Stack>
  );
}
