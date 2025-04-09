import { Link, NavLink, Outlet } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "../components/Layout";
import Spinner from '../components/Spinner'

function Dashboard() {
  const { userGigs, userClients, darkMode, isLoading } = useContext(MenuContext)

  const activeStyles = {
    color: darkMode ? "whitesmoke" : "#2d3e63",
    fontWeight: "700",
    textDecoration: "underline"
  }

  const userEarnings = userGigs.reduce((total, gig) => {
    return total + gig.price
  }, 0)

  return (
    <main className={`dashboard-main ${darkMode ? "main-dark" : ""}`}>
      <h1>Dashboard</h1>
      {isLoading ? <Spinner size={50} color={darkMode ? "#fff" : "#333"} /> :
        <>
          <div className="stats">
            <div className={`stats-box ${darkMode ? "dark" : ""}`}>
              <p className="stat-title">Earnings</p>
              <p className="stat-value">${userEarnings}</p>
            </div>
            <div className={`stats-box ${darkMode ? "dark" : ""}`}>
              <p className="stat-title">Clients</p>
              <p className="stat-value">{userClients.length}</p>
            </div>
            <div className={`stats-box ${darkMode ? "dark" : ""}`}>
              <p className="stat-title">Gigs</p>
              <p className="stat-value">{userGigs.length}</p>
            </div>
          </div>

          <div className="main-content-dashboard">
            <div className={`dashboard-nav ${darkMode ? "dark" : ""}`}>
              <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} end to="/dashboard">Clients</NavLink>
              <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} to="gigs">Gigs</NavLink>
              <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} to="payments">Payments</NavLink>
            </div>
            <Outlet />
          </div>
        </>
      }
    </main>
  )
}

export default Dashboard