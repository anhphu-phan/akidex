import React, { Fragment, useEffect, useState } from "react"
import { useInfiniteMediaCharactersQuery } from "api/hooks/MediaCharacters"
import { mediaClient } from "graphql/graphql-request"
import { useLocation, useParams } from "react-router-dom"
import { MediaType, Staff } from "types"
import { Box } from "@mui/material"
import LanguageFilter from "./LanguageFilter"
import { Card } from "./Card"
import { useInView } from "react-intersection-observer"

const Characters = () => {
    const { ref, inView } = useInView({ rootMargin: `${window.innerHeight / 3}px` })
    const { pathname } = useLocation()
    const mediaType = pathname.split("/")[1]
    const { id } = useParams() as { id: string }
    const [language, setLanguage] = useState<Staff["languageV2"]>(
        mediaType === MediaType.Anime.toLowerCase() ? "Japanese" : undefined
    )

    const { isLoading, isFetchingNextPage, data, fetchNextPage } = useInfiniteMediaCharactersQuery(
        "page",
        mediaClient,
        { id: parseInt(id) },
        {
            staleTime: 1000 * 60 * 5,
            getNextPageParam(lastPage) {
                if (
                    lastPage.Media?.characters?.pageInfo?.hasNextPage &&
                    lastPage.Media.characters.pageInfo.currentPage
                ) {
                    return { page: lastPage.Media.characters.pageInfo.currentPage + 1 }
                }

                return { page: undefined }
            },
        }
    )

    let languages: string[] = []
    if (!isLoading) {
        if (data?.pages[0].Media?.characters?.edges) {
            languages =
                data?.pages[0].Media?.characters?.edges[0]?.voiceActorRoles?.reduce((total: string[], current) => {
                    if (
                        !total.find((language) => language === current?.voiceActor?.language) &&
                        current?.voiceActor?.language
                    ) {
                        return [...total, current?.voiceActor?.language]
                    }

                    return total
                }, []) || []
        }
    }

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    function handleChange(newLanguage: string) {
        setLanguage(newLanguage)
    }

    return (
        <Box sx={{ mt: 2 }}>
            {languages.length > 0 && language && (
                <LanguageFilter languages={languages} current={language} onChange={handleChange} />
            )}
            <Box
                sx={{
                    display: "grid",
                    gap: 2,
                    justifyContent: "center",
                    gridTemplateColumns:
                        language === undefined ? "repeat(auto-fill, 250px)" : "repeat(auto-fill, 500px)",
                    mt: 2,
                }}
            >
                {data?.pages.map((page, pageIndex) => (
                    <Fragment key={page.Media?.characters?.pageInfo?.currentPage}>
                        {page.Media &&
                            page.Media.characters &&
                            page.Media.characters.edges &&
                            page.Media?.characters?.edges.map((edge, edgeIndex) => {
                                if (language === undefined) {
                                    return (
                                        <Card
                                            key={edge?.node?.id}
                                            characterId={edge?.node?.id}
                                            characterName={edge?.node?.name?.userPreferred || undefined}
                                            characterRole={edge?.role || undefined}
                                            characterImage={edge?.node?.image?.large || undefined}
                                            {...(page.Media &&
                                                page.Media.characters &&
                                                page.Media.characters.edges &&
                                                pageIndex === data.pages.length - 1 &&
                                                edgeIndex === page.Media?.characters?.edges.length - 1 && {
                                                    anchorRef: ref,
                                                })}
                                        />
                                    )
                                }

                                return (
                                    <Fragment key={edge?.id}>
                                        {edge &&
                                            edge.voiceActorRoles &&
                                            edge.voiceActorRoles
                                                .filter(
                                                    (va) =>
                                                        va?.voiceActor?.language?.toLowerCase() ===
                                                        language?.toLowerCase()
                                                )
                                                .map((va) => (
                                                    <Card
                                                        key={va?.voiceActor?.id}
                                                        characterId={edge.node?.id}
                                                        characterName={edge.node?.name?.userPreferred || undefined}
                                                        characterRole={edge.role || undefined}
                                                        characterImage={edge.node?.image?.large || undefined}
                                                        voiceActorId={va?.voiceActor?.id}
                                                        voiceActorName={
                                                            va?.voiceActor?.name?.userPreferred || undefined
                                                        }
                                                        voiceActorLanguage={va?.voiceActor?.language || undefined}
                                                        voiceActorImage={va?.voiceActor?.image?.large || undefined}
                                                        {...(page.Media &&
                                                            page.Media.characters &&
                                                            page.Media.characters.edges &&
                                                            pageIndex === data.pages.length - 1 &&
                                                            edgeIndex === page.Media?.characters?.edges.length - 1 && {
                                                                anchorRef: ref,
                                                            })}
                                                    />
                                                ))}
                                    </Fragment>
                                )
                            })}
                    </Fragment>
                ))}
            </Box>
        </Box>
    )
}

export default Characters
