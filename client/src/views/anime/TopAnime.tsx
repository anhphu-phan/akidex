import React from "react"
import { animeClient } from "graphql/graphql-request"
import { useAnimesQuery } from "api/hooks/Anime"

const TopAnime = () => {
    const { isLoading, isError, data, error } = useAnimesQuery(animeClient, { perPage: 20 })

    if (isLoading) return <div>Loading...</div>

    if (isError) {
        console.log("🚀 ~ file: TopAnime.tsx ~ line 7 ~ TopAnime ~ error", error)
        return <div>{(error as Error).message}</div>
    }
    console.log(data)
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
