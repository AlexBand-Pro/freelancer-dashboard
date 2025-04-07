import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "./Layout";

function AuthRequired() {
  const { loggedIn } = useContext(MenuContext)
  const location = useLocation()

  return loggedIn ? <Outlet /> : <Navigate to="/login" replace state={{ to: location.pathname }} />
}

export default AuthRequired