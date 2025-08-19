import React from 'react';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material';
//
import RoundButton from './RoundButton';

interface Props extends ButtonProps {
  arrow?: boolean;
  focus?: boolean;
  borderColor: 'primary' | 'secondary';
  children?: React.ReactNode;
}

export default function ActiveButton({
  borderColor,
  arrow = true,
  focus,
  children,
  ...other
}: Props) {
  const StyledButton = styled(RoundButton)(({ theme }) => ({
    backgroundColor: 'transparent',
    ...(focus && {
      color: borderColor === 'secondary' ? theme.palette.text.primary : theme.palette.common.white,
      backgroundColor: theme.palette[borderColor].main,
      ...(arrow && {
        '&:before, &:after': {
          content: "''", // For the top arrow
          position: 'absolute',
          top: '100%', // Position it below the button
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '6px', // Arrow size
          borderStyle: 'solid',
          borderColor: `${theme.palette[borderColor].main} transparent transparent transparent`, // Triangle color
        },
      }),
      '&:hover': {
        // color: theme.palette[borderColor].main,
        backgroundColor: theme.palette[borderColor].main,
      },
    }),
  }));

  return (
    <StyledButton variant="outlined" {...other}>
      {children}
    </StyledButton>
  );
}
