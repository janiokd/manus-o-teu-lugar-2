import * as Yup from 'yup';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, Grid, Divider, Container, Typography } from '@mui/material';
// locales
import { useLocales } from 'src/locales';
// config
import { HEADER } from 'src/config-global';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// redux
import { dispatch } from 'src/redux/store';
import { getAllProducts, getProducts } from 'src/redux/slices/product';
// components
import { MapWithDrawing } from 'src/components/map';
import FormProvider from 'src/components/hook-form';
import Breadcrumb from 'src/components/customs/Breadcrumb';
import RoundButton from 'src/components/customs/RoundButton';
import { convertBrazilianNumber } from 'src/utils/formatNumber';
import ActivateButtonGroup from 'src/components/customs/ActiveButtonGroup';
// sections
import { FeaturesForm, MainForm, Products, RoomForm, SizeForm } from 'src/sections/properties';

// ----------------------------------------------------------------------

PropertisePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

type FormValuesProps = {
  keyword: string;
  services: string[];
  categories: string[];
  features: object;
  subFeatures: {
    bedrooms: number;
    bathroom: number;
    livingroom: number;
    vacancies: number;
    kitchen: number;
    swimmingpool: number;
    sauna: number;
    gym: number;
    courts: number;
    cinema: number;
    gamesroom: number;
    eventsroom: number;
    barbecuegrills: number;
  };
  location: string;
  city: object | null;
  state: object | null;
  neighborhood: object | null;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  totalMinArea: string;
  totalMaxArea: string;
  afterSubmit?: string;
};

export default function PropertisePage() {
  const { t } = useLocales();

  const [address, setAddress] = useState<string>('');
  const [addresses, setAddresses] = useState<string[]>([]);
  console.log('address', address);
  console.log('addresses', addresses);

  // Carregar todos os imóveis quando a página for carregada
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const RegisterSchema = Yup.object().shape({
    minPrice: Yup.string()
      // .required(t(`field_required`))
      .test('is-smaller', t(`min_less_than_max`), (value, context) => {
        if (value && context.parent.maxPrice) {
          return convertBrazilianNumber(value) < convertBrazilianNumber(context.parent.maxPrice);
        }
        return true;
      }),

    maxPrice: Yup.string()
      // .required(t(`field_required`))
      .test('is-greater', t(`max_greater_than_min`), (value, context) => {
        if (value && context.parent.minPrice) {
          return convertBrazilianNumber(value) > convertBrazilianNumber(context.parent.minPrice);
        }
        return true;
      }),

    minArea: Yup.string()
      // .required(t(`field_required`))
      .test('is-smaller', t(`min_less_than_max`), (value, context) => {
        if (value && context.parent.maxArea) {
          return convertBrazilianNumber(value) < convertBrazilianNumber(context.parent.maxArea);
        }
        return true;
      }),

    maxArea: Yup.string()
      // .required(t(`field_required`))
      .test('is-greater', t(`max_greater_than_min`), (value, context) =>
        // convertBrazilianNumber(value) > convertBrazilianNumber(context.parent.minArea)
        {
          if (value && context.parent.minArea) {
            return convertBrazilianNumber(value) > convertBrazilianNumber(context.parent.minArea);
          }
          return true;
        }
      ),

    totalMinArea: Yup.string()
      // .required(t(`field_required`))
      .test('is-smaller', t(`min_less_than_max`), (value, context) =>
        // convertBrazilianNumber(value) < convertBrazilianNumber(context.parent.totalMaxArea)
        {
          if (value && context.parent.totalMaxArea) {
            return (
              convertBrazilianNumber(value) < convertBrazilianNumber(context.parent.totalMaxArea)
            );
          }
          return true;
        }
      ),

    totalMaxArea: Yup.string()
      // .required(t(`field_required`))
      .test('is-greater', t(`max_greater_than_min`), (value, context) =>
        // convertBrazilianNumber(value) > convertBrazilianNumber(context.parent.totalMinArea)
        {
          if (value && context.parent.totalMinArea) {
            return (
              convertBrazilianNumber(value) > convertBrazilianNumber(context.parent.totalMinArea)
            );
          }
          return true;
        }
      ),
  });

  const defaultValues = {
    keyword: '',
    services: [],
    categories: [],
    features: {},
    subFeatures: {
      bedrooms: 0,
      bathroom: 0,
      livingroom: 0,
      vacancies: 0,
      kitchen: 0,
      swimmingpool: 0,
      sauna: 0,
      gym: 0,
      courts: 0,
      cinema: 0,
      gamesroom: 0,
      eventsroom: 0,
      barbecuegrills: 0,
    },
    location: '',
    city: null,
    state: null,
    neighborhood: null,
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    totalMinArea: '',
    totalMaxArea: '',
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
      console.log('formData:', form);
      await dispatch(getProducts(form));
      reset();
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
        <title>{t(`properties`)}</title>
      </Head>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Stack spacing="2" sx={{ my: `${HEADER.H_MAIN_SPACING}px` }}>
            <Breadcrumb title={t(`home`)} breadcrumbItem={t(`propertiesPage.our_properties`)} />
            <Typography variant="h1" color="primary">
              {t(`propertiesPage.our_properties`)}
            </Typography>
          </Stack>
        </Container>

        <Container maxWidth="xl">
          <Box sx={{ my: 2 }}>
            <MapWithDrawing
              height="560px"
              text={t(`draw_area`)}
              setAddress={setAddress}
              setAddresses={setAddresses}
            />
          </Box>
        </Container>

        <Container maxWidth="lg">
          <Stack alignItems="center" sx={{ my: 4 }}>
            <Box sx={{ height: '90px', width: '728px', bgcolor: '#D9D9D9' }} />
          </Stack>

          <Grid item xs={12} spacing={2} container>
            <Grid item xs={6} md={3}>
              <Stack
                sx={{ padding: '10px 20px', borderRadius: '15px', bgcolor: 'white' }}
                spacing={2}
              >
                <ActivateButtonGroup
                  name="services"
                  arrow={false}
                  color="primary"
                  direction="column"
                />

                <MainForm />

                <Divider />

                <RoomForm />

                <FeaturesForm />

                <Divider />

                <SizeForm />
              </Stack>

              <Stack>
                <RoundButton
                  type="submit"
                  size="large"
                  color="secondary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                >
                  {t(`propertiesPage.search_property`)}
                </RoundButton>
              </Stack>

              <Stack alignItems="center" sx={{ pt: 2 }}>
                <Box sx={{ height: '250px', width: '100%', bgcolor: '#D9D9D9' }} />
              </Stack>
            </Grid>

            <Products />

            <Grid item xs={12}>
              <Stack alignItems="center" sx={{ mt: 8 }}>
                <Box sx={{ height: '250px', width: '970px', bgcolor: '#D9D9D9' }} />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </FormProvider>
    </>
  );
}
