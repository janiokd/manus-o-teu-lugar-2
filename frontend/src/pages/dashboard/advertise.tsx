import * as Yup from 'yup';
import { useMemo } from 'react';
// next
import Head from 'next/head';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Divider, Container, Typography } from '@mui/material';
// @types
import { IProduct, IProductType } from 'src/@types/product';
// config
import { HEADER } from 'src/config-global';
// locales
import { useLocales } from 'src/locales';
// assets
import { features } from 'src/assets/data';
// next
import { useRouter } from 'next/router';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { CustomFile } from 'src/components/upload';
import FormProvider from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import Breadcrumb from 'src/components/customs/Breadcrumb';
// redux
import { dispatch } from 'src/redux/store';
import { registerProduct } from 'src/redux/slices/product';
import {
  MainForm,
  ImageForm,
  PriceForm,
  FeaturesForm,
  LocationForm,
  PrivacyPolicyForm,
  SecurityImageform,
} from 'src/sections/advertise';

// ----------------------------------------------------------------------

AdvertisePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

interface FormValuesProps extends Omit<IProduct, 'images'> {
  type: IProductType;
  city: object | null;
  state: object | null;
  owner: string;
  addOn: string;
  title: string;
  price: string;
  address: string;
  zipCode: string;
  features: Record<IProductType, object>;
  locations: string[];
  description: string;
  negotiation: string;
  phoneNumber: string;
  hideAddress: boolean;
  neighborhood: object | null;
  rentalPeriod: string;
  contactMethod: string;
  privacyPolicy: boolean;
  rentalDuration: number;
  image: CustomFile | string | null;
  images: (CustomFile | string)[];
  docImage: CustomFile | string | null;
  docImages: (CustomFile | string)[];
  afterSubmit?: string;
}

export default function AdvertisePage() {
  const theme = useTheme();
  const { t } = useLocales();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = useMemo(
    () => ({
      type: '',
      city: null,
      state: null,
      owner: '',
      addOn: '',
      title: '',
      price: '',
      address: '',
      zipCode: '',
      features,
      locations: [],
      negotiation: '',
      phoneNumber: '',
      hideAddress: false,
      neighborhood: null,
      rentalPeriod: 'days',
      contactMethod: '',
      privacyPolicy: false,
      rentalDuration: 0,
      image: null,
      images: [],
      docImage: null,
      docImages: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const RegisterSchema = Yup.object().shape({
    owner: Yup.string().required(t(`field_required`)),
    type: Yup.string().required(t(`field_required`)),
    negotiation: Yup.string().required(t(`field_required`)),
    rentalDuration: Yup.number().when('negotiation', {
      is: 'rental',
      then: (schema) => schema.required(t(`field_required`)).min(1, t(`field_required`)),
      otherwise: (schema) => schema.notRequired(),
    }),
    title: Yup.string().required(t(`field_required`)),
    zipCode: Yup.string()
      .matches(/^\d{5}-\d{3}$/, t(`field_required`))
      .required(t(`field_required`)),
    state: Yup.mixed().required(t(`field_required`)),
    city: Yup.mixed().required(t(`field_required`)),
    neighborhood: Yup.mixed().required(t(`field_required`)),
    address: Yup.string().required(t(`field_required`)),
    price: Yup.string()
      .typeError(t(`field_required`))
      .required(t(`field_required`))
      .min(1, t(`field_required`)),
    contactMethod: Yup.string().required(t(`field_required`)),
    privacyPolicy: Yup.boolean().oneOf([true], t(`field_required`)),
    phone_number: Yup.string(),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    // formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (form: FormValuesProps) => {
    try {
      console.log('formData:', form);
      
      // Convert CustomFile to string for images
      const processedForm = {
        ...form,
        images: form.images?.map(img => typeof img === 'string' ? img : img.preview || '') || [],
        features: { ...values.features[values.type] }
      };
      
      await dispatch(registerProduct(processedForm));
      reset();
      enqueueSnackbar('Create success!');
      push('/');
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
        <title>{t(`advertise`)}</title>
      </Head>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="lg">
          <Stack alignItems="center">
            <Box
              sx={{
                height: '90px',
                width: '728px',
                bgcolor: '#D9D9D9',
                my: `${HEADER.H_MAIN_SPACING}px`,
              }}
            />
          </Stack>

          <Box sx={{ bgcolor: theme.palette.common.white, borderRadius: '10px', p: 2.5 }}>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Breadcrumb
                title={`${t(`home`)} » ${t(`advertisePage.personal_area`)}`}
                breadcrumbItem={t(`advertisePage.register_property`)}
              />
              <Typography variant="h1" color="primary">
                {t(`advertisePage.register_property`)}
              </Typography>
            </Stack>

            <MainForm />

            <PriceForm />

            <ImageForm />

            <Divider sx={{ my: 4 }} />

            <FeaturesForm />

            <LocationForm />

            <SecurityImageform />

            <Divider sx={{ my: 4 }} />

            <PrivacyPolicyForm />
          </Box>

          <Stack direction="row" justifyContent="center" sx={{ mt: 8 }}>
            <Box sx={{ height: '250px', width: '970px', bgcolor: '#D9D9D9' }} />
          </Stack>
        </Container>
      </FormProvider>
    </>
  );
}
