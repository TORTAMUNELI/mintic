import { configureStore } from "@reduxjs/toolkit";
import { authSlice, historiaSlice, comentarioSlice, usuarioSlice } from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    historia: historiaSlice.reducer,
    comentario: comentarioSlice.reducer,
    usuario: usuarioSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
