import React from "react"
import { animeClient } from "graphql/graphql-request"
import { useAnimesQuery } from "api/hooks/Anime"

const TopAnime = () => {
    const { isLoading, isError, data, error } = useAnimesQuery(animeClient, { perPage: 20 })

    if (isLoading) return <div>Loading...</div>

    if (isError) {
        return <div>{(error as Error).message}</div>
    }
    return (
        <div>
            {data.Page?.media?.map((anime) => (
                <div key={anime?.id}>
                    <img src={anime?.coverImage?.extraLarge || ""} />
                </div>
            ))}
        </div>
    )
}

export default TopAnime
