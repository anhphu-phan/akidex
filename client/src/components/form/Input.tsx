import React from "react"
import { TextFieldProps, inputBaseClasses, TextField, styled } from "@mui/material"

const Input = styled((props: TextFieldProps) => <TextField {...props} />)(({ theme }) => ({
    [`& .${inputBaseClasses.root}`]: {
        backgroundColor: theme.palette.background.light,
        overflow: "hidden",
    },
}))

export default Input
