import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    estado: "finished",
    usuarios: [],
    error: false,
  },
  reducers: {
    onInitUser: (state) => {
      state.estado = "finished";
      state.usuarios = [];
      state.error = false;
    },
    onLoadUser: (state) => {
      state.estado = "checking";
      state.usuarios = [];
      state.error = false;
    },
    onErrorUser: (state) => {
      state.estado = "finished";
      state.usuarios = [];
      state.error = true;
    },
    onFinishUser: (state, { payload }) => {
      state.estado = "finished";
      state.usuarios = payload;
      state.error = false;
    },
  },
});

export const { onInitUser, onFinishUser, onLoadUser, onErrorUser } =
  usuarioSlice.actions;
