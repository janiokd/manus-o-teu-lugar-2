import * as Yup from 'yup';
import { useState } from 'react';
// next
import Head from 'next/head';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Container, Stack, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// components
import FormProvider from 'src/components/hook-form';
import { MapWithDrawing } from 'src/components/map';
import { HomeHero, InvestMentAndAdvertise, Products } from 'src/sections/home';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

type FormValuesProps = {
  location: object;
  services: string[];
  services1: string[];
  categories: string[];
  afterSubmit?: string;
};

export default function HomePage() {
  const { t } = useLocales();
  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null);

  const [address, setAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<string[]>([]);
  console.log(address, addresses);

  const RegisterSchema = Yup.object().shape({});

  const defaultValues = {
    services: [],
    location: [],
    services1: [],
    categories: [],
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    // formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (form: FormValuesProps) => {
    try {
      console.log(form);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <>
      <Head>
        <title>{t(`home`)}</title>
      </Head>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HomeHero setLocation={setLocation} />

        <Container maxWidth="lg">
          <Stack alignItems="center" sx={{ width: 1 }}>
            <Typography variant="h1" color="primary">
              {t(`homePage.draw_area_here`)}
            </Typography>
          </Stack>
        </Container>
        <Container maxWidth="xl">
          <Box sx={{ width: 1, my: 5 }} id="mapWithDrawing">
            <MapWithDrawing
              height="560px"
              text={t(`draw_area`)}
              setAddress={setAddress}
              setAddresses={setAddresses}
              location={location}
            />
          </Box>
        </Container>
        <Container>
          <Stack alignItems="center" sx={{ width: 1 }}>
            <Box sx={{ height: '90px', width: '728px', bgcolor: '#D9D9D9', mb: 5 }} />
          </Stack>

          <Products />

          <InvestMentAndAdvertise />
        </Container>
      </FormProvider>
    </>
  );
}
