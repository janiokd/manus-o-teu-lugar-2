import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  radial?: string;
  children?: React.ReactNode;
}
export default function RoundButton({ radial, size, children, ...other }: Props) {
  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: size === 'large' ? 40 : 20,
  }));

  return (
    <StyledButton size={size} {...other}>
      {children}
    </StyledButton>
  );
}
