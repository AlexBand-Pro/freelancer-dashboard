import { Link, NavLink, Outlet } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Dashboard() {
  const { userGigs, userClients, darkMode } = useContext(MenuContext)

  const activeStyles = {
    color: darkMode ? "whitesmoke" : "#2d3e63",
    fontWeight: "700",
    textDecoration: "underline"
  }

  const userEarnings = userGigs.reduce((total, gig) => {
    return total + gig.price
  }, 0)

  const dashBoardMainDarkStyles = {
    backgroundColor: "#161616",
    color: "whitesmoke"
  }

  const statsDarkStyles = {
    backgroundColor: "#14213D"
  }

  return (
    <main style={darkMode ? dashBoardMainDarkStyles : null} className="dashboard-main">
      <h1>Dashboard</h1>
      <div className="stats">
        <div style={darkMode ? statsDarkStyles : null} className="stats-box">
          <p className="stat-title">Earnings</p>
          <p className="stat-value">${userEarnings}</p>
        </div>
        <div style={darkMode ? statsDarkStyles : null} className="stats-box">
          <p className="stat-title">Clients</p>
          <p className="stat-value">{userClients.length}</p>
        </div>
        <div style={darkMode ? statsDarkStyles : null} className="stats-box">
          <p className="stat-title">Gigs</p>
          <p className="stat-value">{userGigs.length}</p>
        </div>
      </div>

      <div className="main-content-dashboard">
        <div style={darkMode ? statsDarkStyles : null} className="dashboard-nav">
          <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} end to="/dashboard">Clients</NavLink>
          <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} to="gigs">Gigs</NavLink>
          <NavLink className="dashboard-nav-link" style={({ isActive }) => isActive ? activeStyles : null} to="payments">Payments</NavLink>
        </div>
        <Outlet />
      </div>
    </main>
  )
}

export default Dashboard