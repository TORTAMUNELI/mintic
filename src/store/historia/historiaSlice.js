import { createSlice } from "@reduxjs/toolkit";

export const historiaSlice = createSlice({
  name: "historia",
  initialState: {
    estadoHist: "finished", // 'authenticated','not-authenticated',
    error: undefined,
    creado: false,
    historias: [],
  },
  reducers: {
    onInitial: (state) => {
      state.estadoHist = "finished"; // 'authenticated','not-authenticated',
      state.error = undefined;
      state.creado = false;
      state.historias = [];
    },
    onCreate: (state) => {
      state.estadoHist = "checking";
      state.error = undefined;
      state.creado = false;
      state.historias = [];
    },
    onCreateRecursive: (state) => {
      state.estadoHist = "checking";
      state.error = undefined;
      state.creado = false;
      state.historias = state.historias;
    },
    onError: (state) => {
      state.estadoHist = "finished";
      state.error = true;
      state.creado = false;
      state.historias = [];
    },
    onErrorRecursive: (state) => {
      state.estadoHist = "finished";
      state.error = true;
      state.creado = false;
      state.historias = state.historias;
    },
    onFinish: (state) => {
      state.estadoHist = "finished";
      state.error = undefined;
      state.creado = true;
      state.historias = [];
    },
    onFinishRecursive: (state) => {
      state.estadoHist = "finished";
      state.error = undefined;
      state.creado = true;
      state.historias = state.historias;
    },
    onFinishLoad: (state, { payload = [] }) => {
      state.estadoHist = "finished";
      state.error = undefined;
      state.creado = false;
      state.historias = payload;
    },
    onOut: (state) => {
      state.estadoHist = "finished";
      state.error = undefined;
      state.creado = false;
      state.historias = [];
    },
  },
});

export const {
  onCreate,
  onFinish,
  onError,
  onInitial,
  onFinishLoad,
  onOut,
  onCreateRecursive,
  onFinishRecursive,
  onErrorRecursive,
} = historiaSlice.actions;
