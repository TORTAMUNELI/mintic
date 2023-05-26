import React from "react";
import { useForm, useHistorias } from "../../hooks";
import { SolicitudHistCard } from "../../SolicitudHistCard/pages/SolicitudHistCard";
import { useEffect } from "react";
import { useState } from "react";

const busquedaForm = {
  busqueda: "",
};

export const BuscarHistorias = () => {
  const { busqueda, onInputChange } = useForm(busquedaForm);
  const {
    buscarHistorias: buscarHistoriaConQuery,
    estadoHist,
    historias,
    historiaCreada,
  } = useHistorias();
  const [busquedas, setBusquedas] = useState(0);

  const buscarHistorias = (event) => {
    event.preventDefault();
    setBusquedas(busquedas + 1);
    buscarHistoriaConQuery(busqueda);
  };

  useEffect(() => {
    historiaCreada();
  }, []);

  return (
    <div className="pagina pt-5 px-5 ">
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
                      placeholder="Buscar historia por titulo"
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
      </div>

      {estadoHist === "finished" ? (
        historias.length >= 1 ? (
          historias.map((historia) => (
            <SolicitudHistCard key={historia.uid} {...historia} />
          ))
        ) : busquedas !== 0 ? (
          <div className="text-center mt-5">
            <h4>No existe ninguna historia con ese título</h4>
          </div>
        ) : (
          <h4 className="text-center mt-5">Buscador de historias</h4>
        )
      ) : (
        <div className="text-center mt-5">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};
