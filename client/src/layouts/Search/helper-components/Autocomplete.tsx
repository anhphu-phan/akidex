import React from "react"
import { Autocomplete as MuiAutocomplete } from "@mui/material"
import Input from "./Input"

interface AutocompleteProps<T> {
    label: string
    options: T[]
}

const Autocomplete = <T,>({ label, options }: AutocompleteProps<T>) => {
    return <MuiAutocomplete options={options} renderInput={(props) => <Input label={label} {...props} />} />
}

export default Autocomplete
