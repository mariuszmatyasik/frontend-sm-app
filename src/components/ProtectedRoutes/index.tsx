import React from "react"
import {Navigate, Outlet, useLocation} from "react-router-dom";

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FC<IProtectedRoutesProps> = ({}) => {
  const isAuth: boolean = true;
  const location = useLocation();

  return isAuth ? (<Outlet />) : (
      <Navigate to="/login" state={{ from: location }} />
  );
}

  export default ProtectedRoutes;