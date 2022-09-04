import React from "react"
import { Autocomplete } from "@mui/material"
import { Input } from "components/form"
import { AnimeSearchParametersQuery } from "api/hooks/AnimeSearchParameters"

interface GenresInputProps {
    genreOptions?: AnimeSearchParametersQuery["genres"]
    tagOptions?: AnimeSearchParametersQuery["tags"]
    genres: string[]
    tags: string[]
    isLoading: boolean
    handleChangeGenres: (updatedGenres: string[], updatedTags: string[]) => void
}

const GenresInput = ({ genreOptions, tagOptions, genres, tags, isLoading, handleChangeGenres }: GenresInputProps) => {
    const options = [
        ...(genreOptions
            ? genreOptions.reduce((total: { type: string; name: string }[], genre) => {
                  if (genre) {
                      return [
                          ...total,
                          {
                              name: genre,
                              type: "Genres",
                          },
                      ]
                  }

                  return total
              }, [])
            : []),
        ...(tagOptions
            ? tagOptions.reduce((total: { type: string; name: string }[], tag) => {
                  if (tag) {
                      return [
                          ...total,
                          {
                              name: tag.name,
                              type: "Tags",
                          },
                      ]
                  }

                  return total
              }, [])
            : []),
    ]

    const defaultOptions = [
        ...genres.map((genre) => ({ type: "Genres", name: genre })),
        ...tags.map((tag) => ({ type: "Tags", name: tag })),
    ]

    const handleChange = (_: React.SyntheticEvent, newValue: { name: string; type: string }[]) => {
        const updatedGenres = newValue.filter((value) => value.type === "Genres").map((value) => value.name)
        const updatedTags = newValue.filter((value) => value.type === "Tags").map((value) => value.name)

        handleChangeGenres(updatedGenres, updatedTags)
    }

    return (
        <Autocomplete
            disabled={isLoading}
            multiple
            size="small"
            limitTags={1}
            options={options}
            groupBy={(option) => option?.type || ""}
            getOptionLabel={(option) => option?.name || ""}
            renderInput={(props) => <Input {...props} label="Genres" />}
            isOptionEqualToValue={(option, value) => option.name === value.name && option.type === value.type}
            value={defaultOptions}
            onChange={handleChange}
        />
    )
}

export default GenresInput
