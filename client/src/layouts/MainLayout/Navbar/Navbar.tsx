import React, { useLayoutEffect, useRef } from "react"
import { AppBar, Toolbar, Box } from "@mui/material"
import Logo from "./Logo"
import { Navigation } from "./Navigation"
import { MobileNavigation } from "./MobileNavigation"
import UserSettings from "./UserSettings/UserSettings"
import ColorModeSwitching from "./ColorModeSwitching"
import { useAppDispatch } from "store/hooks"
import { updateNavbarHeight } from "store/slices/customizationSlice"
import { Search } from "./Search"

const Navbar = () => {
    const dispatch = useAppDispatch()
    const navbarRef = useRef<HTMLDivElement>(document.createElement("div"))

    useLayoutEffect(() => {
        dispatch(updateNavbarHeight(navbarRef.current.clientHeight))
    })

    return (
        <AppBar ref={navbarRef} position="sticky" elevation={0}>
            <Toolbar sx={{ px: { xs: 0, sm: 1, md: 2 } }}>
                <Logo sx={{ display: { xs: "none", md: "flex" } }} />
                {/* Mobile homburger button */}
                <MobileNavigation sx={{ flexGrow: 1, flexBasis: 0, display: { xs: "flex", md: "none" } }} />
                {/* Mobile Logo */}
                <Logo
                    sx={{ flexGrow: 1, flexBasis: 0, justifyContent: "center", display: { xs: "flex", md: "none" } }}
                />
                <Navigation sx={{ ml: 2, fontFamily: "Overpass", display: { xs: "none", md: "flex" } }} />
                <Search sx={{ display: { xs: "none", md: "flex" } }} />
                <Box
                    sx={{
                        display: "flex",
                        flexGrow: { xs: 1, md: 0 },
                        flexBasis: 0,
                        justifyContent: "end",
                        scale: { xs: "0.75", sm: "1" },
                    }}
                >
                    <ColorModeSwitching sx={{ mr: 2 }} />
                    {/* User Avatar */}
                    <UserSettings />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
