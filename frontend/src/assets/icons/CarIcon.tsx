import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function CarIcon({ ...other }: StackProps) {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 0.5C15.16 0.5 15.72 0.92 15.92 1.51L18 7.5V15.5C18 16.05 17.55 16.5 17 16.5H16C15.45 16.5 15 16.05 15 15.5V14.5H3V15.5C3 16.05 2.55 16.5 2 16.5H1C0.45 16.5 0 16.05 0 15.5V7.5L2.08 1.51C2.29 0.92 2.84 0.5 3.5 0.5H14.5ZM14.14 2.5H3.85002L2.77002 5.61H15.22L14.14 2.5ZM4.5 8.5C3.67157 8.5 3 9.17157 3 10C3 10.8284 3.67157 11.5 4.5 11.5C5.32843 11.5 6 10.8284 6 10C6 9.17157 5.32843 8.5 4.5 8.5ZM12 10C12 9.17157 12.6716 8.5 13.5 8.5C14.3284 8.5 15 9.17157 15 10C15 10.8284 14.3284 11.5 13.5 11.5C12.6716 11.5 12 10.8284 12 10Z"
          fill="#587792"
        />
      </svg>
    </Stack>
  );
}

export default memo(CarIcon);
