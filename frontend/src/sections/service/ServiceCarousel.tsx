import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
// components
import { Stack } from '@mui/system';
import SvgColor from 'src/components/svg-color';
import Carousel, { CarouselDots } from '../../components/carousel';
import Image from '../../components/image';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

export default function CarouselBasic3({ data }: Props) {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    variableWidth: true,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      color: '#454545',
      sx: { mt: 3, color: '#454545' },
    }),
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel ref={carouselRef} {...carouselSettings}>
        {data.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
      <Stack
        direction="row"
        justifyContent='space-between'
        alignItems='center'
        sx={{ position: 'absolute', width: '100%', zIndex: 50, bottom: 1 }}
      >
        <IconButton onClick={handlePrev} size="small">
          <SvgColor src='/assets/icons/arrow-left.svg' sx={{ width: '24px', height: '24px' }} />
        </IconButton>
        <IconButton onClick={handleNext} size="small">
          <SvgColor src='/assets/icons/arrow-right.svg' sx={{ width: '24px', height: '24px' }} />
        </IconButton>
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { image, title } = item;

  return (
    <Box sx={{ px: 1, bgcolor: 'transparent' }}>
      <Image
        alt={title}
        src={image}
        borderRadius='15px'
        sx={{ width: '848px', height: '547', objectFit: 'contain', borderRadius: '15px' }}
      />
    </Box>
  );
}
