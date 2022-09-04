import React from "react"
import { Stack } from "@mui/material"
import { useParams } from "react-router-dom"
import { useMediaQuery } from "api/hooks/Media"
import { Media } from "types/MediaCustom"
import { mediaClient } from "graphql/graphql-request"
import Ranking from "./Ranking"
import General, { GeneralInfos } from "./General"
import Genres from "./Genres"
import Tags from "./Tags"
import Recommendations from "./Recommendations"

const Overview = () => {
    const { id } = useParams() as { id: string }
    const { isLoading, data: media } = useMediaQuery<Media | undefined, unknown>(
        mediaClient,
        { id: parseInt(id) },
        {
            staleTime: 1000 * 60 * 5,
            select: (data) => {
                if (data && data.Page && data.Page.media && data.Page.media.length > 0 && data.Page.media[0])
                    return data.Page.media[0]

                return undefined
            },
        }
    )

    if (!isLoading) {
        console.log(media)
    }

    const generalInfos: GeneralInfos = {
        format: media?.format,
        episodes: media?.episodes,
        duration: media?.duration,
        season: media?.season,
        seasonYear: media?.seasonYear,
        status: media?.status,
        startDate: media?.startDate,
        endDate: media?.endDate,
        studios: media?.studios,
        averageScore: media?.averageScore,
        meanScore: media?.meanScore,
        popularity: media?.popularity,
    }

    return (
        <Stack gap={3} marginTop={2}>
            <Ranking rankings={media?.rankings} />
            <General infos={generalInfos} />
            <Genres genres={media?.genres} />
            <Tags tags={media?.tags} />
            <Recommendations recommendations={media?.recommendations} />
        </Stack>
    )
}

export default Overview
