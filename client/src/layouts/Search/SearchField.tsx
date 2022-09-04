import React, { useState } from "react"
import { TextFieldProps, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import Input from "./helper-components/Input"

const SearchField = (props: TextFieldProps) => {
    const [shrink, setShrink] = useState(false)

    function handleFocus() {
        setShrink(true)
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        !event.currentTarget.value && setShrink(false)
    }

    return (
        <Input
            label="Search"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            {...props}
            InputLabelProps={{
                shrink,
                sx: { ml: 3, "&.Mui-focused": { transform: "translate(-15px, -9px) scale(0.75)" } },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    )
}

export default SearchField
