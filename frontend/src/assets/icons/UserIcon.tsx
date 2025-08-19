import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

function TrashIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.99984 11.6667C10.8408 11.6667 12.3332 10.1743 12.3332 8.33333C12.3332 6.49238 10.8408 5 8.99984 5C7.15889 5 5.6665 6.49238 5.6665 8.33333C5.6665 10.1743 7.15889 11.6667 8.99984 11.6667Z"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.6499 14.9475C4.15149 13.9596 4.91687 13.1298 5.86119 12.5501C6.80551 11.9705 7.89188 11.6637 8.9999 11.6637C10.1079 11.6637 11.1943 11.9705 12.1386 12.5501C13.0829 13.1298 13.8483 13.9596 14.3499 14.9475"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(TrashIcon);
