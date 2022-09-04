import React, { useState } from "react"
import { Autocomplete } from "@mui/material"
import Input from "components/form/Input"

interface YearInputProps {
    isLoading?: boolean
    value: number | null
    handleChange: (newYear: number | null) => void
    options: number[]
}

const YearInput = ({ isLoading, options, value, handleChange }: YearInputProps) => {
    const [inputValue, setInputValue] = useState("")

    return (
        <Autocomplete
            size="small"
            disabled={isLoading}
            options={options}
            getOptionLabel={(option) => option.toString()}
            renderInput={(props) => <Input label="Year" {...props} />}
            value={value}
            onChange={(_, newYear: number | null) => handleChange(newYear)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        />
    )
}

export default YearInput
