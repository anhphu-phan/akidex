import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { LeftSidebar } from './LeftSidebar'
import { Navbar } from './Navbar'
import { RightSidebar } from './RightSidebar'

const MainLayout = () => {
  return (
    <Box>
        <Navbar />
        <Container maxWidth='xl' disableGutters>
            <LeftSidebar />
            <Box>
                <Outlet />
            </Box>
            <RightSidebar />
        </Container>
    </Box>
  )
}

export default MainLayout