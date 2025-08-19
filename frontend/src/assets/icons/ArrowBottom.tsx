import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function ArrowBottomIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 0.5L4 3.5L1 0.5"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(ArrowBottomIcon);
