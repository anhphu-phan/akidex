import React, { VoidFunctionComponent } from "react"
import {
    Card,
    CardMedia,
    CardContent,
    Box,
    Divider,
    FormControlLabel,
    CircularProgress,
    Typography,
} from "@mui/material"
import { ResultItemWrapper, Title, Info, MediaTypeName, MediaTypeCheckbox } from "./HelperComponents"
import { Link } from "react-router-dom"
import { MediaQuery } from "api/hooks/Media"
import { MediaType } from "types"
import PerfectScrollbar from "react-perfect-scrollbar"

interface ResultSectionPops {
    isLoading: boolean
    data?: MediaQuery
    filters: Record<MediaType, boolean>
    onChecked: (type: MediaType, checked: boolean) => void
    closeMenu: () => void
}

const ResultSection = ({ data, isLoading, filters, onChecked, closeMenu }: ResultSectionPops) => {
    const handleChange = (type: MediaType) => (event: React.ChangeEvent<HTMLInputElement>) =>
        onChecked(type, event.currentTarget.checked)

    let content

    if (isLoading || !data || !data.Page || !data.Page.media)
        content = (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress />
            </Box>
        )
    // if user uncheck all the checkbox => found nothing
    else if (Object.values(filters).every((checked) => !checked) || data.Page.media.length === 0)
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
                    {data &&
                        data.Page &&
                        data.Page.media &&
                        data.Page.media.map((media) => {
                            let mediaType
                            if (media?.type === MediaType.Anime) {
                                mediaType = "Anime"
                            } else if (media?.type === MediaType.Manga) {
                                mediaType = "Manga"
                            } else {
                                mediaType = "Visual Novel"
                            }

                            return (
                                <ResultItemWrapper
                                    component={Link}
                                    key={media?.id}
                                    to={`${mediaType.toLowerCase().replace(" ", "-")}/${media?.id}`}
                                    onClick={() => closeMenu()}
                                >
                                    <Card sx={{ display: "flex", py: 0.5, alignItems: "center" }} square>
                                        <CardMedia
                                            component="img"
                                            image={media?.coverImage?.medium || ""}
                                            alt="cover"
                                            sx={{ maxWidth: 60, maxHeight: 80, objectFit: "cover" }}
                                        />
                                        <CardContent sx={{ overflowX: "hidden", pr: 0 }}>
                                            <Title>{media?.title?.romaji}</Title>
                                            <Info>
                                                Type: <MediaTypeName type={mediaType}>{mediaType}</MediaTypeName>
                                            </Info>
                                            {media?.episodes && <Info>Episodes: {media?.episodes}</Info>}
                                            {media?.chapters && <Info>Chapters: {media?.chapters}</Info>}
                                        </CardContent>
                                    </Card>
                                </ResultItemWrapper>
                            )
                        })}
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
