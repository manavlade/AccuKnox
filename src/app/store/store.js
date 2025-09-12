import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./widgetsSlice";


export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
    },
});
