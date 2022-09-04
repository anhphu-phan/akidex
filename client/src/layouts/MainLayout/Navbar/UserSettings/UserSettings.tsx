import React from "react"
import {
    Box,
    IconButton,
    Avatar,
    Tooltip,
    Menu as MuiMenu,
    MenuItem,
    Typography,
    SxProps,
    Theme,
    styled,
    menuClasses,
} from "@mui/material"
import { settings } from "CONSTANTS"

interface UserSettingsProps {
    sx?: SxProps<Theme>
}

const Menu = styled(MuiMenu)(({ theme }) => {
    return {
        [`&&& .${menuClasses.paper}`]: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            marginInline: theme.spacing(1.5),
            "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                backgroundColor: theme.palette.background.paper,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
                border:
                    theme.palette.mode === "dark"
                        ? `1px solid ${theme.palette.primaryDark[700]}`
                        : `1px solid ${theme.palette.grey[200]}`,
                borderWidth: "1px 0 0 1px",
            },
        },
    }
}) as typeof MuiMenu

const UserSettings = ({ sx }: UserSettingsProps) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorElUser)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return (
        <Box sx={{ flexGrow: 0, ...sx }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                disableAutoFocusItem
                open={open}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.url} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default UserSettings
