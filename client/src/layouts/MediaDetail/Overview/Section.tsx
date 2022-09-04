import React from "react"
import { Box, SxProps, Theme, Typography } from "@mui/material"

interface SectionProps {
    title: string
    children?: React.ReactNode
    sx?: SxProps<Theme>
}

const Section = ({ title, children, sx }: SectionProps) => {
    return (
        <Box component="section">
            <Typography variant="subtitle1" textAlign="center">
                {title}
            </Typography>
            <Box sx={{ px: 5, py: 1.5, mt: 1, bgcolor: "background.light", ...sx }}>{children}</Box>
        </Box>
    )
}

export default Section
