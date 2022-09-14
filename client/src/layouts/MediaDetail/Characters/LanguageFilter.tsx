import React from "react"
import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material"

interface LanguageFilterProps {
    languages: string[]
    current: string
    onChange: (language: string) => void
}

const LanguageFilter = ({ languages, current, onChange }: LanguageFilterProps) => {
    function handleChange(event: SelectChangeEvent) {
        onChange(event.target.value as string)
    }

    return (
        <Box sx={{ display: "flex" }}>
            <FormControl sx={{ ml: "auto" }} size="small">
                <InputLabel id="voice-actor-language-label">Language</InputLabel>
                <Select
                    labelId="voice-actor-language-label"
                    value={current || undefined}
                    label="Language"
                    onChange={handleChange}
                    sx={(theme) => ({ backgroundColor: theme.palette.background.light })}
                >
                    {languages.map((language) => (
                        <MenuItem key={language} value={language}>
                            {language}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default LanguageFilter
