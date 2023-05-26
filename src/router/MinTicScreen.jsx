import React from "react";
import { Navbar } from "../ui/pages/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import { Principal } from "../historias/pages/Principal";
import { MisHistorias } from "../mis-historias/pages/MisHistorias";
import { NuevaHistoria } from "../nueva-historia/pages/NuevaHistoria";
import { HistoriaPage } from "../historia/pages/HistoriaPage";
import { Solicitudes } from "../solicitudes/pages/Solicitudes";
import { BuscarHistorias } from "../buscarHistorias/pages/BuscarHistorias";
import { EditarHistoria } from "../editarHistoria/pages/EditarHistoria";
import { Admin } from "../admin/pages/Admin";

export const MinTicScreen = () => {
  return (
    <div className="root">
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/mis-historias" element={<MisHistorias />} />
        <Route path="/crear-historia" element={<NuevaHistoria />} />
        <Route path="/historia/*" element={<HistoriaPage />} />
        <Route path="/solicitudes" element={<Solicitudes />} />
        <Route path="/historias" element={<BuscarHistorias />} />
        <Route path="/edicion/*" element={<EditarHistoria />} />
        <Route path="/usuarios" element={<Admin />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
