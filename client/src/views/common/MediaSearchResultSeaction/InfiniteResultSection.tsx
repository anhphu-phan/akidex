import React, { Fragment } from "react"
import { Box, BoxProps, styled, SxProps, Theme, Skeleton } from "@mui/material"
import { InfiniteData } from "@tanstack/react-query"
import { AnimeSearchQuery } from "api/hooks/AnimeSearch"
import MediaCard from "../HomePage/Collection/MediaCard"

const Wrapper = styled((props: BoxProps) => <Box {...props} />)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 130px)",
    [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(auto-fill, 180px)",
    },
    // gridAutoRows: 200,
    // overflowX: 'scroll',
    justifyContent: "center",
    gap: theme.spacing(2),
}))

interface InfiniteResultSectionProps {
    data?: InfiniteData<AnimeSearchQuery>
    isLoading: boolean
    isFetchingNextPage: boolean
    anchorRef: (node?: Element | null | undefined) => void
    sx?: SxProps<Theme>
}

const InfiniteResultSection = ({ data, isLoading, isFetchingNextPage, anchorRef, sx }: InfiniteResultSectionProps) => {
    return (
        <Wrapper sx={{ ...sx }}>
            {data &&
                data.pages.map((page, pageIndex) => (
                    <Fragment key={page.Page?.pageInfo?.currentPage}>
                        {page.Page &&
                            page.Page.media &&
                            page.Page.media.map(
                                (media, mediaIndex) =>
                                    media &&
                                    (isLoading && isFetchingNextPage ? (
                                        <Skeleton>
                                            <MediaCard
                                                key={media.id}
                                                isLoading={false}
                                                info={{
                                                    id: media.id,
                                                    title: media.title?.userPreferred || "",
                                                    image: media.coverImage?.large || "",
                                                    chapters: media.chapters || undefined,
                                                    episodes: media.episodes || undefined,
                                                    type: media.type,
                                                }}
                                                {...(page.Page &&
                                                    page.Page.media &&
                                                    pageIndex === data.pages.length - 1 &&
                                                    mediaIndex === page.Page.media.length - 1 && { anchorRef })}
                                            />
                                        </Skeleton>
                                    ) : (
                                        <MediaCard
                                            key={media.id}
                                            isLoading={false}
                                            info={{
                                                id: media.id,
                                                title: media.title?.userPreferred || "",
                                                image: media.coverImage?.large || "",
                                                chapters: media.chapters || undefined,
                                                episodes: media.episodes || undefined,
                                                type: media.type,
                                            }}
                                            {...(page.Page &&
                                                page.Page.media &&
                                                pageIndex === data.pages.length - 1 &&
                                                mediaIndex === page.Page.media.length - 1 && { anchorRef })}
                                        />
                                    ))
                            )}
                    </Fragment>
                ))}
        </Wrapper>
    )
}

export default InfiniteResultSection
