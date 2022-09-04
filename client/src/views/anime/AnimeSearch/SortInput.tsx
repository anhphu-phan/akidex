import React, { useState } from "react"
import { Autocomplete } from "@mui/material"
import { MediaSort } from "types"
import { Input } from "components/form"

interface SortInputProsp {
    isLoading?: boolean
    value: MediaSort
    handleChange: (newSortType: MediaSort) => void
}

const sortTypes = [
    {
        type: MediaSort.TitleRomaji,
        label: "Title",
    },
    { type: MediaSort.PopularityDesc, label: "Popularity" },
    { type: MediaSort.ScoreDesc, label: "Average Score" },
    { type: MediaSort.TrendingDesc, label: "Trending" },
    { type: MediaSort.FavouritesDesc, label: "Favorite" },
    { type: MediaSort.UpdatedAtDesc, label: "Update" },
    { type: MediaSort.StartDateDesc, label: "Release Date" },
]

const SortInput = ({ isLoading, value, handleChange }: SortInputProsp) => {
    const [inputValue, setInputValue] = useState<string>(value)

    return (
        <Autocomplete
            size="small"
            disabled={isLoading}
            options={sortTypes}
            getOptionLabel={(option) => option.label}
            renderInput={(props) => <Input label="Sort" {...props} />}
            value={sortTypes.find((sort) => sort.type === value)}
            onChange={(_, newSortType: { type: MediaSort; label: string } | null | undefined) =>
                newSortType && handleChange(newSortType.type)
            }
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        />
    )
}

export default SortInput
