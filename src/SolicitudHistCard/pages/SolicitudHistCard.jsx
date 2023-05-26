import React from "react";
import { useNavigate } from "react-router-dom";

export const SolicitudHistCard = ({ titulo, correo, uid }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/historia/${uid}`);
  };
  return (
    <div className="mt-4 pb-2 px-4" onClick={onClick}>
      <div className="container w-100   hover-pointer">
        <div className="row">
          <div className="col-md-6">
            <h3 className="">{titulo}</h3>
          </div>
          <div className="col-md-6 text-center align-bottom">
            <h6 className="">{correo}</h6>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
