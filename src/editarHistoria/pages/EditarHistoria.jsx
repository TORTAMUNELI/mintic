import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, useHistorias } from "../../hooks";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";

import "./EditarHistoria.css";
import { useRef } from "react";
import { useState } from "react";

export const EditarHistoria = () => {
  const editorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    historiaCreada,
    estadoHist,
    historias,
    error,
    creado,
    actualizarHistoria,
  } = useHistorias();

  const id = location.pathname.split("/")[2];
  const historia = historias.find((historia) => historia.uid === id);
  useEffect(() => {
    if (error !== undefined) {
      Swal.fire("Error en la creación de la historia", "", "error");
    }
    if (creado === true) {
      Swal.fire("La historia ha sido creada", "", "success").then(() => {
        historiaCreada();
        navigate("/");
      });
    }
  }, [error, creado]);

  const [{ titulo }, setTituloState] = useState({ titulo: historia.titulo });

  const historiaSubmit = (event) => {
    event.preventDefault();

    actualizarHistoria(historia.uid, titulo, editorRef.current.getContent());
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setTituloState({
      [name]: value,
    });
  };

  return (
    <div className="pagina px-5 pt-5">
      <div className="text-center">
        <h1>Editar Historia</h1>
        <hr />
      </div>
      {estadoHist == "finished" ? (
        <div className="px-5 mt-4">
          <form onSubmit={historiaSubmit}>
            <div className="form-group mt-4">
              <label htmlFor="titulo" className="form-label">
                <h5>Título</h5>
              </label>
              <input
                type="text"
                id="titulo"
                className="form-control"
                name="titulo"
                value={titulo}
                onChange={onInputChange}
              />
            </div>
            <div className="mt-4">
              <label className="form-label" htmlFor="contenido">
                <h5>Contenido</h5>
              </label>
              <Editor
                onInit={(event, editor) => (editorRef.current = editor)}
                init={{ menubar: "edit insert view format table tools" }}
                id="contenido"
                initialValue={historia.contenido}
              />
            </div>
            <div className="form-group mt-4  pb-4 text-center">
              <button
                type="submit"
                className="btn-p iniciar-sesion btn-enviar-historia"
              >
                Actualizar historia historia
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};
