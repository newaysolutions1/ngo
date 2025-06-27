import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") === "true";
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}
