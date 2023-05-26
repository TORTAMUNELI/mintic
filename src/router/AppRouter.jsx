import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage, RegisterPage } from "../auth";
import { useAuthStore } from "../hooks";
import { MinTicScreen } from "./MinTicScreen";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return (
      <div className="m-0 w-100 h-100 row align-items-center">
        <div className="text-center">
          <span className="loader"></span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route path="/register/*" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to="/auth" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<MinTicScreen />} />
        </>
      )}
    </Routes>
  );
};
