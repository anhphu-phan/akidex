import React, { useLayoutEffect, useRef } from "react"
import { AppBar, Toolbar } from "@mui/material"
import Logo from "./Logo"
import { Navigation } from "./Navigation"
import { MobileNavigation } from "./MobileNavigation"
import UserSettings from "./UserSettings/UserSettings"
import ColorModeSwitching from "./ColorModeSwitching"
import { useAppDispatch } from "store/hooks"
import { updateNavbarHeight } from "store/slices/customizationSlice"

const Navbar = () => {
    const dispatch = useAppDispatch()
    const navbarRef = useRef<HTMLDivElement>(document.createElement("div"))

    useLayoutEffect(() => {
        dispatch(updateNavbarHeight(navbarRef.current.clientHeight))
    })

    return (
        <AppBar ref={navbarRef} position="sticky" elevation={0}>
            <Toolbar>
                <Logo sx={{ display: { xs: "none", md: "flex" } }} />
                {/* Mobile homburger button */}
                <MobileNavigation sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
                {/* Mobile Logo */}
                <Logo sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }} />
                <Navigation sx={{ ml: 2, fontFamily: "Overpass", display: { xs: "none", md: "flex" } }} />
                <ColorModeSwitching sx={{ mr: 2 }} />
                {/* User Avatar */}
                <UserSettings />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
