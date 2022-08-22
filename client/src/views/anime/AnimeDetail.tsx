import React from "react"
import { useParams } from "react-router-dom"
import { Box } from "@mui/material"

const AnimeDetail = () => {
    const { id } = useParams()

    return <div>Anime ID: {id}</div>
}

export default AnimeDetail
