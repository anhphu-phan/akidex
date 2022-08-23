import React from "react"
import { SxProps, Theme, ImageListItem, ImageListItemBar, Skeleton } from "@mui/material"
import { Media, MediaCoverImage } from "types"
import { VisualNovel } from "types/VisualNovels"
import { Link } from "react-router-dom"
import { capitalize } from "utils"

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
}

const MediaCard = ({ info, sx, isLoading }: MediaCardProps) => {
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
            {...(!isLoading ? { component: Link } : {})}
            {...(!isLoading ? { to: `${info?.type?.toLowerCase() || ""}/${info?.id}` } : {})}
            sx={{
                ...sx,
                display: "inline-block",
                flexShrink: 0,
                borderRadius: 2,
                overflow: "hidden",

                "&&& img": {
                    width: "clamp(150px,18vw,220px)",
                },
            }}
        >
            {isLoading ? (
                <Skeleton variant="rectangular" height="20vw" width={200}>
                    <img src={info?.image || ""} loading="lazy" />
                </Skeleton>
            ) : (
                <img src={info?.image || ""} loading="lazy" />
            )}
            {!isLoading && <ImageListItemBar title={info?.title || ""} subtitle={subtitle} />}
        </ImageListItem>
    )
}

export default MediaCard
