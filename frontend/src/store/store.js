import { configureStore } from "@reduxjs/toolkit";
import { api_slice } from "../slices/api_slice";

const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api_slice.middleware),
  devTools: true,
});

export default store;
