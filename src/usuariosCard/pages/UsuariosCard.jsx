import React from "react";
import { useUsuario } from "../../hooks";
import Swal from "sweetalert2";

export const UsuariosCard = ({ uid, nombres, pApellido, sApellido, rol }) => {
  const { cambiarRol } = useUsuario();

  const convertir = () => {
    if (rol === "MOD") {
      cambiarRol(uid, "USER");
    } else if (rol === "USER") {
      cambiarRol(uid, "MOD");
    }

    Swal.fire("Se ha cambiado el rol del usuario", "", "success");
  };

  return (
    <div className="mt-4 pb-2 px-4">
      <div className="container w-100">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1>
              {nombres} {pApellido} {sApellido}
            </h1>
            <span>Rol actual: {rol}</span>
          </div>
          <div className="col-md-4 ">
            <button className="btn-nice w-50" onClick={convertir}>
              Cambiar rol a {rol === "USER" ? <>MOD</> : <>USER</>}
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
