import { createSlice } from "@reduxjs/toolkit";

const localStoreKey = 'theme'
const persistedTheme = localStorage.getItem(localStoreKey) || 'light'

const initialState = {
    theme: persistedTheme
}

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {

    }
})


export const {} = customizationSlice.actions
export default customizationSlice.reducer