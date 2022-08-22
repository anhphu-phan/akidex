import React from "react"
import { Card, CardMedia, CardContent } from "@mui/material"
import { Link } from "react-router-dom"
import { ResultItemWrapper, Title, DetailsSection, Info, MediaTypeName } from "./HelperComponents"
import { MediaType } from "types"
import { capitalize } from "utils"

export interface Detail {
    title: string
    content: React.ReactNode
}

interface ResultItemProps {
    type: MediaType
    id: number
    image: string
    title: string
    details: Detail[]
    closeMenu: () => void
}

const ResultItem = ({ type, id, image, title, details, closeMenu }: ResultItemProps) => {
    return (
        <ResultItemWrapper
            component={Link}
            to={`${type.toLowerCase().replace(" ", "-")}/${id}`}
            onClick={() => closeMenu()}
        >
            <Card sx={{ display: "flex", py: 0.5, alignItems: "center", userSelect: 'none' }} square>
                <CardMedia
                    component="img"
                    image={image}
                    alt="cover"
                    sx={{ maxWidth: 60, maxHeight: 80, objectFit: "cover" }}
                />
                <CardContent sx={{ overflowX: "hidden", pr: 0, width: "100%" }}>
                    <Title>{title}</Title>
                    <DetailsSection>
                        <Info>
                            Type: <MediaTypeName type={type}>{capitalize(type)}</MediaTypeName>
                        </Info>
                        {details.map((detail) => (
                            <Info key={detail.title + detail.content}>
                                {detail.title}: {detail.content}
                            </Info>
                        ))}
                    </DetailsSection>
                </CardContent>
            </Card>
        </ResultItemWrapper>
    )
}

export default ResultItem
