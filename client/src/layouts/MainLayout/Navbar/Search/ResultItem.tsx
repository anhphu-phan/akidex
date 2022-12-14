import React from "react"
import { Card, CardMedia, CardContent, Tooltip } from "@mui/material"
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
            <Card sx={{ display: "flex", py: 0.5, alignItems: "center", userSelect: "none" }} square>
                <Tooltip
                    sx={{ maxWidth: "500px" }}
                    title={
                        <>
                            <img src={image} />
                        </>
                    }
                    componentsProps={{
                        tooltip: {
                            sx: {
                                bgcolor: "red",
                                p: 0,

                                boxShadow:
                                    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                                "& img": {
                                    verticalAlign: "middle",
                                },
                            },
                        },
                    }}
                    placement="left"
                >
                    <CardMedia
                        component="img"
                        image={image}
                        alt="cover"
                        sx={{ maxWidth: 60, maxHeight: 80, objectFit: "cover" }}
                    />
                </Tooltip>
                <CardContent sx={{ overflowX: "hidden", pr: 0, width: "100%" }}>
                    <Title>{title}</Title>
                    <DetailsSection>
                        <Info>
                            Type: <MediaTypeName type={type}>{capitalize(type)}</MediaTypeName>
                        </Info>
                        {details.map((detail) => {
                            return (
                                <Info key={detail.title + detail.content}>
                                    {detail.title}: {detail.content}
                                </Info>
                            )
                        })}
                    </DetailsSection>
                </CardContent>
            </Card>
        </ResultItemWrapper>
    )
}

export default ResultItem
