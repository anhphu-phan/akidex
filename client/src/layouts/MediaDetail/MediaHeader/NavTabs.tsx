import React from "react"
import { Tabs, styled, Tab as MuiTab, TabProps as MuiTabProps } from "@mui/material"
import { NavLink, LinkProps } from "react-router-dom"

const Tab = styled((props: MuiTabProps & LinkProps) => {
    return <MuiTab LinkComponent={NavLink} {...props} />
})(({ theme }) => ({
    fontWeight: "normal",
}))

const NavTabs = () => {
    const [value, setValue] = React.useState(0)

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
