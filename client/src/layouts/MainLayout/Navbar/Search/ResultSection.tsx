import React from "react"
import { Box, Divider, FormControlLabel, CircularProgress, Typography } from "@mui/material"
import { MediaTypeCheckbox } from "./HelperComponents"
import { MediaQuery } from "api/hooks/Media"
import { MediaType } from "types"
import PerfectScrollbar from "react-perfect-scrollbar"
import { VisualNovel } from "types/VisualNovels"
import ResultItem, { Detail } from "./ResultItem"
import locale from "locale-codes"
import { platforms } from "CONSTANTS"

interface ResultSectionPops {
    isLoading: boolean
    animeMangaData?: MediaQuery
    vnData: VisualNovel[] | undefined
    filters: Record<MediaType, boolean>
    onChecked: (type: MediaType, checked: boolean) => void
    closeMenu: () => void
}

const ResultSection = ({ animeMangaData, vnData, isLoading, filters, onChecked, closeMenu }: ResultSectionPops) => {
    const handleChange = (type: MediaType) => (event: React.ChangeEvent<HTMLInputElement>) =>
        onChecked(type, event.currentTarget.checked)

    let content

    if (isLoading)
        content = (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress />
            </Box>
        )
    // if user uncheck all the checkbox => found nothing
    else if (Object.values(filters).every((checked) => !checked) || animeMangaData?.Page?.media?.length === 0)
        content = <Typography>Found nothing.</Typography>
    else {
        content = (
            <PerfectScrollbar
                component="div"
                style={{
                    maxHeight: "calc(70vh - 56px)",
                    overflowY: "hidden",
                }}
            >
                <Box>
                    {animeMangaData &&
                        animeMangaData.Page &&
                        animeMangaData.Page.media &&
                        animeMangaData.Page.media.map((media) => {
                            let details: Detail[] = []
                            if (media?.type === MediaType.Anime) {
                                details = [
                                    { title: "Episodes", content: media?.episodes?.toString() || "" },
                                    { title: "Season", content: `${media?.season} ${media?.seasonYear?.toString()}` } ||
                                        "",
                                ]
                            } else if (media?.type === MediaType.Manga) {
                                details = [
                                    { title: "Chapters", content: media?.chapters?.toString() || "" },
                                    { title: "Volumes", content: media?.volumes?.toString() || "" },
                                ]
                            }

                            return (
                                <ResultItem
                                    key={media?.id}
                                    type={media?.type || ("" as MediaType)}
                                    id={media?.id as number}
                                    image={media?.coverImage?.large || ""}
                                    title={media?.title?.romaji || ("" as string)}
                                    closeMenu={closeMenu}
                                    details={details}
                                />
                            )
                        })}
                    {vnData &&
                        vnData.map((vn) => (
                            <ResultItem
                                key={vn.id}
                                type={MediaType.VisualNovel}
                                id={vn.id}
                                image={vn.image || ""}
                                title={vn.title}
                                closeMenu={closeMenu}
                                details={[
                                    { title: "Released", content: vn.released || "" },
                                    {
                                        title: "Languages",
                                        content: vn.languages.map((language) => (
                                            <abbr
                                                key={language}
                                                title={locale.getByTag(language).name}
                                                className={`icons lang ${language}`}
                                            />
                                        )),
                                    },
                                    {
                                        title: "Platforms",
                                        content: vn.platforms.map((platform) => (
                                            <img
                                                key={platform}
                                                src={`${import.meta.env.VITE_VNDB_PLATFORM_ICONS_URL}/${platform}.svg`}
                                                title={platforms[platform]}
                                                width={16}
                                                height={16}
                                            />
                                        )),
                                    },
                                ]}
                            />
                        ))}
                </Box>
            </PerfectScrollbar>
        )
    }

    return (
        <>
            <Box component="form" sx={{ position: "sticky", display: "flex", justifyContent: "center" }}>
                <FormControlLabel
                    label="Anime"
                    control={
                        <MediaTypeCheckbox
                            disabled={isLoading}
                            mediaType={MediaType.Anime}
                            checked={filters.ANIME}
                            onChange={handleChange(MediaType.Anime)}
                        />
                    }
                />
                <FormControlLabel
                    label="Manga"
                    control={
                        <MediaTypeCheckbox
                            disabled={isLoading}
                            mediaType={MediaType.Manga}
                            checked={filters.MANGA}
                            onChange={handleChange(MediaType.Manga)}
                        />
                    }
                />
                <FormControlLabel
                    label="Visual Novel"
                    control={
                        <MediaTypeCheckbox
                            disabled={isLoading}
                            mediaType={MediaType.VisualNovel}
                            checked={filters["VISUAL NOVEL"]}
                            onChange={handleChange(MediaType.VisualNovel)}
                        />
                    }
                />
            </Box>
            {content}
            <Divider sx={(theme) => ({ height: 1, bgcolor: theme.palette.background.default })} />
        </>
    )
}

export default ResultSection
