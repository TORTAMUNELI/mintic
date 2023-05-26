import React, { useEffect } from "react";
import "./MisHistorias.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore, useHistorias } from "../../hooks";
import { HistoriaCard } from "../../HistoriaCard/pages/HistoriaCard";

export const MisHistorias = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { estadoHist, historias, getHistoriasById } = useHistorias();

  useEffect(() => {
    getHistoriasById(user.uid);
  }, []);

  const onNuevaHistoria = () => {
    navigate("/crear-historia");
  };

  return (
    <div className="pagina px-5 pt-5 ">
      <h1 className="mt-5 text-center">Mis Historias</h1>
      <hr />
      <div className="d-flex justify-content-start ">
        <button className="nueva-historia btn-nice" onClick={onNuevaHistoria}>
          Nueva historia
        </button>
      </div>
      {estadoHist === "finished" ? (
        historias.length === 0 ? (
          <div className="text-center mt-5">
            <h1>No hay nada que ver aquí...</h1>
          </div>
        ) : (
          historias.map((historia) => (
            <HistoriaCard key={historia.uid} {...historia} />
          ))
        )
      ) : (
        <div className="text-center mt-5">
          <span className="loader"></span>
        </div>
      )}
    </div>
  );
};
