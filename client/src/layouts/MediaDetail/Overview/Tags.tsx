import React from "react"
import { Box, Chip } from "@mui/material"
import { Media } from "types/MediaCustom"
import Section from "./Section"

interface TagsProps {
    tags?: Media["tags"]
}

const Tags = ({ tags }: TagsProps) => {
    return (
        <Section title="Tags">
            <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 1 }}>
                {tags &&
                    tags.length > 0 &&
                    tags.map((tag) => <Chip key={tag?.name} label={tag?.name} sx={{ mr: 1 }} />)}
            </Box>
        </Section>
    )
}

export default Tags
