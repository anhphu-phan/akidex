import React from "react"
import { Card, CardMedia, Typography } from "@mui/material"
import { CardHeader } from "./helperComponents"

interface VoiceActorCardProps {
    voiceActorId?: number
    voiceActorName?: string
    voiceActorLanguage?: string
    voiceActorRoleNote?: string
    voiceActorImage?: string
}

const VoiceActorCard = ({
    voiceActorId,
    voiceActorLanguage,
    voiceActorName,
    voiceActorRoleNote,
    voiceActorImage,
}: VoiceActorCardProps) => {
    return (
        <Card
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderLeft: 0,
                boxShadow: "unset",
            }}
        >
            <CardHeader
                title={
                    voiceActorRoleNote ? (
                        <>
                            {voiceActorName}{" "}
                            <Typography
                                component="div"
                                variant="subtitle2"
                                sx={{ display: "block", fontSize: "0.75rem" }}
                            >
                                (abc)
                            </Typography>
                        </>
                    ) : (
                        voiceActorName
                    )
                }
                subheader={voiceActorLanguage}
                titleTypographyProps={{ sx: { textAlign: "right" } }}
                subheaderTypographyProps={{ sx: { textAlign: "right" } }}
            />
            <CardMedia
                component="img"
                src={voiceActorImage}
                sx={{ width: "min(30%, 80px)", maxHeight: "100%", objectFit: "cover" }}
                loading="lazy"
            />
        </Card>
    )
}

export default VoiceActorCard
