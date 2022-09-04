import React, { useState } from "react"
import { Autocomplete, AutocompleteProps } from "@mui/material"
import Input from "components/form/Input"
import { capitalize, getAnimeFormats } from "utils"
import { MediaFormat } from "types"

function getFormatLabel(format: MediaFormat) {
    return format
        .split("_")
        .map((word) => {
            if (word !== "TV" && word !== "ONA" && word !== "OVA") return capitalize(word)

            return word
        })
        .join(" ")
}

interface FormatInputProps {
    isLoading?: boolean
    value: MediaFormat | null
    handleChange: (newFormat: MediaFormat | null) => void
}

const FormatInput = ({ isLoading, value, handleChange }: FormatInputProps) => {
    const format = getAnimeFormats()
    const [inputValue, setInputValue] = useState("")

    return (
        <Autocomplete
            size="small"
            disabled={isLoading}
            options={format}
            getOptionLabel={(option) => getFormatLabel(option)}
            renderInput={(props) => <Input label="Format" {...props} />}
            value={value}
            onChange={(_, newFormat: MediaFormat | null) => handleChange(newFormat)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        />
    )
}

export default FormatInput
