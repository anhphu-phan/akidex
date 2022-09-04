import { Box, styled, Typography } from "@mui/material"

export const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.light,
    width: "100vw",
    maxWidth: "100%",
}))

export const BannerImage = styled("img")(({ theme }) => ({
    width: "100%",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
        height: 200,
    },
    [theme.breakpoints.up("md")]: {
        height: 350,
    },
}))

export const Header = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gap: theme.spacing(2),
    color: "rgb(122, 133, 143)",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
        display: "block",
    },
    [theme.breakpoints.down("md")]: {
        minHeight: 200,
    },
    [theme.breakpoints.up("md")]: {
        minHeight: 300,
    },
}))

export const TitleWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
}))

export const Description = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(14),
}))

export const CoverImage = styled("img")(({ theme }) => ({
    position: "relative",
    height: "100%",
    alignSelf: "center",
    display: "block",
    marginInline: "auto",
    [theme.breakpoints.down("sm")]: {
        width: "60%",
        marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
        height: 200,
    },
    [theme.breakpoints.up("md")]: {
        height: 300,
    },
}))
