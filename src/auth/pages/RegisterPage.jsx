import React from "react";
import "./RegisterPage.css";
import { useAuthStore, useForm } from "../../hooks";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const registerFormFields = {
  nombres: "",
  pApellido: "",
  sApellido: "",
  correo: "",
  contraseña: "",
  contraseña2: "",
};

export const RegisterPage = () => {
  const {
    nombres,
    pApellido,
    sApellido,
    correo,
    contraseña,
    contraseña2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const { startRegister } = useAuthStore();

  const registerSubmit = (event) => {
    event.preventDefault();
    if (contraseña !== contraseña2) {
      Swal.fire("Error en registro", "Contraseñas no son iguales", "error");
      return;
    }

    startRegister({
      nombres,
      pApellido,
      sApellido,
      correo,
      password: contraseña,
    });
  };

  return (
    <div className="register-container">
      <div className="container-fluid vamos">
        <div className="row text-center">
          <div className="col-md-12 titulo">HISTORIAS MIGRATORIAS</div>
        </div>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 register-box mt-5">
            <div className="register-decorator">
              <div className="m-4">
                <div className="text-center">
                  <h1 className="mt-4">Regístrate</h1>
                  <hr />
                </div>
                <form onSubmit={registerSubmit}>
                  <div className="form-group mt-4">
                    <label htmlFor="nombres" className="form-label">
                      <h5>Nombres*</h5>
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      className="form-control"
                      name="nombres"
                      value={nombres}
                      onChange={onRegisterInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="pApellido" className="form-label">
                          <h5>Primer apellido*</h5>
                        </label>
                        <input
                          type="text"
                          id="pApellido"
                          className="form-control"
                          name="pApellido"
                          value={pApellido}
                          onChange={onRegisterInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="sApellido" className="form-label">
                          <h5>Segundo apellido</h5>
                        </label>
                        <input
                          type="text"
                          id="sApellido"
                          className="form-control"
                          name="sApellido"
                          value={sApellido}
                          onChange={onRegisterInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="correo" className="form-label">
                      <h5>Correo electrónico*</h5>
                    </label>
                    <input
                      type="text"
                      id="correo"
                      className="form-control"
                      name="correo"
                      value={correo}
                      onChange={onRegisterInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="contraseña" className="form-label">
                      <h5>Contraseña*</h5>
                    </label>
                    <input
                      type="password"
                      id="contraseña"
                      className="form-control"
                      name="contraseña"
                      value={contraseña}
                      onChange={onRegisterInputChange}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="contraseña2" className="form-label">
                      <h5>Confirmar contraseña*</h5>
                    </label>
                    <input
                      type="password"
                      id="contraseña2"
                      className="form-control"
                      name="contraseña2"
                      value={contraseña2}
                      onChange={onRegisterInputChange}
                    />
                  </div>
                  <div className="form-group mt-4 text-center">
                    <button type="submit" className="btn-p iniciar-sesion">
                      Regístrate
                    </button>
                    <div className="mt-1">
                      <p>
                        ¿Ya tienes una cuenta?{" "}
                        <span>
                          <Link to={"/auth/login"}> Incia sesión</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};
