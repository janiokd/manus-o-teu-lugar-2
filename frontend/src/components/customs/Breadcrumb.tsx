import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

interface BreadcrumbProps {
  title: string;
  breadcrumbItem?: string;
  link?: string;
}

export default function Breadcrumb({ title, breadcrumbItem, link }: BreadcrumbProps) {
  return (
    <Stack direction="row" spacing={0.5} sx={{ color: '#587792' }}>
      <Typography variant="subtitle1">{title}</Typography>
      {breadcrumbItem && (
        <>
          <Typography variant="subtitle1">»</Typography>
          <Typography variant="subtitle1">{breadcrumbItem}</Typography>
        </>
      )}
    </Stack>
  );
}
