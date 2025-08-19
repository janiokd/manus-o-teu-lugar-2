import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function LockIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3599 6.76H1.55992C1.20646 6.76 0.919922 7.04654 0.919922 7.4V16.36C0.919922 16.7135 1.20646 17 1.55992 17H14.3599C14.7134 17 14.9999 16.7135 14.9999 16.36V7.4C14.9999 7.04654 14.7134 6.76 14.3599 6.76Z"
          stroke="#001D4A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.76001 6.76V4.2C4.76001 3.35131 5.09715 2.53737 5.69727 1.93726C6.29738 1.33714 7.11132 1 7.96001 1C8.8087 1 9.62263 1.33714 10.2228 1.93726C10.8229 2.53737 11.16 3.35131 11.16 4.2V6.76"
          stroke="#001D4A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(LockIcon);
