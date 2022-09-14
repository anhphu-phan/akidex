import { Box } from "@mui/material"
import React from "react"
import CharacterCard from "./CharacterCard"
import VoiceActorCard from "./VoiceActorCard"

interface CardProps {
    characterId?: number
    characterName?: string
    characterRole?: string
    characterImage?: string
    voiceActorId?: number
    voiceActorName?: string
    voiceActorLanguage?: string
    voiceActorRoleNote?: string
    voiceActorImage?: string
    anchorRef?: (node?: Element | null | undefined) => void
}

const Card = ({
    characterId,
    characterName,
    characterRole,
    characterImage,
    voiceActorId,
    voiceActorName,
    voiceActorLanguage,
    voiceActorRoleNote,
    voiceActorImage,
    anchorRef,
}: CardProps) => {
    return (
        <Box
            sx={{
                height: 100,
                width: "100%",
                display: "flex",
            }}
            ref={anchorRef}
        >
            <CharacterCard
                characterId={characterId}
                characterName={characterName}
                characterRole={characterRole}
                characterImage={characterImage}
            />
            <VoiceActorCard
                voiceActorId={voiceActorId}
                voiceActorName={voiceActorName}
                voiceActorLanguage={voiceActorLanguage}
                voiceActorRoleNote={voiceActorRoleNote}
                voiceActorImage={voiceActorImage}
            />
        </Box>
    )
}

export default Card
