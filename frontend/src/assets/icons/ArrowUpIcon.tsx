import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function ArrowUpIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z"
          stroke="#FFD670"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.8 13L13 8.19995L8.19995 13"
          stroke="#FFD670"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 17.8V8.19995"
          stroke="#FFD670"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(ArrowUpIcon);
