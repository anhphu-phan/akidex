import React from 'react'
import { Typography } from "@mui/material"

interface InfoProps {
    title: string
    children: React.ReactNode
}
export const Info = ({ title, children }: InfoProps) => {
    return (
        <Typography variant="subtitle2">
            {title}:{" "}
            <Typography variant="body2" component="span">
                {children}
            </Typography>
        </Typography>
    )
}
