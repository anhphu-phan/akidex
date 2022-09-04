import React from "react"
import { Box, Typography, useTheme } from "@mui/material"
import { Media } from "types/MediaCustom"
import { BannerImage, CoverImage, Wrapper, Header, TitleWrapper, Description } from "./helperComponent"
import AddButton from "./AddButton"
import NavTabs from "./NavTabs"

interface MediaHeaderProps {
    title: Media["title"]
    coverImg: string
    bannerImg: string
    description: string
}

const MediaHeader = ({ coverImg, bannerImg, description, title }: MediaHeaderProps) => {
    return (
        <Wrapper>
            {bannerImg && <BannerImage src={bannerImg} alt="Banner Image" />}
            <Header>
                <CoverImage src={coverImg} alt="Cover Image" />
                <Box>
                    <TitleWrapper>
                        {title?.userPreferred && <Typography variant="h5">{title.userPreferred}</Typography>}
                        {!title?.userPreferred && title?.romaji && <Typography variant="h5">{title.romaji}</Typography>}
                        <AddButton />
                    </TitleWrapper>
                    <Description dangerouslySetInnerHTML={{ __html: description }} />
                </Box>
            </Header>
            <NavTabs />
        </Wrapper>
    )
}

export default MediaHeader
