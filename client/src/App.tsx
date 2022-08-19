import React from "react"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import StyledEngineProvider from "@mui/material/StyledEngineProvider"
import { deepmerge } from "@mui/utils"
import { Routes } from "routes"
import { useAppSelector } from "store/hooks"
import { selectColorScheme } from "store/slices/customizationSlice"
import { getBaseTheme, getThemedComponents } from "themes"

function App() {
    const colorScheme = useAppSelector(selectColorScheme)

    const theme = React.useMemo(() => {
        const baseTheme = getBaseTheme(colorScheme)
        let newTheme = createTheme(baseTheme)
        newTheme = deepmerge(newTheme, getThemedComponents(newTheme))

        return newTheme
    }, [colorScheme])

    console.log("🚀 ~ file: App.tsx ~ line 19 ~ theme ~ theme", theme)
    
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes />
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
