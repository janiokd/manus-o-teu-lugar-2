import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Grid, Card, CardContent, Button, TextField, CircularProgress } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

// Carousel component
interface CarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey.200',
          borderRadius: 2,
        }}
      >
        <Typography color="text.secondary">Sem imagens disponíveis</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
      {/* Main Image */}
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Imagem ${currentIndex + 1}`}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <Iconify icon="eva:arrow-left-fill" />
          </Button>
          <Button
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <Iconify icon="eva:arrow-right-fill" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToImage(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default function ImovelDetalhes() {
  const router = useRouter();
  const { id } = router.query;
  const settings = useSettingsContext();
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        console.log('Buscando imóvel com ID:', id);
        
        // Primeira tentativa: buscar por ID específico
        let response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/property/get/${id}`);
        
        if (!response.ok) {
          console.log('Busca por ID falhou, tentando buscar todos e filtrar...');
          // Segunda tentativa: buscar todos e filtrar
          response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/property/get`);
          
          if (response.ok) {
            const allProperties = await response.json();
            console.log('Todos os imóveis:', allProperties);
            
            // Filtrar por ID
            const foundProperty = allProperties.find((prop: any) => 
              prop._id === id || 
              prop.id === id || 
              prop._id?.toString() === id?.toString() ||
              prop.id?.toString() === id?.toString()
            );
            
            if (foundProperty) {
              console.log('Imóvel encontrado:', foundProperty);
              setProperty(foundProperty);
            } else {
              throw new Error('Imóvel não encontrado');
            }
          } else {
            throw new Error('Erro ao carregar imóvel');
          }
        } else {
          const propertyData = await response.json();
          console.log('Imóvel carregado:', propertyData);
          setProperty(propertyData);
        }
      } catch (err) {
        console.error('Erro ao carregar imóvel:', err);
        setError('Erro ao carregar detalhes do imóvel');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error" align="center">
          {error || 'Imóvel não encontrado'}
        </Typography>
      </Container>
    );
  }

  // Processar imagens
  const validImages = property.images?.filter((img: string) => 
    img && 
    typeof img === 'string' && 
    !img.startsWith('blob:') && 
    (img.startsWith('http://') || img.startsWith('https://'))
  ) || [];

  // Função para formatar preço
  const formatPrice = (price: any) => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.')) : price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numPrice || 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<Iconify icon="eva:arrow-left-fill" />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Coluna da Esquerda - Imagens */}
        <Grid item xs={12} md={8}>
          <ImageCarousel images={validImages} />
          
          {/* Informações do Imóvel */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {property.title || property.name || 'Nome do Imóvel'}
              </Typography>
              
              <Typography variant="h5" color="primary" gutterBottom>
                {formatPrice(property.price)}
              </Typography>
              
              <Typography variant="body1" color="text.secondary" gutterBottom>
                <Iconify icon="eva:pin-fill" sx={{ mr: 1 }} />
                {property.address || property.location || 'Endereço não informado'}
              </Typography>

              {/* Características */}
              <Box sx={{ display: 'flex', gap: 3, my: 2, flexWrap: 'wrap' }}>
                {(property.bedrooms || property.number_of_bedrooms) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="eva:home-fill" />
                    <Typography variant="body2">
                      {property.bedrooms || property.number_of_bedrooms} Dormitórios
                    </Typography>
                  </Box>
                )}
                
                {(property.suites || property.number_of_suites) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="eva:star-fill" />
                    <Typography variant="body2">
                      {property.suites || property.number_of_suites} Suítes
                    </Typography>
                  </Box>
                )}
                
                {(property.parking_spaces || property.number_of_parking_spaces) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="eva:car-fill" />
                    <Typography variant="body2">
                      {property.parking_spaces || property.number_of_parking_spaces} Vagas
                    </Typography>
                  </Box>
                )}
                
                {(property.area || property.total_area) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Iconify icon="eva:expand-fill" />
                    <Typography variant="body2">
                      {property.area || property.total_area}m²
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Sobre o Imóvel */}
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Sobre o Imóvel
              </Typography>
              <Typography variant="body1" paragraph>
                {property.description || property.property_description || 'Descrição não disponível'}
              </Typography>

              {/* Características do Imóvel */}
              {property.features && property.features.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Características do Imóvel
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {property.features.map((feature: string, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          px: 2,
                          py: 0.5,
                          backgroundColor: 'primary.light',
                          color: 'primary.contrastText',
                          borderRadius: 1,
                          fontSize: '0.875rem',
                        }}
                      >
                        {feature}
                      </Box>
                    ))}
                  </Box>
                </>
              )}

              {/* Proximidades */}
              {property.proximity && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Proximidades do Imóvel
                  </Typography>
                  <Typography variant="body1">
                    {property.proximity}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Coluna da Direita - Formulário de Contato */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Entre em Contato
              </Typography>
              
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Nome"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  type="email"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Telefone"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Mensagem"
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={`Olá, tenho interesse no imóvel ${property.title || property.name || ''}.`}
                />
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<Iconify icon="eva:email-fill" />}
                >
                  Enviar Mensagem
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

