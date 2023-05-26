import React from "react";
import { useAuthStore } from "../../hooks";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  const onLogout = () => {
    startLogout();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink to="/">
            <i className="fa-solid fa-sun blanco fa-xl">
              {" "}
              <span className="ml-5 titulo"> Historias Migratorias</span>
            </i>
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse order-3 dual-collapse2 d-flex justify-content-end fs-5">
        <ul className="navbar-nav ml-auto">
          <NavLink to="/historias" className="nav-item nav-link">
            Buscar
          </NavLink>

          {user.rol == "MOD" ? (
            <>
              {" "}
              <NavLink to="/solicitudes" className="nav-item nav-link">
                Solicitudes
              </NavLink>
            </>
          ) : user.rol == "ADMIN" ? (
            <>
              <NavLink to="/usuarios" className="nav-item nav-link">
                Usuarios
              </NavLink>
            </>
          ) : (
            <NavLink to="/mis-historias" className="nav-item nav-link">
              Mis Historias
            </NavLink>
          )}

          <i className=" nav-item nav-link mt-1 fa-regular fa-user blanco"></i>

          <span className="nav-item nav-link blanco"> {user?.name}</span>
          <button className="nav-item nav-link btn" onClick={onLogout}>
            Cerrar Sesión
          </button>
        </ul>
      </div>
    </nav>
  );
};
