import React from "react"
import { Skeleton, styled } from "@mui/material"
import OriginalSlider, { Settings } from "react-slick"
import CarouselItem, { CarouselMediaInfo } from "./CarouselItem"

const Slider = styled(OriginalSlider)(({ theme }) => ({
    width: "70%",
    height: "50%",
    marginTop: theme.spacing(2),
    "& .slick-list": {
        overflow: "hidden",
        borderRadius: 10,
    },

    "& .slick-arrow:before": {
        fontSize: 40,
        color: theme.palette.mode === "dark" ? theme.palette.primaryDark.main : theme.palette.primary.main,
    },
    "& .slick-next": {
        right: -30,
    },
    "& .slick-prev": {
        left: -50,
    },
}))

interface CarouselProps {
    isLoading: boolean
    data?: CarouselMediaInfo[]
}

const Carousel = ({ data, isLoading }: CarouselProps) => {
    const sliderSettings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        lazyLoad: "ondemand",
    }
    return (
        <Slider {...sliderSettings}>
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height="100%">
                    <CarouselItem isLoading={isLoading} />
                </Skeleton>
            ) : (
                data && data.map((media) => <CarouselItem key={media.id} info={media} isLoading={isLoading} />)
            )}
        </Slider>
    )
}

export default Carousel
