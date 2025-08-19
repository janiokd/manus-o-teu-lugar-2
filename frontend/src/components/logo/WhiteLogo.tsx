import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
    disabledLink?: boolean;
}

const WhiteLogo = forwardRef<HTMLDivElement, LogoProps>(
    ({ disabledLink = false, sx, ...other }, ref) => {

        // OR using local (public folder)
        // -------------------------------------------------------
        const logo = (
            <Box
                component="img"
                src="/logo/logo-white.png"
                sx={{ height: 49.22, cursor: 'pointer', ...sx }}
                alt="Logo"
            />
        );

        if (disabledLink) {
            return logo;
        }

        return (
            <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
                {logo}
            </Link>
        );
    }
);

export default WhiteLogo;
