import React, { useRef } from "react";
import { useEffect } from "react";

import { Editor } from "@tinymce/tinymce-react";
import { useForm, useHistorias } from "../../hooks";
import "./NuevaHistoria.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const historiaFields = {
  titulo: "",
};

export const NuevaHistoria = () => {
  const editorRef = useRef();
  const { createHistoria, historiaCreada } = useHistorias();
  const { titulo, onInputChange: onHistoriaInputChange } =
    useForm(historiaFields);
  const { estadoHist, error, creado } = useHistorias();
  const navigate = useNavigate();

  const historiaSubmit = (event) => {
    event.preventDefault();

    createHistoria(titulo, editorRef.current.getContent());
  };

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

  return (
    <div className="pagina px-5 pt-5">
      <div className="text-center">
        <h1>Nueva Historia</h1>
        <p className="text-start under">
          Por favor recuerde que la publicación de su historia esta sujeta al
          critero de los moderadores de la página*
        </p>

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
                onChange={onHistoriaInputChange}
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
              />
            </div>
            <div className="form-group mt-4  pb-4 text-center">
              <p className="under">
                Al publicar su historia esta va a poder ser vista por cualquier
                usuario registrado en la aplicación
              </p>

              <button
                type="submit"
                className="btn-p iniciar-sesion btn-enviar-historia"
              >
                Crear historia
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
