import React, { useEffect, useState } from "react"
import { Container } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import { AnimeSearchParametersQuery, useAnimeSearchParametersQuery } from "api/hooks/AnimeSearchParameters"
import { MediaFormat as MediaFormat, MediaSeason, MediaSort, MediaType } from "types"
import { animeClient } from "graphql/graphql-request"
import { Form, Search } from "components/form"
import GenresInput from "./GenresInput"
import FormatInput from "./FormatInput"
import SeasonInput from "./SeasonInput"
import YearInput from "./YearInput"
import SortInput from "./SortInput"
import { useInfiniteAnimeSearchQuery } from "api/hooks/AnimeSearch"
import { useInView } from "react-intersection-observer"
import { InfiniteResultSection } from "views/common"

function paramsToObject(params: URLSearchParams) {
    const result: { [key: string]: string | string[] } = {}
    const entries = params.entries()

    for (const [key, value] of entries) {
        // each 'entry' is a [key, value] tupple
        if (key in result) {
            if (Array.isArray(result[key])) {
                result[key] = [...result[key], value]
            } else {
                // @ts-ignore
                result[key] = [result[key], value]
            }
        } else {
            if (key === "year") {
                result[key] = value + "%"
            } else {
                result[key] = value
            }
        }
    }
    return result
}

interface Parameters {
    search: string
    genres: string[]
    tags: string[]
    year: number | null
    season: MediaSeason | null
    format: MediaFormat | null
    sort: MediaSort
}

function constructSearchString(params: Parameters) {
    const searchParams = new URLSearchParams()

    if (params.search) {
        searchParams.append("search", params.search)
    }
    if (params.genres.length > 0) {
        params.genres.forEach((genre) => searchParams.append("genres", genre))
    }
    if (params.tags.length > 0) {
        params.tags.forEach((tag) => searchParams.append("tag", tag))
    }
    if (params.year) {
        searchParams.append("year", params.year.toString())
    }
    if (params.season) {
        searchParams.append("season", params.season)
    }
    if (params.format) {
        searchParams.append("format", params.format)
    }

    searchParams.append("sort", params.sort)

    return searchParams.toString()
}

const AnimeSearch = () => {
    const { ref, inView } = useInView({ rootMargin: `${window.innerHeight / 3}px` })
    const [searchParams, setSearchParams] = useSearchParams()
    const [parameters, setParameters] = useState<Parameters>({
        search: "",
        genres: [],
        tags: [],
        year: null,
        season: null,
        format: null,
        sort: MediaSort["ScoreDesc"],
    })

    const { isLoading: isLoadingParameters, data: searchParameters } = useAnimeSearchParametersQuery(
        animeClient,
        {},
        { staleTime: 1000 * 60 * 5 }
    )

    const {
        isLoading: isLoadingResult,
        data: searchResult,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteAnimeSearchQuery(
        "page",
        animeClient,
        { ...paramsToObject(searchParams), ...{ type: MediaType.Anime } },
        {
            staleTime: 1000 * 60 * 1,
            refetchOnWindowFocus: false,
            getNextPageParam(lastPage) {
                if (lastPage.Page?.pageInfo?.currentPage && lastPage.Page.pageInfo.hasNextPage) {
                    return {
                        page: lastPage.Page.pageInfo.currentPage + 1,
                    }
                }

                return { page: undefined }
            },
        }
    )

    useEffect(() => {
        const searchString = constructSearchString(parameters)
        setSearchParams(searchString)
    }, [parameters])

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    let genres: AnimeSearchParametersQuery["genres"] = []
    let tags: AnimeSearchParametersQuery["tags"] = []
    let years: number[] = []

    if (!isLoadingParameters) {
        genres = searchParameters?.genres || []
        tags = searchParameters?.tags?.flat() || []
        if (searchParameters?.Media?.startDate?.year) {
            const currentYear = new Date().getUTCFullYear()
            years = Array.from(
                { length: currentYear - searchParameters.Media.startDate.year + 2 },
                (_, i) => currentYear + 1 - i
            )
        }
    }

    const handleChangeSearchText = (newSearchText: string) => {
        setParameters({ ...parameters, search: newSearchText })
    }

    const handleChangeFormat = (newFormat: MediaFormat | null) => {
        setParameters({ ...parameters, format: newFormat })
    }

    const handleChangeSeason = (newSeason: MediaSeason | null) => {
        if (parameters.year) {
            setParameters({ ...parameters, season: newSeason })
        } else {
            const currentYear = new Date().getUTCFullYear()
            setParameters({ ...parameters, year: currentYear, season: newSeason })
        }
    }

    const handleChangeYear = (newYear: number | null) => {
        setParameters({ ...parameters, year: newYear })
    }

    const handleChangeGenres = (updatedGenres: string[], updatedTags: string[]) => {
        setParameters({ ...parameters, genres: updatedGenres, tags: updatedTags })
    }

    const handleChangeSortType = (newSortType: MediaSort) => {
        setParameters({ ...parameters, sort: newSortType })
    }

    console.log(searchResult)

    return (
        <Container maxWidth="xl">
            <Form>
                <Search isLoading={isLoadingParameters} handleChange={handleChangeSearchText} />
                <GenresInput
                    isLoading={isLoadingParameters}
                    genreOptions={genres}
                    tagOptions={tags}
                    genres={parameters.genres}
                    tags={parameters.tags}
                    handleChangeGenres={handleChangeGenres}
                />
                <YearInput value={parameters.year} options={years} handleChange={handleChangeYear} />
                <SeasonInput value={parameters.season} handleChange={handleChangeSeason} />
                <FormatInput value={parameters.format} handleChange={handleChangeFormat} />
                <SortInput
                    isLoading={isLoadingParameters}
                    value={parameters.sort}
                    handleChange={handleChangeSortType}
                />
            </Form>
            <InfiniteResultSection
                sx={{ mt: 5 }}
                data={searchResult}
                isLoading={isLoadingResult}
                isFetchingNextPage={isFetchingNextPage}
                anchorRef={ref}
            />
        </Container>
    )
}

export default AnimeSearch
