import React from "react"
import { Card, CardMedia } from "@mui/material"
import { CardHeader } from "./helperComponents"
import { capitalize } from "utils"

interface CharacterCardProps {
    characterId?: number
    characterName?: string
    characterRole?: string
    characterImage?: string
}

const CharacterCard = ({ characterId, characterName, characterRole, characterImage }: CharacterCardProps) => {
    return (
        <Card
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                borderRadius: 0,
                borderRight: 0,
                boxShadow: "unset",
            }}
        >
            <CardMedia
                component="img"
                src={characterImage}
                sx={{ width: "min(30%, 80px)", maxHeight: "100%", objectFit: "cover" }}
                loading="lazy"
            />
            <CardHeader title={characterName} subheader={capitalize(characterRole || "")} />
        </Card>
    )
}

export default CharacterCard
