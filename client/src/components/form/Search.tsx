import React, { useState } from "react"
import { InputAdornment, formLabelClasses, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { useDebounce } from "react-use"
import { Input } from "."

interface SearchProps {
    isLoading: boolean
    handleChange: (newSearchText: string) => void
}

const Search = ({ isLoading, handleChange }: SearchProps) => {
    const [shrink, setShrink] = useState(false)
    const [value, setValue] = useState("")

    useDebounce(
        () => {
            handleChange(value)
        },
        800,
        [value]
    )

    function handleFocus() {
        setShrink(true)
    }

    function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
        !event.currentTarget.value && setShrink(false)
    }

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    return (
        <Input
            label="Search"
            size="small"
            disabled={isLoading}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <IconButton onClick={() => setValue("")} sx={{ visibility: value ? "visible" : "hidden" }}>
                        <CloseIcon />
                    </IconButton>
                ),
            }}
            InputLabelProps={{
                shrink,
                sx: {
                    ml: 3,
                    transform: "translate(14px, 9px) scale(1)",
                    "& ~ .MuiInputBase-root fieldset legend": {
                        maxWidth: 0
                    },
                    [`&.${formLabelClasses.focused}, &.${formLabelClasses.filled}`]: {
                        transform: "translate(-15px, -9px) scale(0.75)",
                    },
                    [`&.${formLabelClasses.focused} ~ .MuiInputBase-root legend, &.${formLabelClasses.filled} ~ .MuiInputBase-root legend`]:
                        {
                            maxWidth: "100%",
                        },
                },
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChange={handleChangeValue}
        />
    )
}

export default Search
