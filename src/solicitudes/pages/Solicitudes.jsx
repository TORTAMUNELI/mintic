import React, { useEffect, useState } from "react";
import { useComentarios, useHistorias } from "../../hooks";

import "./Solicitudes.css";
import { SolicitudHistCard } from "../../SolicitudHistCard/pages/SolicitudHistCard";
import { SolicitudComCard } from "../../SolicitudComCard/pages/SolicitudComCard";

export const Solicitudes = () => {
  const { estadoHist, historias, getHistoriasByEstado } = useHistorias();
  const { comentarios, getComentarios, estadoCom } = useComentarios();

  const [solicitud, setSolicitud] = useState("historias");
  const [refresh, setRefresh] = useState(true);

  const refrescar = () => {
    setRefresh(!refresh);
  };

  const cambioSolicitud = () => {
    if (solicitud === "historias") {
      return setSolicitud("comentarios");
    }
    return setSolicitud("historias");
  };

  useEffect(() => {
    getHistoriasByEstado();
    getComentarios();
  }, []);

  useEffect(() => {}, [solicitud]);
  return (
    <div className="pagina px-5 pt-5">
      <div className="text-center">
        <h1>Solicitudes</h1>
      </div>
      <div className="text-center mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <h5
                className="point"
                style={
                  solicitud === "historias"
                    ? { textDecoration: "underline" }
                    : {}
                }
                onClick={cambioSolicitud}
              >
                Historias
              </h5>
            </div>
            <div className="col-md-5">
              <h5
                className="point"
                style={
                  solicitud === "comentarios"
                    ? { textDecoration: "underline" }
                    : {}
                }
                onClick={cambioSolicitud}
              >
                Comentarios
              </h5>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </div>
      {estadoHist === "finished" && estadoCom == "finished" ? (
        solicitud === "historias" ? (
          historias.length >= 1 ? (
            historias.map((historia) => (
              <SolicitudHistCard key={historia.uid} {...historia} />
            ))
          ) : (
            <div className="text-center mt-5">
              <h4>No hay ninguna historia solicitada</h4>
            </div>
          )
        ) : comentarios.length >= 1 ? (
          comentarios.map((comentario) => (
            <SolicitudComCard
              key={comentario.uid}
              {...comentario}
              onAction={refrescar}
            />
          ))
        ) : (
          <div className="text-center mt-5">
            <h4>No hay ningún comentario solicitado</h4>
          </div>
        )
      ) : (
        <div className="text-center mt-5">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};
