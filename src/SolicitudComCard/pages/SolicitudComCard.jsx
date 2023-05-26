import React from "react";
import { useComentarios } from "../../hooks";

export const SolicitudComCard = ({ contenido, uid, onAction }) => {
  const { aprobarComentario } = useComentarios();

  const aprobar = () => {
    aprobarComentario(uid, "aprobado");
    onAction();
  };

  const denegar = () => {
    aprobarComentario(uid, "rechazado");
    onAction();
  };

  return (
    <div className="mt-4 pb-2 px-4">
      <div className="text-center">{contenido}</div>
      <div className="container w-100 ">
        <div className="row mt-3 text-center">
          <div className="col-md-6">
            <button className="btn-nice w-50" onClick={aprobar}>
              Aprobar
            </button>
          </div>
          <div className="col-md-6  ">
            <button className="btn-bad w-50" onClick={denegar}>
              Denegar
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
