import { useState } from 'react';
import { Box, Typography, Stack, Chip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocales } from 'src/locales';
import { PATH_PAGE } from 'src/routes/paths';
import img from 'src/assets/images/default-property.jpg';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

// ----------------------------------------------------------------------

type EstateCardProps = {
  product: any;
  height?: string;
};

// ----------------------------------------------------------------------

export default function EstateCard({ height, product }: EstateCardProps) {
  const theme = useTheme();
  const { t } = useLocales();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCardClick = () => {
    const propertyId = product._id || product.id;
    window.location.href = `/imovel-detalhes?id=${propertyId}`;
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === 0 ? finalList.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => 
      prev === finalList.length - 1 ? 0 : prev + 1
    );
  };

  const list = product.images && product.images.length > 0 
    ? product.images
        .filter((imageUrl: string) => {
          return imageUrl && 
                 typeof imageUrl === 'string' && 
                 imageUrl.trim() !== '' &&
                 !imageUrl.startsWith('blob:') &&
                 (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'));
        })
        .map((imageUrl: string, index: number) => ({
          id: index.toString(),
          name: product.title || 'Imóvel',
          image: imageUrl,
        }))
    : [];

  const finalList = list.length > 0 ? list : [
    {
      id: '0',
      name: product.title || 'Imóvel',
      image: img.src,
    },
  ];

  return (
    <Box 
      sx={{ 
        bgcolor: 'common.white', 
        borderRadius: '10px', 
        p: 1.25, 
        color: '#454545',
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: 'relative' }}>
        {/* Container do carrossel customizado */}
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: '15px',
            height: height || '250px',
            position: 'relative',
          }}
        >
          {/* Imagem atual */}
          <Box
            component="img"
            alt={finalList[currentImageIndex]?.name || 'Imóvel'}
            src={finalList[currentImageIndex]?.image || img.src}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
          
          {/* Setas de navegação - apenas se houver múltiplas imagens */}
          {finalList.length > 1 && (
            <>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: 8,
                  transform: 'translateY(-50%)',
                  zIndex: 1000,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  width: 36,
                  height: 36,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
                onClick={handlePrevImage}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
              
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 8,
                  transform: 'translateY(-50%)',
                  zIndex: 1000,
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  width: 36,
                  height: 36,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
                onClick={handleNextImage}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </>
          )}

          {/* Indicadores de pontos - apenas se houver múltiplas imagens */}
          {finalList.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                zIndex: 999,
              }}
            >
              {finalList.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: index === currentImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* Tags de destaque */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 9,
          }}
        >
          <Chip
            variant="filled"
            size="small"
            label="Destaque"
            sx={{
              color: 'common.white',
              bgcolor: 'warning.main',
            }}
          />
          <Chip
            variant="filled"
            size="small"
            label={product.type || 'Comprar'}
            sx={{
              color: 'common.white',
              bgcolor: 'info.main',
            }}
          />
        </Stack>
      </Box>

      {/* Informações do imóvel */}
      <Stack spacing={1} sx={{ p: 1 }}>
        <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 600 }}>
          {product.title || 'Título não disponível'}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px' }}>
          {product.address || 'Endereço não disponível'}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ fontSize: '12px' }}>
              {product.bedrooms || product.number_of_bedrooms || 0} Dormitórios
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ fontSize: '12px' }}>
              {product.suites || product.number_of_suites || 0} Suíte
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ fontSize: '12px' }}>
              {product.parking_spaces || product.number_of_parking_spaces || 0} Vagas
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography variant="caption" sx={{ fontSize: '12px' }}>
              {product.area || product.total_area || 0}m² (Área útil)
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
          <Typography variant="caption" sx={{ fontSize: '12px' }}>
            A partir de
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600 }}>
            R$ {product.price ? Number(product.price).toLocaleString('pt-BR') : '0'}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

// Force rebuild Mon Aug 18 19:22:33 EDT 2025
