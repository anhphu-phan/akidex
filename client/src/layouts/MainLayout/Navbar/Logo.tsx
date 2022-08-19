import React from "react"
import { SxProps, Theme, Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"
import { Link } from "react-router-dom"

interface LogoProps {
    sx?: SxProps<Theme>
}

const Logo = ({ sx }: LogoProps) => {
    return (
        <Typography
            variant="logo"
            noWrap
            component={Link}
            to="/"
            sx={{
                mr: 2,
                fontWeight: 900,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                mx: { xs: "auto" },
                ...sx,
            }}
        >
            Ak
            <Typography
                variant="logo"
                color={yellow[500]}
                sx={{ fontSize: "inherit", textDecoration: "inherit", letterSpacing: "inherit", fontWeight: "inherit" }}
            >
                I
            </Typography>
            dEx
        </Typography>
    )
}

export default Logo
