import React from "react"
import { Tabs, styled, Tab as MuiTab, TabProps as MuiTabProps } from "@mui/material"
import { NavLink, LinkProps, useLocation } from "react-router-dom"

const Tab = styled((props: MuiTabProps & LinkProps) => {
    return <MuiTab LinkComponent={NavLink} {...props} />
})(({ theme }) => ({
    fontWeight: "normal",
}))

const tabIndexes: { [key: string]: number } = {
    overview: 0,
    characters: 1,
    staff: 2,
    relations: 3,
}

const NavTabs = () => {
    const { pathname } = useLocation()

    const regex = /\/(?:anime|manga)\/\d+\/(\w+)/
    const found = pathname.match(regex)
    let tabIndex: number
    if (found && found.length) {
        tabIndex = tabIndexes[found[1]]
    } else {
        tabIndex = 0
    }

    const [value, setValue] = React.useState(tabIndex)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    return (
        <Tabs value={value} onChange={handleChange} centered>
            <Tab to="." label="Overview" />
            <Tab to="characters" label="Characters" />
            <Tab to="staff" label="Staff" />
            <Tab to="relations" label="Relations" />
        </Tabs>
    )
}

export default NavTabs
