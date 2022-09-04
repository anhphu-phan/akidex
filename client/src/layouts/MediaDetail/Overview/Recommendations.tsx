import React from "react"
import { styled, Box } from "@mui/material"
import { Media } from "types/MediaCustom"
import MediaCard from "views/common/HomePage/Collection/MediaCard"
import Section from "./Section"

const Wrapper = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 130px)",
    [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "repeat(auto-fill, 180px)",
    },
    // gridAutoRows: 200,
    // overflowX: 'scroll',
    justifyContent: "center",
    gap: theme.spacing(2),
}))

interface RecommendationProps {
    recommendations?: Media["recommendations"]
}

const Recommendations = ({ recommendations }: RecommendationProps) => {
    return (
        <Section title="Recommendations">
            <Wrapper>
                {recommendations &&
                    recommendations.edges &&
                    recommendations.edges.map((recommendation) => {
                        const media = recommendation?.node?.mediaRecommendation

                        if (!media) return undefined

                        return (
                            <MediaCard
                                key={recommendation?.node?.id}
                                isLoading={false}
                                info={{
                                    id: media.id,
                                    title: media.title?.userPreferred || "",
                                    image: media.coverImage?.large || "",
                                    chapters: media.chapters || undefined,
                                    episodes: media.episodes || undefined,
                                    type: media.type,
                                }}
                            />
                        )
                    })}
            </Wrapper>
        </Section>
    )
}

export default Recommendations
