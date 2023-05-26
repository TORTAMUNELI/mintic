import { useDispatch, useSelector } from "react-redux";
import { minTicApi } from "../api";
import {
  onCreate,
  onFinish,
  onError,
  onInitial,
  onFinishLoad,
  onCreateRecursive,
  onFinishRecursive,
  onErrorRecursive,
} from "../store";

export const useHistorias = () => {
  const dispatch = useDispatch();
  const { estadoHist, error, creado, historias } = useSelector(
    (state) => state.historia
  );

  const createHistoria = async (titulo, contenido) => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.post("/historias", {
        titulo,
        contenido,
      });
      dispatch(onFinish());
    } catch (err) {
      dispatch(onError());
    }
  };

  const actualizarHistoria = async (id, titulo, contenido) => {
    dispatch(onCreateRecursive());
    try {
      const { data } = await minTicApi.put(`/historias/${id}`, {
        titulo,
        contenido,
      });
      dispatch(onFinishRecursive());
    } catch (err) {
      dispatch(onErrorRecursive());
    }
  };

  const historiaCreada = () => {
    dispatch(onInitial());
  };

  const getHistoriasById = async (id) => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.get("/historias/");
      const { historias: arr } = data;
      dispatch(onFinishLoad(arr));
    } catch (error) {
      dispatch(onFinishLoad([]));
    }
  };

  const getHistoriasByEstado = async () => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.get("/historias/solicitudes");
      const { historias: arr } = data;
      const newArr = await buscarUsuarios(arr);
      dispatch(onFinishLoad(newArr));
    } catch (error) {
      dispatch(onFinishLoad([]));
    }
  };

  const buscarUsuarios = async (arr = []) => {
    for (let index = 0; index < arr.length; index++) {
      const { data } = await minTicApi.get(`/usuarios/${arr[index].usuario}`);
      arr[index].correo = data.usuario.correo;
    }
    return arr;
  };

  const evaluarHistoria = async (id, veredicto) => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.put(`/historias/evaluacion/${id}`, {
        veredicto,
      });
      getHistoriasByEstado();
    } catch (error) {
      console.log(error);
      dispatch(onFinishLoad([]));
    }
  };

  const editarVisibilidad = async (id, edicion) => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.put(`/historias/visibilidad/${id}`, {
        edicion,
      });
    } catch (error) {
      console.log(error);
      dispatch(onFinishLoad([]));
    }
  };

  const buscarHistorias = async (query) => {
    dispatch(onCreate());
    try {
      const { data } = await minTicApi.get(`/historias/busqueda/${query}`);
      const { historias: arr } = data;
      const newArr = await buscarUsuarios(arr);
      dispatch(onFinishLoad(newArr));
    } catch (error) {
      console.log(error);
      dispatch(onFinishLoad([]));
    }
  };

  return {
    estadoHist,
    error,
    createHistoria,
    creado,
    historiaCreada,
    getHistoriasById,
    getHistoriasByEstado,
    historias,
    evaluarHistoria,
    buscarHistorias,
    editarVisibilidad,
    actualizarHistoria,
  };
};
