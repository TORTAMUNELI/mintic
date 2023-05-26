import { useDispatch, useSelector } from "react-redux";
import { minTicApi } from "../api";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onFinishChecking,
  onOut,
} from "../store";
import { useNavigate } from "react-router-dom";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const startLogin = async ({ correo, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await minTicApi.post("/auth/login", {
        correo,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data.usuario.nombres,
          uid: data.usuario.uid,
          rol: data.usuario.rol,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({
    nombres,
    pApellido,
    sApellido,
    correo,
    password,
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await minTicApi.post("/usuarios", {
        nombres,
        pApellido,
        sApellido,
        correo,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onFinishChecking());
      navigate("/auth/login");
    } catch (error) {
      dispatch(onLogout(error.response.data?.msg || "--"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await minTicApi.get("auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        onLogin({
          name: data.usuario.nombres,
          uid: data.usuario.uid,
          rol: data.usuario.rol,
        })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onOut());
    dispatch(onLogout());
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
