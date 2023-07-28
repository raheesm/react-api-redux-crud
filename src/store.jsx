import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userDetailsSlice";

export const store = configureStore({
    reducer:{
        app:userSlice
    },
})