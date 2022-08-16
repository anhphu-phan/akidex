import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "store"
import { PaletteMode } from "@mui/material"

const localStoreKey = "colorScheme"
const colorScheme: PaletteMode = (localStorage.getItem(localStoreKey) || "light") as PaletteMode

const initialState = {
    colorScheme,
    navbarHeight: 64,
}

const customizationSlice = createSlice({
    name: "customization",
    initialState,
    reducers: {
        toggleMode: (state) => {
            if (state.colorScheme === "light") {
                state.colorScheme = "dark"
            } else {
                state.colorScheme = "light"
            }
        },
        updateNavbarHeight: (state, action: PayloadAction<number>) => {
            state.navbarHeight = action.payload
        },
    },
})

// ============================== Selectors ==============================
export const selectColorScheme = (state: RootState) => state.customization.colorScheme
export const selectNavbarHeight = (state: RootState) => state.customization.navbarHeight

export const { toggleMode, updateNavbarHeight } = customizationSlice.actions
export default customizationSlice.reducer
