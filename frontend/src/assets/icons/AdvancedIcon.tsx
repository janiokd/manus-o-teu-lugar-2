import { memo } from 'react';
// @mui
import { Stack, StackProps } from '@mui/material';

// ----------------------------------------------------------------------

function AdvancedIcon({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.81805 5.81817C8.02303 5.81817 8.99987 4.84133 8.99987 3.63635C8.99987 2.43136 8.02303 1.45453 6.81805 1.45453C5.61306 1.45453 4.63623 2.43136 4.63623 3.63635C4.63623 4.84133 5.61306 5.81817 6.81805 5.81817Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6364 14.5455C13.8414 14.5455 14.8182 13.5686 14.8182 12.3636C14.8182 11.1587 13.8414 10.1818 12.6364 10.1818C11.4314 10.1818 10.4546 11.1587 10.4546 12.3636C10.4546 13.5686 11.4314 14.5455 12.6364 14.5455Z"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 3.63635H17" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1 3.63635H4.63636" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M14.8181 12.3636H16.9999"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M1 12.3636H10.4545" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Stack>
  );
}

export default memo(AdvancedIcon);
