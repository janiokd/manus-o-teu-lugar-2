import React from "react";
import { Box } from "@mui/material"
import { styled } from '@mui/material/styles';

type Props = {
    children?: React.ReactNode;
    src: string,
    position: "left" | "right",
    sx?: any
}

export default function ImageBox({ src, position, sx, children }: Props) {

    const BackgroundImageBox = styled(Box)(() => ({
        height: '380px',
        width: "100%",
        backgroundImage: `
        url(${src}),
        ${position === 'left'
                ? 'linear-gradient(to right, #00000000, #000000CC)'
                : 'linear-gradient(to right, #000000CC, #00000000)'}
      `,
        backgroundSize: 'cover', // Scale the image to cover the box
        backgroundBlendMode: 'overlay',
        backgroundRepeat: 'no-repeat', // Prevent repeating the background
        backgroundPosition: 'center', // Center the background image
        borderRadius: "20px"
    }));

    return (
        <BackgroundImageBox sx={{ justifyContent: position, p: 8.75 }}>{children}</BackgroundImageBox>
    )
}