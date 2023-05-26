import { minTicApi } from "../api";
import { useDispatch, useSelector } from "react-redux";
import {
  onCreateCom,
  onFinishCom,
  onErrorCom,
  onInitialCom,
  onFinishLoadCom,
  onFinishLoadComHist,
  onNormal,
} from "../store";

export const useComentarios = () => {
  const dispatch = useDispatch();
  const { estadoCom, error, creado, comentarios, comentariosHist } =
    useSelector((state) => state.comentario);

  const getComentarios = async () => {
    dispatch(onCreateCom());
    try {
      const { data } = await minTicApi.get("/comentarios/");
      dispatch(onFinishLoadCom(data.comentarios));
    } catch (error) {
      dispatch(onFinishLoadCom([]));
    }
  };

  const getComentariosVisibles = async (id) => {
    dispatch(onCreateCom());
    try {
      const { data } = await minTicApi.get(`/comentarios/visibles/${id}`);
      const { comentarios: arr } = data;
      const newArr = await buscarUsuarios(arr);
      dispatch(onFinishLoadComHist(newArr));
    } catch (error) {
      dispatch(onFinishLoadComHist([]));
    }
  };

  const buscarUsuarios = async (arr = []) => {
    for (let index = 0; index < arr.length; index++) {
      const { data } = await minTicApi.get(`/usuarios/${arr[index].usuario}`);
      arr[index].usuario = {
        correo: data.usuario.correo,
        nombre: `${data.usuario.nombres} ${data.usuario.pApellido} ${data.usuario.sApellido}`,
      };
    }
    return arr;
  };

  const crearComentario = async (id, contenido) => {
    try {
      const { data } = await minTicApi.post(`/comentarios/${id}`, {
        contenido,
      });
    } catch (error) {
      dispatch(onErrorCom());
    }
    return [];
  };

  const aprobarComentario = async (uid, veredicto) => {
    dispatch(onCreateCom());
    try {
      const data = await minTicApi.put(`/comentarios/evaluacion/${uid}`, {
        veredicto,
      });
      dispatch(getComentarios());
    } catch (error) {
      dispatch(onFinishLoadCom([]));
    }
  };

  const ocultarComentario = async (id, edicion) => {
    dispatch(onCreateCom());
    try {
      const { data } = await minTicApi.put(`/comentarios/visibilidad/${id}`, {
        edicion,
      });
      dispatch(onFinishLoadCom([]));
    } catch (error) {
      dispatch(onFinishLoadCom([]));
    }
  };

  return {
    estadoCom,
    error,
    creado,
    comentarios,
    getComentarios,
    aprobarComentario,
    getComentariosVisibles,
    comentariosHist,
    crearComentario,
    ocultarComentario,
  };
};
