import React from "react"
import { Box, Typography, Skeleton } from "@mui/material"
import { Media } from "types/MediaCustom"
import { BannerImageWrapper, CoverImageWrapper, Wrapper, Header, TitleWrapper, Description } from "./helperComponent"
import AddButton from "./AddButton"
import NavTabs from "./NavTabs"

interface MediaHeaderProps {
    isLoading: boolean
    title: Media["title"]
    coverImg: string
    bannerImg: string
    description: string
}

const MediaHeader = ({ isLoading, coverImg, bannerImg, description, title }: MediaHeaderProps) => {
    console.log("🚀 ~ file: MediaHeader.tsx ~ line 17 ~ MediaHeader ~ bannerImg", bannerImg)
    return (
        <Wrapper>
            <BannerImageWrapper>
                {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : bannerImg && bannerImg !== "" ? (
                    <Box
                        component="img"
                        src={bannerImg}
                        alt="Banner Image"
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                ) : null}
            </BannerImageWrapper>
            <Header>
                <CoverImageWrapper>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    ) : (
                        <Box
                            component="img"
                            src={coverImg}
                            alt="Cover Image"
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )}
                </CoverImageWrapper>
                <Box>
                    <TitleWrapper>
                        {isLoading ? (
                            <Skeleton width="20%">
                                {title?.userPreferred && <Typography variant="h5">{title.userPreferred}</Typography>}
                            </Skeleton>
                        ) : (
                            title?.userPreferred && <Typography variant="h5">{title.userPreferred}</Typography>
                        )}
                        {!title?.userPreferred && title?.romaji && <Typography variant="h5">{title.romaji}</Typography>}
                        <AddButton />
                    </TitleWrapper>
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, index) => (
                            <Skeleton key={index} variant="text" width="100%" height="1rem" />
                        ))
                    ) : (
                        <Description dangerouslySetInnerHTML={{ __html: description }} />
                    )}
                </Box>
            </Header>
            <NavTabs />
        </Wrapper>
    )
}

export default MediaHeader
