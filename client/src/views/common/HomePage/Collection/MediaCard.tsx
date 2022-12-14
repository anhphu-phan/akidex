import React from "react"
import { SxProps, Theme, ImageListItem, ImageListItemBar, Skeleton, imageListItemBarClasses } from "@mui/material"
import { Media } from "types"
import { VisualNovel } from "types/VisualNovels"
import { Link } from "react-router-dom"

const playTime: { [key: number]: string } = {
    1: "Very short (< 2 hours)",
    2: "Short (2 - 10 hours)",
    3: "Medium (10 - 30 hours)",
    4: "Long (30 - 50 hours)",
    5: "Very Long (> 50 hours)",
}

export interface MediaCardInfo {
    id: number
    type?: Media["type"]
    title?: string
    image?: string
    episodes?: number
    chapters?: number
    nsfw?: boolean
    length?: VisualNovel["length"]
}

interface MediaCardProps {
    info?: MediaCardInfo
    sx?: SxProps<Theme>
    isLoading: boolean
    smoothScrolling?: boolean
    anchorRef?: (node?: Element | null | undefined) => void
}

const MediaCard = ({ info, sx, isLoading, smoothScrolling, anchorRef }: MediaCardProps) => {
    const subtitle = (
        <>
            {!info?.episodes || isNaN(info?.episodes)
                ? ""
                : `${info.episodes} ${info.episodes > 1 ? "episodes" : "episode"}`}
            {!info?.chapters || isNaN(info?.chapters)
                ? ""
                : `${info.chapters} ${info.chapters > 1 ? "chapters" : "chapter"}`}
            {info?.length && `${playTime[info.length]} chapters`}
        </>
    )

    return (
        <ImageListItem
            {...(!isLoading
                ? { component: Link, ...(smoothScrolling && { state: { smoothScrolling: smoothScrolling } }) }
                : {})}
            {...(!isLoading ? { to: `/${info?.type?.toLowerCase() || ""}/${info?.id}` } : {})}
            sx={{
                ...sx,
                display: "inline-block",
                flexShrink: 0,
                borderRadius: 1,
                overflow: "hidden",

                [`& .${imageListItemBarClasses.root}`]: {
                    maxHeight: "20%",
                },

                "&&& img": {
                    aspectRatio: "37/53",
                    borderRadius: 1,
                },
            }}
        >
            {isLoading ? (
                <Skeleton variant="rectangular" height="20vw" width={200}>
                    <img src={info?.image || ""} loading="lazy" />
                </Skeleton>
            ) : (
                <img src={info?.image || ""} loading="lazy" ref={anchorRef} />
            )}
            {!isLoading && <ImageListItemBar title={info?.title || ""} subtitle={subtitle} />}
        </ImageListItem>
    )
}

export default MediaCard
