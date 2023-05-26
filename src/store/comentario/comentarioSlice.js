import { createSlice } from "@reduxjs/toolkit";

export const comentarioSlice = createSlice({
  name: "historia",
  initialState: {
    estadoCom: "finished", // 'authenticated','not-authenticated',
    error: undefined,
    creado: false,
    comentarios: [],
    comentariosHist: [],
  },
  reducers: {
    onInitialCom: (state) => {
      state.estadoCom = "finished"; // 'authenticated','not-authenticated',
      state.error = undefined;
      state.creado = false;
      state.comentarios = [];
      state.comentariosHist = [];
    },
    onCreateCom: (state) => {
      state.estadoCom = "checking";
      state.error = undefined;
      state.creado = false;
      state.comentarios = [];
      state.comentariosHist = [];
    },
    onErrorCom: (state) => {
      state.estadoCom = "finished";
      state.error = true;
      state.creado = false;
      state.comentarios = state.comentarios;
      state.comentariosHist = state.comentariosHist;
    },
    onFinishCom: (state) => {
      state.estadoCom = "finished";
      state.error = undefined;
      state.creado = false;
      state.comentarios = [];
      state.comentariosHist = [];
    },
    onFinishLoadCom: (state, { payload = [] }) => {
      state.estadoCom = "finished";
      state.error = undefined;
      state.creado = true;
      state.comentarios = payload;
      state.comentariosHist = state.comentariosHist;
    },
    onFinishLoadComHist: (state, { payload = [] }) => {
      state.estadoCom = "finished";
      state.error = undefined;
      state.creado = false;
      state.comentarios = state.comentarios;
      state.comentariosHist = payload;
    },
    onOutCom: (state) => {
      state.estadoCom = "finished";
      state.error = undefined;
      state.creado = false;
      state.comentarios = [];
      state.comentariosHist = [];
    },
    onNormal: (state) => {
      state.estadoCom = "finished";
      state.error = undefined;
      state.creado = false;
      state.comentarios = state.comentarios;
      state.comentariosHist = state.comentariosHist;
    },
  },
});

export const {
  onCreateCom,
  onFinishCom,
  onErrorCom,
  onInitialCom,
  onFinishLoadCom,
  onFinishLoadComHist,
  onOutCom,
  onNormal,
} = comentarioSlice.actions;
