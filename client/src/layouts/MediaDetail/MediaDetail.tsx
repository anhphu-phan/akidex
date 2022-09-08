import React from "react"
import { Box, Container } from "@mui/material"
import { Media } from "types/MediaCustom"
import { MediaHeader } from "./MediaHeader"
import { Outlet } from "react-router-dom"

interface MediaDetailProps {
    isLoading: boolean
    media?: Media
}

const MediaDetail = ({ isLoading, media }: MediaDetailProps) => {
    return (
        <Box>
            <MediaHeader
                isLoading={isLoading}
                coverImg={media?.coverImage?.extraLarge || ""}
                bannerImg={media?.bannerImage || ""}
                title={media?.title}
                description={media?.description || ""}
            />

            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    )
}

export default MediaDetail
