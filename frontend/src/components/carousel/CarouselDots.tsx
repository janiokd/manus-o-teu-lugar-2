/* eslint-disable react/jsx-no-useless-fragment */
// @mui
import { styled, Theme } from '@mui/material/styles';
import { Box, BoxProps, Stack, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type StyledRootProps = {
  rounded: boolean;
};

const StyledRoot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'rounded',
})<StyledRootProps>(({ color, rounded, theme }) => ({
  zIndex: 9,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  '& li': {
    width: 18,
    height: 18,
    opacity: 0.32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&.slick-active': {
      opacity: 1,
      width: 14,
      height: 14,
      border: '2px solid',
      borderColor: color || 'white',
      borderRadius: '50%',
      padding: '2px !important',
      ...(rounded && {
        '& span': {
          width: '10px !important',
          height: '10px !important',
          borderRadius: 6,
        },
      }),
    },
  },
}));

const StyledDot = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
}));

// ----------------------------------------------------------------------

export interface Props extends BoxProps {
  color?: string;
  rounded?: boolean;
  sx?: SxProps<Theme>;
}

export default function CarouselDots(props?: Props) {
  const rounded = props?.rounded || false;

  const sx = props?.sx;

  return {
    appendDots: (dots: React.ReactNode) => (
      <>
        <StyledRoot component="ul" rounded={rounded} sx={sx} {...props}>
          {dots}
        </StyledRoot>
      </>
    ),
    customPaging: () => (
      <Stack component="div" alignItems="center" justifyContent="center">
        <StyledDot
          sx={{
            bgcolor: 'currentColor',
          }}
        />
      </Stack>
    ),
  };
}
