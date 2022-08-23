import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material"
import React from "react"
import { Outlet } from "react-router-dom"
import { LeftSidebar } from "./LeftSidebar"
import { Navbar } from "./Navbar"
import { RightSidebar } from "./RightSidebar"

const MainLayout = () => {
    return (
        <Box>
            <Navbar />
            <Container maxWidth="xl" disableGutters>
                <Outlet />
            </Container>
        </Box>
    )
}

export default MainLayout
