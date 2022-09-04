import React from "react"
import { TextFieldProps } from "@mui/material"
import { Input } from "."

const Select = (props: TextFieldProps) => {
    return <Input select {...props} />
}

export default Select
