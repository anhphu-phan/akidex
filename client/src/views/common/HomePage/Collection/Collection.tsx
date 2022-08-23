import React, { useLayoutEffect, useRef, useState } from "react"
import { Box, IconButton, Typography, IconButtonProps, Skeleton, Divider, useTheme } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import MediaCard, { MediaCardInfo } from "./MediaCard"
import styled from "@emotion/styled"
import { blue } from "@mui/material/colors"
import { Link } from "react-router-dom"

const ScrollButton = styled(
    ({ icon, ...props }: { icon: React.ReactNode; props?: IconButtonProps }) => (
        <IconButton {...props}>{icon}</IconButton>
    ),
    { shouldForwardProp: (props) => props !== "hide" }
)<
    {
        side: string
        hide: boolean
    } & IconButtonProps
>(({ side, hide }) => ({
    position: "absolute",
    ...(side === "left" && {
        left: -40,
    }),
    ...(side === "right" && {
        right: -40,
    }),
    ...(hide && {
        display: "none",
    }),
    top: "50%",
    transform: "translateY(-50%)",
}))

interface CollectionProps {
    data?: MediaCardInfo[]
    isLoading: boolean
    title: string
    /** Type of collection. E.g: Top, Trending, Season */
    type: string
}

const Collection = ({ data, isLoading, title, type }: CollectionProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [disableSlideLeft, setDisableSlideLeft] = useState(false)
    const [disableSlideRight, setDisableSlideRight] = useState(false)
    const theme = useTheme()

    useLayoutEffect(() => {
        if (containerRef.current) {
            if (containerRef.current.scrollLeft === 0) {
                setDisableSlideLeft(true)
            }
        }
    }, [])

    const handleClickScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: containerRef.current.clientWidth, behavior: "smooth" })
        }
    }

    const handleclickScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -containerRef.current.clientWidth, behavior: "smooth" })
        }
    }

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const e = event.currentTarget
        if (e.scrollWidth - e.scrollLeft === e.clientWidth) {
            setDisableSlideRight(true)
        } else {
            setDisableSlideRight(false)
        }

        if (e.scrollLeft === 0) {
            setDisableSlideLeft(true)
        } else {
            setDisableSlideLeft(false)
        }
    }

    let moreLink
    if (data && data[0] && data[0].type) moreLink = data[0].type.toLowerCase() + "/" + type.toLowerCase()
    else moreLink = "#"

    return (
        <Box>
            <Box
                sx={{
                    display: "grid",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gridTemplateColumns: "max-content 1fr max-content",
                }}
            >
                <Typography variant="h5" color={theme.palette.mode === "dark" ? blue[100] : blue[500]}>
                    {isLoading ? <Skeleton /> : title}
                </Typography>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Divider sx={{ alignSelf: "center", mx: 5, height: 2, bgcolor: "primary.main" }} />
                )}
                <Typography
                    component={Link}
                    to={moreLink}
                    variant="h6"
                    color={theme.palette.mode === "dark" ? blue[100] : blue[500]}
                >
                    {isLoading ? <Skeleton /> : "More"}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", position: "relative", mt: 1 }}>
                <ScrollButton
                    side="left"
                    hide={disableSlideLeft}
                    icon={<ArrowBackIosIcon />}
                    disabled={isLoading}
                    onClick={handleclickScrollLeft}
                />
                <Box
                    ref={containerRef}
                    component="div"
                    sx={{
                        display: "flex",
                        gap: 1,
                        overflowX: "scroll",
                        scrollbarWidth: "none",
                        scrollSnapType: "x mandatory",
                        borderRadius: 1,

                        "::-webkit-scrollbar": {
                            height: 0,
                        },
                    }}
                    onScroll={handleScroll}
                >
                    {isLoading
                        ? Array(10)
                              .fill(0)
                              .map((_, index) => <MediaCard isLoading={isLoading} key={index} />)
                        : data &&
                          data.map((media) => (
                              <MediaCard
                                  isLoading={isLoading}
                                  key={media.image}
                                  info={media}
                                  sx={{ scrollSnapAlign: "start" }}
                              />
                          ))}
                </Box>
                <ScrollButton
                    side="right"
                    icon={<ArrowForwardIosIcon />}
                    disabled={isLoading}
                    hide={disableSlideRight}
                    onClick={handleClickScrollRight}
                />
            </Box>
        </Box>
    )
}

export default Collection
