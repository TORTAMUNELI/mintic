import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAuthStore,
  useComentarios,
  useForm,
  useHistorias,
} from "../../hooks";

import "./HistoriaPage.css";
import { useEffect } from "react";
import { ComentarioCard } from "../../comentariosCard/pages/ComentarioCard";
import { useState } from "react";
import Swal from "sweetalert2";

const cometarioField = {
  comentario: "",
};

export const HistoriaPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { historias, evaluarHistoria, editarVisibilidad, historiaCreada } =
    useHistorias();
  const { user } = useAuthStore();

  const {
    estadoCom,
    getComentariosVisibles,
    comentariosHist,
    crearComentario,
  } = useComentarios();

  const historia = historias.find((historia) => historia.uid === id);
  const { comentario, onInputChange } = useForm(cometarioField);
  const [refresco, setRefresco] = useState(true);

  const refrescar = () => {
    setRefresco(!refresco);
  };

  useEffect(() => {
    getComentariosVisibles(historia.uid);
  }, [refresco]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    // send state to server with e.g. `window.fetch`
    crearComentario(historia.uid, comentario);
    Swal.fire("Se ha creado el comentario", "", "success");
    onInputChange({ target: { name: "comentario", value: "" } });
  };

  const aprobar = () => {
    evaluarHistoria(historia.uid, "aprobado");
    navigate("/solicitudes");
  };

  const rechazar = () => {
    evaluarHistoria(historia.uid, "rechazado");
    navigate("/solicitudes");
  };

  const ocultar = () => {
    navigate("/historias");
    editarVisibilidad(historia.uid, "oculto");
    Swal.fire("Se ha ocultado la historia", "", "success").then(() => {
      historiaCreada();
    });
  };

  const editar = () => {
    navigate(`/edicion/${historia.uid}`);
  };

  return (
    <div className="pagina px-5 pt-5">
      <div className="text-center">
        {user.rol === "MOD" ? (
          historia.estado === "solicitado" ? (
            <div className="row mt-3 text-center">
              <div className="col-md-6">
                <button className="btn-nice w-50" onClick={aprobar}>
                  Aprobar
                </button>
              </div>
              <div className="col-md-6  ">
                <button className="btn-bad w-50" onClick={rechazar}>
                  Denegar
                </button>
              </div>
            </div>
          ) : historia.estado === "visible" ? (
            <div className="d-flex justify-content-end">
              <button className="btn-bad w-25" onClick={ocultar}>
                Ocultar
              </button>
            </div>
          ) : (
            <></>
          )
        ) : user.uid === historia.usuario ? (
          <div className="d-flex justify-content-end">
            <button className="btn-nice w-25" onClick={editar}>
              Editar
            </button>
          </div>
        ) : (
          <></>
        )}
        <h1>{historia.titulo}</h1>
        <hr />
      </div>
      <div
        className="px-3"
        dangerouslySetInnerHTML={{ __html: historia.contenido }}
      ></div>
      <hr />
      {user.rol === "USER" ? (
        <div className="container-fluid mt-4 pb-4">
          <div className="row px-5">
            <div className="col-md-1 align-bottom text-center">
              <i className="fa-regular fa-user fa-2xl align-bottom"></i>
            </div>
            <div className="col-md-11">
              <form onSubmit={onFormSubmit}>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control comentario"
                    name="comentario"
                    placeholder="Añada un comentario..."
                    value={comentario}
                    onChange={onInputChange}
                  />
                  <div className="form-group  mt-2 text-end">
                    <button type="submit" className="btn-p w-25">
                      Publicar comentario
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {estadoCom == "finished" ? (
        comentariosHist.map((com) => {
          return (
            <ComentarioCard
              key={com.uid}
              {...com}
              user={user}
              refrescar={refrescar}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
