import React from "react"
import { Autocomplete as MuiAutocomplete } from "@mui/material"
import Input from "./Input"

interface AutocompleteProps<T> {
    label: string
    options: T[]
    isLoading?: boolean
}

const Autocomplete = <T extends string | number>({ label, options, isLoading }: AutocompleteProps<T>) => {
    return (
        <MuiAutocomplete
            size="small"
            disabled={isLoading}
            options={options}
            getOptionLabel={(option) => option.toString()}
            renderInput={(props) => <Input label={label} {...props} />}
        />
    )
}

export default Autocomplete
