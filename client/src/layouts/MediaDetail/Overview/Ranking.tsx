import React from "react"
import { Box, Typography, styled } from "@mui/material"
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined"
import StarOutlinedIcon from "@mui/icons-material/StarOutlined"
import { pink, yellow } from "@mui/material/colors"
import { MediaRank } from "types/MediaCustom"
import { MediaRankType } from "types"
import Section from "./Section"
import { capitalize } from "utils"

interface RankingProps {
    rankings?: MediaRank[] | null
}

const RankingWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}))

const Wrapper = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
}))

const Ranking = ({ rankings }: RankingProps) => {
    return (
        <Section title="Ranking">
            <Wrapper>
                {rankings &&
                    rankings.slice(0, 2).map((ranking) => {
                        if (ranking && ranking.type === MediaRankType["Rated"]) {
                            const title =
                                (ranking.allTime ? ranking.context : `${ranking.context} of ${ranking.year}`)
                            return (
                                <RankingWrapper key={ranking.id} sx={{}}>
                                    <StarOutlinedIcon fontSize="small" sx={{ color: yellow[700] }} />
                                    <Typography variant="subtitle2">#{ranking.rank} {capitalize(title)}</Typography>
                                </RankingWrapper>
                            )
                        }
                        if (ranking && ranking.type === MediaRankType["Popular"]) {
                            const title =
                                (ranking.allTime ? ranking.context : `${ranking.context} of ${ranking.year}`)
                            return (
                                <RankingWrapper key={ranking.id}>
                                    <FavoriteOutlinedIcon fontSize="small" sx={{ color: pink[500] }} />
                                    <Typography variant="subtitle2">#{ranking.rank} {capitalize(title)}</Typography>
                                </RankingWrapper>
                            )
                        }
                    })}
            </Wrapper>
        </Section>
    )
}

export default Ranking
