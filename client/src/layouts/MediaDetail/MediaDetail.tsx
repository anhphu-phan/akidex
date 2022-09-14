import React from "react"
import { Box, Container } from "@mui/material"
import { Media } from "types/MediaCustom"
import { MediaHeader } from "./MediaHeader"
import { Outlet } from "react-router-dom"
import ScrollToTop from "components/ScrollToTop"

interface MediaDetailProps {
    isLoading: boolean
    media?: Media
}

const MediaDetail = ({ isLoading, media }: MediaDetailProps) => {
    return (
        <ScrollToTop>
            <Box>
                <MediaHeader
                    isLoading={isLoading}
                    coverImg={media?.coverImage?.extraLarge || ""}
                    bannerImg={media?.bannerImage || ""}
                    title={media?.title}
                    description={media?.description || ""}
                />

                <Container maxWidth="lg" sx={{ py: 2 }}>
                    <Outlet />
                </Container>
            </Box>
        </ScrollToTop>
    )
}

export default MediaDetail
