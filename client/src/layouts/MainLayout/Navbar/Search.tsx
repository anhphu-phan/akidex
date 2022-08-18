import React, { useCallback, useState } from "react"
import {
    Autocomplete,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    TextField,
    Box,
    inputBaseClasses,
} from "@mui/material"
import { useMediaQuery } from "api/hooks/Media"
import { animeClient } from "graphql/graphql-request"
import { useDebounce } from "react-use"

// The search input need to apply debounce mechanism
const Search = () => {
    const [input, setInput] = useState("")
    const { data, isLoading, refetch } = useMediaQuery(animeClient, { search: input, perPage: 20 }, { enabled: false })

    useDebounce(
        () => {
            console.log("stop typing...")
            refetch()
        },
        500,
        [input]
    )

    const handleChangeInput = (event: React.SyntheticEvent, value: string) => {
        setInput(value)
    }

    return (
        <Box sx={{ width: 300 }}>
            <Autocomplete
                sx={{ bgcolor: "background.default", borderRadius: 10, height: 40, mr: 2 }}
                options={data?.Page?.media || []}
                getOptionLabel={(option) => option?.title?.romaji || ""}
                renderOption={(props, option) => (
                    <Card sx={{ display: "flex" }} square>
                        <CardMedia component="img" image={option?.coverImage?.medium || ""} sx={{ width: 50 }} />
                        <CardContent>{option?.title?.romaji}</CardContent>
                    </Card>
                )}
                loadingText="Loading..."
                inputValue={input}
                onInputChange={handleChangeInput}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        type="text"
                        InputProps={{
                            sx: {
                                borderRadius: 10,
                                height: 40,
                                [`& .${inputBaseClasses.input}`]: { boxSizing: "border-box" },
                                [`& fieldset`]: {
                                    border: "none",
                                },
                            },
                            ...params.InputProps,
                            placeholder: "Search...",
                            endAdornment: (
                                <React.Fragment>
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </Box>
    )
}

export default Search
