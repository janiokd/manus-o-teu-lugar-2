import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function SquareArrowUpIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="31"
        height="30"
        viewBox="0 0 31 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_153_7249)">
          <path
            d="M15.5 16.875V3.75"
            stroke="#001D4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.8125 16.875V24.375H5.1875V16.875"
            stroke="#001D4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.8125 8.4375L15.5 3.75L20.1875 8.4375"
            stroke="#001D4A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_153_7249">
            <rect width="30" height="30" fill="white" transform="translate(0.5)" />
          </clipPath>
        </defs>
      </svg>
    </Stack>
  );
}

export default memo(SquareArrowUpIcon);
