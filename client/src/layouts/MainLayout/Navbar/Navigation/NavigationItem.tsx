// https://stackoverflow.com/questions/55318477/how-to-make-material-ui-menu-based-on-hover-not-click#answer-73310007

import React, { useRef, useState } from "react"
import { Page } from "CONSTANTS"
import {
    Box,
    Button as MuiButton,
    Menu as MuiMenu,
    MenuItem,
    SxProps,
    Typography,
    Collapse,
    menuItemClasses,
    menuClasses,
    styled,
    popoverClasses,
    ClickAwayListener,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { Link } from "react-router-dom"
import { Theme } from "@mui/material"

interface NavigationItemProps {
    item: Page
    sx?: SxProps<Theme>
}

interface CustomMenuProps {
    paperHeight: number
}

const Menu = styled(MuiMenu, {
    shouldForwardProp: (prop) => prop !== "paperHeight",
})<CustomMenuProps>(({ theme, open, paperHeight }) => ({
    fontFamily: "inherit",
    color: "inherit",
    transform: "translateX(-0.5rem)",
    pointerEvents: 'none',

    [`&& .${menuItemClasses.root}:hover`]: {
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.primaryDark[700] : theme.palette.primary[600],
    },

    [`& .${menuClasses.paper}`]: {
        overflowY: "hidden",
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.primaryDark[900] : theme.palette.primary.main,
        border: 0,
        boxShadow: "unset",
        borderRadius: 0,
        color: "inherit",
        height: open ? paperHeight : 0,
        transition: theme.transitions.create("height", {
            duration: theme.transitions.getAutoHeightDuration(paperHeight),
            easing: theme.transitions.easing.easeOut,
        }),
    },

    [`& .${popoverClasses.root}`]: {
        pointerEvents: "none !important",
    },

    [`& .${menuClasses.list}`]: {
        pointerEvents: 'auto'
    }
}))

const Button = styled(MuiButton)(() => ({
    marginBlock: 0,
    height: "100%",
    color: "white",
    display: "flex",
    alignItems: "center",
    fontSize: "1.25rem",
    fontFamily: "inherit",
    borderRadius: 0,
}))

const NavigationItem = ({ item, sx }: NavigationItemProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const menuRef = useRef<HTMLDivElement>(document.createElement("div"))
    const open = Boolean(anchorEl)

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget)
        } else {
            setAnchorEl(null)
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <Box>
                <Button
                    endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={handleToggle}
                    sx={{
                        ...sx,
                    }}
                >
                    {item.name}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    PaperProps={{
                        ref: menuRef,
                    }}
                    TransitionComponent={Collapse}
                    paperHeight={menuRef.current.scrollHeight}
                    disableAutoFocusItem
                    disablePortal
                    keepMounted
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                >
                    {item.children &&
                        item.children.map((childItem) => (
                            <MenuItem
                                key={childItem.url}
                                component={Link}
                                to={childItem.url}
                                onClick={handleClose}
                                sx={{py: 1.25, fontFamily: "inherit", color: "inherit" }}
                            >
                                <Typography fontFamily="inherit">{childItem.name}</Typography>
                            </MenuItem>
                        ))}
                </Menu>
            </Box>
        </ClickAwayListener>
    )
}

export default NavigationItem
