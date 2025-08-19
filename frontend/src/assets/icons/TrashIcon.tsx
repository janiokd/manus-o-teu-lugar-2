import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

function TrashIcon({ ...other }: StackProps) {
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
          d="M15.3334 3.66667H0.666748"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6 7.66667V13" stroke="#001D4A" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 7.66667V13" stroke="#001D4A" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M14 3.66667V16.3333C14 16.5101 13.9298 16.6797 13.8047 16.8047C13.6797 16.9298 13.5101 17 13.3333 17H2.66667C2.48986 17 2.32029 16.9298 2.19526 16.8047C2.07024 16.6797 2 16.5101 2 16.3333V3.66667"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3334 3.66667V2.33333C11.3334 1.97971 11.1929 1.64057 10.9429 1.39052C10.6928 1.14048 10.3537 1 10.0001 1H6.00008C5.64646 1 5.30732 1.14048 5.05727 1.39052C4.80722 1.64057 4.66675 1.97971 4.66675 2.33333V3.66667"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(TrashIcon);
