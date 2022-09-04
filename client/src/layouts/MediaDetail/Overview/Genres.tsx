import React from "react"
import { Box, Chip } from "@mui/material"
import { Media } from "types/MediaCustom"
import Section from "./Section"

interface GenresProps {
    genres?: Media["genres"]
}

const Genres = ({ genres }: GenresProps) => {
    return (
        <Section title="Genres">
            <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 1 }}>
                {genres &&
                    genres.length > 0 &&
                    genres.map((genre) => <Chip key={genre} label={genre} sx={{ mr: 1 }} />)}
            </Box>
        </Section>
    )
}

export default Genres
