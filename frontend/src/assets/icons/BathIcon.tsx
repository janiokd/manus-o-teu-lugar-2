import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function BathIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="25"
        height="21"
        viewBox="0 0 25 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9H4V5C4 3.34315 5.34315 2 7 2C8.58963 2 9.8905 3.23637 9.99344 4.79996C10.0007 4.91018 9.91046 5 9.8 5H8.2C8.08954 5 8.00209 4.90955 7.98025 4.80128C7.88809 4.34419 7.48424 4 7 4C6.44772 4 6 4.44772 6 5V9Z"
          fill="#587792"
        />
        <path
          d="M6 19H4C4 16.2386 6.23858 15 9 15H15C17.7614 15 20 16.2386 20 19H18C18 17.3431 16.6569 17 15 17H9C7.34315 17 6 17.3431 6 19Z"
          fill="#587792"
        />
        <path
          d="M2 8.5C2 8.22386 2.22386 8 2.5 8H22.5C22.7761 8 23 8.22386 23 8.5V12C23 14.7614 20.7614 17 18 17H7C4.23858 17 2 14.7614 2 12V8.5Z"
          fill="#587792"
        />
      </svg>
    </Stack>
  );
}

export default memo(BathIcon);
