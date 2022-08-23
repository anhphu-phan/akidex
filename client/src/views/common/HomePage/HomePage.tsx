import React from "react"
import { Stack } from "@mui/material"
import { MediaQuery, MediaQueryVariables, useMediaQuery } from "api/hooks/Media"
import { animeClient, mangaClient } from "graphql/graphql-request"
import { MediaSeason, MediaSort, MediaType } from "types"
import Collection from "./Collection"
import { capitalize } from "utils"

type Page = Exclude<MediaQuery["Page"], null | undefined>
type Media = Exclude<Exclude<Page["media"], null | undefined>[0], null>

function getCommonMediaInfo(media: Media) {
    return {
        id: media?.id,
        type: media?.type,
        title: media?.title?.userPreferred || media?.title?.romaji || "",
        image: media?.coverImage?.extraLarge || "",
    }
}

function getAnimeInfo(data: MediaQuery | undefined) {
    if (!data || !data.Page || !data.Page.media) return undefined

    return data.Page.media.map((media) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ({ ...getCommonMediaInfo(media!), episodes: media?.episodes || undefined })
    )
}

function getMangaInfo(data: MediaQuery | undefined) {
    if (!data || !data.Page || !data.Page.media) return undefined

    return data.Page.media.map((media) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        ({ ...getCommonMediaInfo(media!), chapters: media?.chapters || undefined })
    )
}

function getCurrentSeasonName(): MediaSeason {
    // current season !== current anime season
    // current anime season = current season - 1 season
    const date = new Date()
    const currentMonth = date.getUTCMonth()

    if (currentMonth <= 2) return MediaSeason.Spring
    if (currentMonth <= 5) return MediaSeason.Summer
    if (currentMonth <= 8) return MediaSeason.Fall

    return MediaSeason.Winter
}

function getCurrentAnimeSeason(): { season: MediaSeason; year: number } {
    const currentSeason = getCurrentSeasonName()
    let currentAnimeSeason: MediaSeason
    let year: number = new Date().getUTCFullYear()

    if (currentSeason === MediaSeason.Spring) {
        currentAnimeSeason = MediaSeason.Winter
        year = new Date().getUTCFullYear() - 1
    } else if (currentSeason === MediaSeason.Summer) {
        currentAnimeSeason = MediaSeason.Spring
    } else if (currentSeason === MediaSeason.Fall) {
        currentAnimeSeason = MediaSeason.Summer
    } else {
        currentAnimeSeason = MediaSeason.Fall
    }

    return { season: currentAnimeSeason, year }
}

const HomePage = () => {
    const numberItemPerCollection = 20
    const currentAnimeSeason = getCurrentAnimeSeason()

    // ANCHOR common variables
    const commonQueryVariable: MediaQueryVariables = { perPage: numberItemPerCollection }
    const commonAnimeQueryVariable: MediaQueryVariables = { type: MediaType.Anime }
    const commonMangaQueryVariable: MediaQueryVariables = { type: MediaType.Manga }
    const queryOptions = {}

    function getAnimeQueryVariables(variables: MediaQueryVariables) {
        return Object.assign({}, commonQueryVariable, commonAnimeQueryVariable, variables)
    }

    function getMangaQueryVariables(variables: MediaQueryVariables) {
        return Object.assign({}, commonQueryVariable, commonMangaQueryVariable, variables)
    }

    // ANCHOR specific query variables
    const topAnimeQueryVariable: MediaQueryVariables = getAnimeQueryVariables({
        sort: [MediaSort.ScoreDesc],
    })
    const trendingAnimeQueryVariable: MediaQueryVariables = getAnimeQueryVariables({
        sort: [MediaSort.TrendingDesc, MediaSort.PopularityDesc],
    })
    const currentSeasonAnimeQueryVariable: MediaQueryVariables = getAnimeQueryVariables({
        season: currentAnimeSeason.season,
        seasonYear: currentAnimeSeason.year,
        sort: MediaSort.TrendingDesc,
    })

    const topMangaQueryVariable: MediaQueryVariables = getMangaQueryVariables({ sort: MediaSort.PopularityDesc })
    const trendingMangaQueryVariable: MediaQueryVariables = getMangaQueryVariables({
        sort: MediaSort.TrendingDesc,
    })

    // ANCHOR queries
    const { isLoading: isLoadingTopAnime, data: topAnimeData } = useMediaQuery(
        animeClient,
        topAnimeQueryVariable,
        queryOptions
    )
    const { isLoading: isLoadingTrendingAnime, data: trendingAnimeData } = useMediaQuery(
        animeClient,
        trendingAnimeQueryVariable,
        queryOptions
    )

    const { isLoading: isLoadingCurrentSeasonAnime, data: currentSeasonAnime } = useMediaQuery(
        animeClient,
        currentSeasonAnimeQueryVariable,
        queryOptions
    )

    const { isLoading: isLoadingTopManga, data: topMangaData } = useMediaQuery(
        mangaClient,
        topMangaQueryVariable,
        queryOptions
    )
    const { isLoading: isLoadingTrendingManga, data: trendingMangaData } = useMediaQuery(
        mangaClient,
        trendingMangaQueryVariable,
        queryOptions
    )

    return (
        <Stack sx={{ px: 10 }} spacing={5}>
            <Collection title="Top Anime" type="Top" isLoading={isLoadingTopAnime} data={getAnimeInfo(topAnimeData)} />
            <Collection
                title="Trending Anime"
                type="Trending"
                isLoading={isLoadingTrendingAnime}
                data={getAnimeInfo(trendingAnimeData)}
            />
            <Collection
                title={`${capitalize(currentAnimeSeason.season)} ${currentAnimeSeason.year}`}
                type="Season"
                isLoading={isLoadingCurrentSeasonAnime}
                data={getAnimeInfo(currentSeasonAnime)}
            />
            <Collection title="Top Manga" type="Top" isLoading={isLoadingTopManga} data={getMangaInfo(topMangaData)} />
            <Collection
                title="Trending Manga"
                type="Top"
                isLoading={isLoadingTrendingManga}
                data={getMangaInfo(trendingMangaData)}
            />
        </Stack>
    )
}

export default HomePage
