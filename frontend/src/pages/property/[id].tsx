import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { LuBellRing } from 'react-icons/lu';
import { FaRegHeart } from 'react-icons/fa';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Grid,
  Stack,
  Divider,
  Checkbox,
  Container,
  Typography,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
// assets
import BedIcon from 'src/assets/icons/BedIcon';
import CarIcon from 'src/assets/icons/CarIcon';
import BathIcon from 'src/assets/icons/BathIcon';
import TickIcon from 'src/assets/icons/TickIcon';
import estateImage from 'src/assets/images/img.png';
import SquareIcon from 'src/assets/icons/SquareIcon';
import LocationIcon from 'src/assets/icons/LocationIcon';
import LocationAreaIcon from 'src/assets/icons/LocationAreaIcon';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// config
import { HEADER, HOST_API } from 'src/config-global';
// locales
import { useLocales } from 'src/locales';
// utils
import { fNumber } from 'src/utils/formatNumber';
// components
import Map from 'src/components/map/Map';
import Breadcrumb from 'src/components/customs/Breadcrumb';
import RoundButton from 'src/components/customs/RoundButton';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Carousel, { CarouselDots, CarouselArrows } from 'src/components/carousel';
import Image from 'src/components/image';
// types
import { IProduct } from 'src/@types/product';

// ----------------------------------------------------------------------

PropertyDetailPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

type FormValuesProps = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  afterSubmit?: string;
};

export default function PropertyDetailPage() {
  const { t } = useLocales();
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do imóvel
  useEffect(() => {
    if (id) {
      loadProperty(id as string);
    }
  }, [id]);

  const loadProperty = async (propertyId: string) => {
    try {
      setLoading(true);
      
      // Primeiro tentar buscar por ID específico
      let response = await fetch(`${HOST_API}/api/property/${propertyId}`);
      
      // Se não encontrar por ID, buscar todos e filtrar
      if (!response.ok) {
        console.log('Tentando buscar todos os imóveis...');
        const allPropertiesResponse = await fetch(`${HOST_API}/api/property/get`);
        if (allPropertiesResponse.ok) {
          const allProperties = await allPropertiesResponse.json();
          console.log('Todos os imóveis:', allProperties);
          
          const foundProperty = allProperties.find((prop: any) => 
            prop._id === propertyId || 
            prop.id === propertyId ||
            prop._id?.toString() === propertyId ||
            prop.id?.toString() === propertyId
          );
          
          if (foundProperty) {
            console.log('Imóvel encontrado:', foundProperty);
            const normalizedProperty = {
              ...foundProperty,
              price: foundProperty.price?.toString() || '0',
              features: foundProperty.features || {},
              type: foundProperty.type || 'Imóvel',
              description: foundProperty.description || 'Descrição não disponível',
            };
            
            setProperty(normalizedProperty);
            setLoading(false);
            return;
          }
        }
        throw new Error('Imóvel não encontrado');
      }
      
      const propertyData = await response.json();
      console.log('Dados do imóvel carregados:', propertyData);
      
      // Normalizar dados para compatibilidade
      const normalizedProperty = {
        ...propertyData,
        price: propertyData.price?.toString() || '0',
        features: propertyData.features || {},
        type: propertyData.type || 'Imóvel',
        description: propertyData.description || 'Descrição não disponível',
      };
      
      setProperty(normalizedProperty);
    } catch (err) {
      console.error('Erro ao carregar imóvel:', err);
      setError('Erro ao carregar dados do imóvel');
    } finally {
      setLoading(false);
    }
  };

  // Preparar imagens para o carrossel
  const getPropertyImages = () => {
    if (!property?.images || property.images.length === 0) {
      return [{ id: '1', image: estateImage.src, title: property?.title || 'Imóvel' }];
    }

    return property.images
      .filter((imageUrl: string) => {
        return imageUrl && 
               typeof imageUrl === 'string' && 
               imageUrl.trim() !== '' &&
               !imageUrl.startsWith('blob:') &&
               (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));
      })
      .map((imageUrl: string, index: number) => ({
        id: index.toString(),
        image: imageUrl,
        title: property.title || 'Imóvel',
      }));
  };

  const RegisterSchema = Yup.object().shape({});

  const defaultValues = {
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError: setFormError,
    handleSubmit,
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      console.log('Enviando mensagem:', data);
      // Aqui você pode implementar o envio da mensagem
    } catch (error) {
      console.error(error);
      reset();
      setFormError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" color="error" gutterBottom>
            {error || 'Imóvel não encontrado'}
          </Typography>
          <RoundButton 
            variant="contained" 
            color="primary" 
            onClick={() => router.push('/properties')}
          >
            Voltar para Imóveis
          </RoundButton>
        </Box>
      </Container>
    );
  }

  const images = getPropertyImages();

  return (
    <>
      <Head>
        <title>{property.title} - O Teu Lugar</title>
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ my: `${HEADER.H_MAIN_SPACING}px` }}>
          {/* Carrossel de Imagens */}
          <Box sx={{ borderRadius: '15px', overflow: 'hidden', height: '400px' }}>
            <Carousel
              autoplay
              autoplaySpeed={5000}
              dots
              arrows
              sx={{ height: '100%' }}
            >
              {images.map((item) => (
                <Box key={item.id} sx={{ position: 'relative', height: '400px' }}>
                  <Image
                    alt={item.title}
                    src={item.image}
                    sx={{ height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>

        <Grid container xs={12} md={12} spacing={4}>
          <Grid item xs={8} md={8}>
            <Stack spacing={2} sx={{ bgcolor: 'common.white', borderRadius: '10px', p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between">
                <Breadcrumb
                  title={`${t(`home`)} » ${t(`our_properties`)} » ${t(`buy`)}`}
                  breadcrumbItem={property.title}
                />
                <Stack direction="row" spacing={2} alignItems="center">
                  <FaRegHeart size={18} />
                  <LuBellRing size={18} />
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {t(`buy`)}
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="h1" color="primary">
                {property.title}
              </Typography>

              <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={2}>
                  <RoundButton variant="contained" color="secondary">
                    <Typography variant="overline" sx={{ textTransform: 'none' }}>
                      {t(`card.featured`)}
                    </Typography>
                  </RoundButton>
                  <RoundButton variant="contained" color="info">
                    <Typography variant="overline" sx={{ textTransform: 'none' }}>
                      {property.type || t(`buy`)}
                    </Typography>
                  </RoundButton>
                </Stack>
                
                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="start"
                  justifyContent="flex-start"
                  sx={{ pt: 1 }}
                >
                  <LocationIcon />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {property.address}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={4} flexWrap="wrap">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <BedIcon />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`${property.features?.bedrooms || 0} ${t(`card.bedrooms`)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <BathIcon />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`${property.features?.bathroom || 0} ${t(`card.suite`)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CarIcon />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`${property.features?.vacancies || 0} ${t(`card.vacancies`)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SquareIcon />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`${property.features?.area || 0}m² (${t(`card.usable_area`).toLowerCase()})`}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  spacing={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  sx={{ pt: 2 }}
                >
                  <Typography variant="subtitle1">{t(`card.from`)}</Typography>
                  <Typography variant="subtitle1">R$</Typography>
                  <Typography variant="h3">
                    {typeof property.price === 'string' 
                      ? property.price.replace(/[^\d]/g, '') 
                        ? fNumber(parseInt(property.price.replace(/[^\d]/g, '')))
                        : property.price
                      : fNumber(property.price)
                    }
                  </Typography>
                </Stack>
              </Stack>

              <Divider />

              <Stack direction="column" spacing={1}>
                <Typography variant="h4" color="primary">
                  {t(`buyPage.about_property`)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {property.description || 'Descrição não disponível.'}
                </Typography>
              </Stack>

              {property.features && Object.keys(property.features).length > 0 && (
                <>
                  <Divider />
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h4" color="primary">
                      {t(`advertisePage.property_features`)}
                    </Typography>
                    <Stack direction="column" spacing={1}>
                      {Object.entries(property.features).map(([key, value]) => {
                        if (key === 'bedrooms' || key === 'bathroom' || key === 'vacancies' || key === 'area') {
                          return null; // Já mostrados acima
                        }
                        return (
                          <Stack key={key} direction="row" spacing={2} alignItems="center">
                            <TickIcon />
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {`${key.replace(/_/g, ' ')}: ${value}`}
                            </Typography>
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                </>
              )}
            </Stack>
          </Grid>

          <Grid item xs={4} md={4} spacing={2}>
            <Stack spacing={2}>
              <Box sx={{ bgcolor: 'common.white', borderRadius: '15px', p: 2.5 }}>
                <Map />
              </Box>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{ bgcolor: 'common.white', borderRadius: '10px', p: 2.5 }}>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="h4">{t(`buyPage.interested`)}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {t(`buyPage.fill_info`)}
                    </Typography>
                    <RHFTextField
                      name="name"
                      variant="standard"
                      placeholder={t(`enter_name`)}
                      label={t(`name`)}
                    />
                    <RHFTextField
                      name="email"
                      variant="standard"
                      placeholder="lorem@gmail.com"
                      label={t(`email`)}
                    />
                    <RHFTextField
                      name="phoneNumber"
                      variant="standard"
                      placeholder="(XX) 9999-9999"
                      label={t(`phone_whatsapp`)}
                    />
                    <RHFTextField
                      name="message"
                      variant="standard"
                      placeholder={t(`type_here`)}
                      label={t(`buyPage.message`)}
                    />
                  </Stack>

                  <FormControlLabel
                    control={<Checkbox name="privacy" />}
                    label={
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {t(`advertisePage.privacyPolicy`)}
                      </Typography>
                    }
                  />

                  <RoundButton type="submit" size="large" variant="contained" color="secondary">
                    {t(`buyPage.send_message`)}
                  </RoundButton>
                </Stack>
              </FormProvider>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

