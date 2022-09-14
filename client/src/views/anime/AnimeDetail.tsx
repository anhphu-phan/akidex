import React from "react"
import { useParams } from "react-router-dom"
import { useMediaQuery } from "api/hooks/Media"
import { animeClient } from "graphql/graphql-request"
import { MediaDetail } from "layouts/MediaDetail"
import { Media } from "types/MediaCustom"

const AnimeDetail = () => {
    const { id } = useParams() as { id: string }
    const { data, isLoading } = useMediaQuery<Media | undefined, unknown>(
        animeClient,
        { id: parseInt(id) },
        {
            staleTime: 1000 * 60 * 5,
            select: (data) => {
                if (data && data.Page && data.Page.media && data.Page.media.length > 0 && data.Page.media[0]) {
                    return data.Page?.media[0]
                }

                return undefined
            },
        }
    )

    return <MediaDetail isLoading={isLoading} media={data} />
}

export default AnimeDetail
