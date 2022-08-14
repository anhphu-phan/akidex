import React from "react"
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material"
import { deepmerge } from "@mui/utils"
import { Routes } from "routes"
import { useAppSelector } from "store/hooks"
import { selectColorScheme } from "store/slices/customizationSlice"
import { getDesignTokens, getThemedComponents } from "themes"

function App() {
    const colorScheme = useAppSelector(selectColorScheme)

    const theme = React.useMemo(() => {
        const designTokens = getDesignTokens(colorScheme)
        let newTheme = createTheme(designTokens)
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
