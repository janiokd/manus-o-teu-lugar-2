import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

function TickIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="14"
        height="11"
        viewBox="0 0 14 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 6L4.5 9.5L12.5 1.5"
          stroke="#587792"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(TickIcon);
