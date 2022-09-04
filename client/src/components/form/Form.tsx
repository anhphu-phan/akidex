import React from "react"
import { Box, BoxProps, styled } from "@mui/material"

const Form = styled((props: BoxProps) => <Box {...props} component="form" />)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingInline: theme.spacing(2),
    display: "grid",
    justifyContent: 'center',
    // [theme.breakpoints.down("sm")]: {
    //     gridTemplateColumns: "repeat(1, 1fr)",
    // },
    // [theme.breakpoints.up("sm")]: {
    //     gridTemplateColumns: "repeat(2, 1fr)",
    // },
    // [theme.breakpoints.up("md")]: {
    //     gridTemplateColumns: "repeat(3, 1fr)",
    // },
    // [theme.breakpoints.up("lg")]: {
    //     gridTemplateColumns: "repeat(5, 1fr)",
    // },
    gridTemplateColumns: "repeat(auto-fill, 220px)",
    gap: theme.spacing(2),
}))

export default Form
