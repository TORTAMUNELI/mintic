import React from "react";
import { useComentarios } from "../../hooks/useComentarios";
import Swal from "sweetalert2";

export const ComentarioCard = ({
  uid,
  usuario,
  contenido,
  user,
  refrescar,
}) => {
  const { ocultarComentario } = useComentarios();

  const ocultar = () => {
    ocultarComentario(uid, "oculto");
    Swal.fire("Se oculto el comentario", "", "success").then(() => {
      console.log("FINALIZA SWL");
      refrescar();
    });
  };

  return (
    <div className="container-fluid mt-4 pb-4">
      <div className="row px-5">
        <div className="col-md-1 align-bottom text-center">
          <i className="fa-regular fa-user fa-2xl align-bottom"></i>
        </div>
        <div className="col-md-11">
          <h5>{usuario.nombre}</h5>
          <p>{contenido}</p>
        </div>
        {user.rol === "MOD" ? (
          <div className="d-flex justify-content-end">
            <button className="btn-bad mb-4 w-25" onClick={ocultar}>
              Ocultar
            </button>
          </div>
        ) : (
          <></>
        )}
        <hr />
      </div>
    </div>
  );
};
