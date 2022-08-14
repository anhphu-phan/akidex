import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

type ColorScheme = 'light' | 'dark'

const localStoreKey = 'colorScheme'
const colorScheme: ColorScheme  = (localStorage.getItem(localStoreKey) || 'light') as ColorScheme

const initialState = {
    colorScheme
}

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {

    }
})

// ============================== Selectors ==============================
export const selectColorScheme = (state: RootState) => state.customization.colorScheme


export const {} = customizationSlice.actions
export default customizationSlice.reducer