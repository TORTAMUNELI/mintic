import { useDispatch, useSelector } from "react-redux";
import { minTicApi } from "../api";
import { onInitUser, onLoadUser, onFinishUser, onErrorUser } from "../store";

export const useUsuario = () => {
  const dispatch = useDispatch();
  const { estado, usuarios, error } = useSelector((state) => state.usuario);

  const buscarUsuariosPorNombre = async (nombre) => {
    dispatch(onLoadUser());
    try {
      const { data } = await minTicApi.get(`/usuarios/nombre/${nombre}`);
      dispatch(onFinishUser(data));
    } catch (error) {
      console.log(error);
      dispatch(onErrorUser());
    }
  };

  const cambiarRol = async (id, nuevoRol) => {
    dispatch(onLoadUser());
    try {
      const { data } = await minTicApi.put(`/usuarios`, { id, nuevoRol });
      dispatch(onInitUser());
    } catch (error) {
      dispatch(onErrorUser());
    }
  };

  const onIniti = () => {
    dispatch(onInitUser());
  };

  return {
    buscarUsuariosPorNombre,
    estado,
    usuarios,
    error,
    onIniti,
    cambiarRol,
  };
};
