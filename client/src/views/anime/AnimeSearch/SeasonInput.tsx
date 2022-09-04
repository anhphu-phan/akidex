import React, { useState } from "react"
import { Autocomplete } from "@mui/material"
import Input from "components/form/Input"
import { capitalize } from "utils"
import { MediaSeason } from "types"

interface SeasonInputProps {
    isLoading?: boolean
    value: MediaSeason | null
    handleChange: (newSeason: MediaSeason | null) => void
}

const SeasonInput = ({ isLoading, value, handleChange }: SeasonInputProps) => {
    const seasons = Object.values(MediaSeason)
    const [inputValue, setInputValue] = useState("")

    return (
        <Autocomplete
            size="small"
            disabled={isLoading}
            options={seasons}
            getOptionLabel={(option) => capitalize(option)}
            renderInput={(props) => <Input label="Season" {...props} />}
            value={value}
            onChange={(_, newSeason: MediaSeason | null) => handleChange(newSeason)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        />
    )
}

export default SeasonInput
