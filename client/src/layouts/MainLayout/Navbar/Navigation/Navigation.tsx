import React from "react"
import { Box, SxProps, Theme } from "@mui/material"
import { pages } from "CONSTANTS"
import NavigationItem from "./NavigationItem"

interface NavigationProps {
    sx?: SxProps<Theme>
}

const Navigation = ({ sx }: NavigationProps) => {
    return (
        <Box sx={{ height: "100%", bgcolor: "inherit", flexGrow: 1, gap: 1, ...sx }}>
            {pages.map((page) => (
                <NavigationItem key={page.url} item={page} />
            ))}
        </Box>
    )
}

export default Navigation
