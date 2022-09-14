import React from "react"
import {
    CardMedia as MuiCardMedia,
    CardHeader as MuiCardHeader,
    styled,
    CardHeaderProps,
    cardHeaderClasses,
} from "@mui/material"

export const CardMedia = styled(MuiCardMedia)

export const CardHeader = styled((props: CardHeaderProps) => <MuiCardHeader {...props} />)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(0.5),
    alignItems: "stretch",
    [`& .${cardHeaderClasses.title}`]: { fontSize: "1rem" },
    [`& .${cardHeaderClasses.subheader}`]: { fontSize: "0.75rem" },
    [`& .${cardHeaderClasses.content}`]: { display: "flex", flexDirection: "column", justifyContent: "space-between" },
}))
