import React from "react"
import { Box, BoxProps, styled } from "@mui/material"

const Form = styled((props: BoxProps) => <Box {...props} component="form" />)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingInline: theme.spacing(2),
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: theme.spacing(2),
}))

export default Form
