import { configureStore } from "@reduxjs/toolkit";
import customizationReducer from "./slices/customizationSlice";
import userReducer from "./slices/userSlice";


const store = configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch