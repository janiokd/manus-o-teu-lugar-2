import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function LocationAreaIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.79998 6.4C9.46272 6.4 9.99998 5.86274 9.99998 5.2C9.99998 4.53726 9.46272 4 8.79998 4C8.13723 4 7.59998 4.53726 7.59998 5.2C7.59998 5.86274 8.13723 6.4 8.79998 6.4Z"
          fill="#587792"
        />
        <path
          d="M13 5.2C13 9.4 8.79998 11.8 8.79998 11.8C8.79998 11.8 4.59998 9.4 4.59998 5.2C4.59998 4.08609 5.04247 3.01781 5.83013 2.23015C6.61778 1.4425 7.68607 1 8.79998 1C9.91389 1 10.9822 1.4425 11.7698 2.23015C12.5575 3.01781 13 4.08609 13 5.2Z"
          stroke="#587792"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.2 10.8355C15.679 11.3815 16.6 12.1495 16.6 13C16.6 14.6567 13.108 16 8.8 16C4.492 16 1 14.6567 1 13C1 12.1495 1.921 11.3815 3.4 10.8355"
          stroke="#587792"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(LocationAreaIcon);
