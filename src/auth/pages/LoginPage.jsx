import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import React from "react";

import "./LoginPage.css";
import { Link } from "react-router-dom";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage, startRegister } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ correo: loginEmail, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="login-container">
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-md-12 titulo">HISTORIAS MIGRATORIAS</div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4"></div>
          <div className="col-md-4 login-box">
            <div className="login-decorator">
              <div className="m-4">
                <div className="text-center">
                  <h1 className="mt-4">Bienvenido</h1>
                  <hr />
                </div>
                <form onSubmit={loginSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="email" className="form-label">
                      <h5>Correo electrónico</h5>
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="form-control"
                      name="loginEmail"
                      value={loginEmail}
                      onChange={onLoginInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="password" className="form-label">
                      <h5>Contraseña</h5>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="loginPassword"
                      value={loginPassword}
                      onChange={onLoginInputChange}
                    />
                  </div>
                  <div className="form-group mt-4 text-center">
                    <button type="submit" className="btn-p iniciar-sesion">
                      Iniciar Sesión
                    </button>
                    <div className="mt-1">
                      <p>
                        ¿Aún no tienes una cuenta?{" "}
                        <span>
                          <Link to={"/register"}> Regístrate aquí</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};
