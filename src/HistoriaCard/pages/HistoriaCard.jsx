import React from "react";
import "./HistoriaCard.css";
import { useNavigate } from "react-router-dom";

export const HistoriaCard = ({ titulo, estado, uid }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/historia/${uid}`);
  };
  return (
    <div className="mt-4 pb-2 px-4" onClick={onClick}>
      <div className="container w-100 hover-pointer">
        <div className="row">
          <div className="col-md-5">
            <h3>{titulo}</h3>
          </div>
          <div className="col-md-4"> </div>
          <div className="col-md-3 text-center">
            <div className="w-100">
              Estado:{" "}
              <span
                style={
                  estado == "solicitado" ||
                  estado == "rechazado" ||
                  estado == "oculto"
                    ? { color: "#F05454" }
                    : { color: "#00ADB5" }
                }
              >
                {estado[0].toUpperCase() + estado.slice(1)}
              </span>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
