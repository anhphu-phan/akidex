import React, { useState } from "react"
import {
    Box,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Collapse,
    SxProps,
    Theme,
    Button,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { pages } from "CONSTANTS"
import { Link } from "react-router-dom"
import { useAppSelector } from "store/hooks"
import { selectNavbarHeight } from "store/slices/customizationSlice"
import { Search } from "../Search"

interface MobileNavigationProps {
    sx?: SxProps<Theme>
}

const MobileNavigation = ({ sx }: MobileNavigationProps) => {
    const navbarHeight = useAppSelector(selectNavbarHeight)
    const [open, setOpen] = useState(false)

    const toggleMenu = () => {
        setOpen((open) => !open)
    }

    return (
        <Box sx={{ ...sx }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleMenu}
                color="inherit"
            >
                {open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Collapse
                in={open}
                sx={(theme) => ({ position: "fixed", left: 0, right: 0, top: theme.mixins.toolbar.minHeight })}
            >
                <Search sx={{ width: "100%" }} />
                <Box>
                    {pages.map((page) => (
                        <Accordion
                            key={page.url}
                            sx={{
                                "&:before": { display: "none" },
                            }}
                            disableGutters
                            square
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={(theme) => ({
                                            color:
                                                theme.palette.mode === "dark"
                                                    ? theme.palette.getContrastText(theme.palette.primaryDark[900])
                                                    : theme.palette.getContrastText(theme.palette.primary.main),
                                        })}
                                    />
                                }
                                sx={(theme) => ({
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? theme.palette.primaryDark[900]
                                            : theme.palette.primary.main,
                                    fontWeight: 700,
                                    color:
                                        theme.palette.mode === "dark"
                                            ? theme.palette.getContrastText(theme.palette.primaryDark[900])
                                            : theme.palette.getContrastText(theme.palette.primary.main),
                                })}
                            >
                                {page.name}
                            </AccordionSummary>
                            {page.children &&
                                page.children.map((child) => (
                                    <AccordionDetails
                                        key={child.url}
                                        sx={(theme) => ({
                                            py: 0,
                                            bgcolor:
                                                theme.palette.mode === "dark"
                                                    ? theme.palette.primaryDark[700]
                                                    : theme.palette.primary[600],
                                            color:
                                                theme.palette.mode === "dark"
                                                    ? theme.palette.getContrastText(theme.palette.primaryDark[700])
                                                    : theme.palette.getContrastText(theme.palette.primary[500]),
                                        })}
                                    >
                                        <Button
                                            variant="link"
                                            component={Link}
                                            to={child.url}
                                            sx={{ pl: 3, py: 1, justifyContent: "start", color: "inherit" }}
                                            fullWidth
                                            disableFocusRipple
                                            onClick={toggleMenu}
                                        >
                                            {child.name}
                                        </Button>
                                    </AccordionDetails>
                                ))}
                        </Accordion>
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}

export default MobileNavigation
