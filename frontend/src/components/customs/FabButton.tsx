import React from 'react';
import { styled } from '@mui/material/styles';
import { FabProps, Fab } from '@mui/material';

interface Props extends FabProps {
  arrow?: boolean;
  focus?: boolean;
  children: React.ReactNode;
}

export default function FabButton({ arrow = true, focus, children, ...other }: Props) {
  const StyledButton = styled(Fab)(({ theme }) => ({
    width: '29px',
    height: '29px',
    lineHeight: 0,
    fontWeight: 600,
    fontSize: '12px',
    boxShadow: 'none',
    minHeight: '10px !important',
    backgroundColor: 'transparent',
    color: theme.palette.text.disabled,
    border: `solid 1px ${theme.palette.text.disabled}`,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.text.disabled,
    },
    ...(focus && {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.text.disabled,
    }),
  }));

  return <StyledButton variant='circular' {...other}>{children}</StyledButton>;
}
