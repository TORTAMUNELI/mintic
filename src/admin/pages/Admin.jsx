import React, { useState } from "react";
import { useForm, useUsuario } from "../../hooks";
import { UsuariosCard } from "../../usuariosCard/pages/UsuariosCard";
import { useEffect } from "react";

const busquedaForm = {
  busqueda: "",
};

export const Admin = () => {
  const { busqueda, onInputChange } = useForm(busquedaForm);
  const { buscarUsuariosPorNombre, estado, usuarios, error, onIniti } =
    useUsuario();
  const [refresh, setRefresh] = useState(true);

  const buscarHistorias = (event) => {
    event.preventDefault();
    buscarUsuariosPorNombre(busqueda);
  };

  useEffect(() => {
    onIniti();
  }, []);

  return (
    <div className="pagina pt-5 px-5">
      <div className="container-fluid pb-4">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form onSubmit={buscarHistorias}>
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="busqueda"
                      value={busqueda}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn-nice w-100">
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-2"></div>
        </div>
        {estado === "checking" ? (
          <div className="text-center mt-5">
            <span className="loader"></span>
          </div>
        ) : (
          usuarios.map((usuario) => (
            <UsuariosCard key={usuario.uid} {...usuario} />
          ))
        )}
      </div>
    </div>
  );
};
