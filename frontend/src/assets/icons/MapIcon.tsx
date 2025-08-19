import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function MapIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.22233 4.11117C9.14281 4.11117 9.889 3.36497 9.889 2.4445C9.889 1.52402 9.14281 0.777832 8.22233 0.777832C7.30186 0.777832 6.55566 1.52402 6.55566 2.4445C6.55566 3.36497 7.30186 4.11117 8.22233 4.11117Z"
          fill="#001D4A"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.66667 9.11117C3.58714 9.11117 4.33333 8.36497 4.33333 7.4445C4.33333 6.52402 3.58714 5.77783 2.66667 5.77783C1.74619 5.77783 1 6.52402 1 7.4445C1 8.36497 1.74619 9.11117 2.66667 9.11117Z"
          fill="#001D4A"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.9999 15.2222C11.9204 15.2222 12.6666 14.4761 12.6666 13.5556C12.6666 12.6351 11.9204 11.8889 10.9999 11.8889C10.0794 11.8889 9.33325 12.6351 9.33325 13.5556C9.33325 14.4761 10.0794 15.2222 10.9999 15.2222Z"
          fill="#001D4A"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.3334 5.77779C15.2539 5.77779 16.0001 5.0316 16.0001 4.11112C16.0001 3.19065 15.2539 2.44446 14.3334 2.44446C13.4129 2.44446 12.6667 3.19065 12.6667 4.11112C12.6667 5.0316 13.4129 5.77779 14.3334 5.77779Z"
          fill="#001D4A"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.7257 3.67297L9.82983 2.88269"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.9833 3.55969L3.90552 6.32914"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.01099 8.42993L9.65543 12.5702"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.5547 11.9833L13.7783 5.68335"
          stroke="#001D4A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Stack>
  );
}

export default memo(MapIcon);
