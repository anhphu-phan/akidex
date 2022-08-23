import React from "react"
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
    Typography,
    Rating,
    Chip,
    useTheme,
    Skeleton,
} from "@mui/material"
import { Link } from "react-router-dom"
import { MediaType } from "types"

export interface CarouselMediaInfo {
    id: number
    title: string
    description: string
    rating: number
    genres: (string | null)[]
    image: string
    type: MediaType
}
interface CarouselItemProps {
    isLoading: boolean
    info?: CarouselMediaInfo
}

const CarouselItem = ({ info, isLoading }: CarouselItemProps) => {
    const theme = useTheme()

    const descriptionElement = (
        <Typography
            sx={{
                display: "-webkit-box",
                WebkitLineClamp: 10,
                [`${theme.breakpoints.down("md")}`]: {
                    WebkitLineClamp: 3,
                },
                [`${theme.breakpoints.down("lg")}`]: {
                    WebkitLineClamp: 4,
                },
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
            }}
        >
            {info?.description || ""}
        </Typography>
    )

    const headerElement = (
        <CardHeader
            title={info?.title || ""}
            titleTypographyProps={{
                sx: {
                    display: "-webkit-box",
                    ...(theme.breakpoints.down("md") && {
                        WebkitLineClamp: 2,
                    }),
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                },
            }}
            sx={{ textDecoration: "none" }}
            component={Link}
            to={`${info?.type.toLowerCase()}/${info?.id}`}
        />
    )
    return (
        <Card
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                mx: "auto",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
                {isLoading ? <Skeleton variant="text">{headerElement}</Skeleton> : headerElement}
                <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                >
                    <Box>{descriptionElement}</Box>

                    <Box sx={{ flexShrink: 0 }}>
                        <Typography component="legend">Rating: </Typography>
                        <Rating value={((info?.rating || 0) / 100) * 5} precision={0.1} readOnly />
                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {info && info.genres.map((genre) => <Chip key={genre} label={genre} size="small" />)}
                        </Box>
                    </Box>
                </CardContent>
            </Box>

            <CardMedia
                component="img"
                image={info?.image || ""}
                sx={{ width: "clamp(150px,40vw,500px)", height: "clamp(400px, 40vw, 6000px)", flexGrow: 1 }}
                loading='lazy'
            />
        </Card>
    )
}

export default CarouselItem
