import React from "react"
import { Box } from "@mui/material"
import format from "date-fns/format"
import Section from "./Section"
import { MediaSeason, MediaStatus } from "types"
import { Media } from "types/MediaCustom"
import { capitalize } from "utils"
import { Info } from "./helperComponents"

export interface GeneralInfos {
    format?: string | null
    episodes?: number | null
    duration?: number | null
    season?: MediaSeason | null
    seasonYear?: number | null
    status?: MediaStatus | null
    startDate?: Media["startDate"] | null
    endDate?: Media["endDate"] | null
    studios?: Media["studios"] | null
    averageScore?: Media["averageScore"] | null
    meanScore?: Media["meanScore"] | null
    popularity?: Media["popularity"] | null
}

interface GeneralProps {
    infos?: GeneralInfos
}

const General = ({ infos }: GeneralProps) => {
    return (
        <Section title="General">
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    rowGap: 1,
                }}
            >
                {infos?.format && <Info title="Format">{capitalize(infos.format)}</Info>}
                {infos?.episodes && <Info title="Episodes">{infos.episodes}</Info>}
                {infos?.duration && <Info title="Episode Duration">{infos.duration} mins</Info>}
                {infos?.season && infos?.seasonYear && (
                    <Info title="Season">
                        {capitalize(infos.season)} {infos.seasonYear}
                    </Info>
                )}
                {infos?.status && <Info title="Status">{capitalize(infos.status)}</Info>}
                {infos?.startDate && infos.startDate.year && (
                    <Info title="Start Date">
                        {format(
                            new Date(infos.startDate.year, infos.startDate.month || 0, infos.startDate.day || 0),
                            infos.startDate.day ? "MMM d, yyyy" : infos.startDate.month ? "MMM yyyy" : "yyyy"
                        )}
                    </Info>
                )}
                {infos?.endDate && infos.endDate.year && (
                    <Info title="End Date">
                        {format(
                            new Date(infos.endDate.year, infos.endDate.month || 0, infos.endDate.day || 0),
                            infos.endDate.day ? "MMM d, yyyy" : infos.endDate.month ? "MMM yyyy" : "yyyy"
                        )}
                    </Info>
                )}
                {infos?.studios && infos.studios.edges && infos.studios.edges.length > 0 && (
                    <Info title="Studio">{infos.studios.edges?.map((edge) => edge?.node?.name).join(", ")}</Info>
                )}
                {infos?.averageScore && <Info title="Average Score">{infos.averageScore}%</Info>}
                {infos?.meanScore && <Info title="Mean Score">{infos.meanScore}%</Info>}
                {infos?.popularity && <Info title="Popularity">{infos.popularity}</Info>}
            </Box>
        </Section>
    )
}

export default General
