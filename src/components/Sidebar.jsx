import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "./Layout";
import nightImg from "../assets/night-mode.png"
import dayImg from "../assets/day-mode.png"

function Sidebar() {
  const { menuOpen, setMenuOpen, darkMode, setDarkMode } = useContext(MenuContext)

  const hideMenu = () => {
    setMenuOpen(false)
  }

  const toggleTheme = () => {
    setDarkMode(prevDarkMode => !prevDarkMode)
  }

  return (
    <nav className={`nav-bar ${menuOpen ? "menu-open" : ""}`}>
      <span className="logo nav-bar-logo">Freelancer</span>
      <ul>
        <NavLink
          style={{ color: darkMode ? "whitesmoke" : "" }}
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          end
          to="/"><li style={{ color: darkMode ? "whitesmoke" : "" }}>Home</li></NavLink>

        <NavLink
          style={{ color: darkMode ? "whitesmoke" : "" }}
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          end
          to="/dashboard"><li style={{ color: darkMode ? "whitesmoke" : "" }}>Dashboard</li></NavLink>

        <NavLink
          style={{ color: darkMode ? "whitesmoke" : "" }}
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          to="/explore"><li style={{ color: darkMode ? "whitesmoke" : "" }}>Explore</li></NavLink>
      </ul>

      <ul className="profile-ul">
        <NavLink
          style={{ color: darkMode ? "whitesmoke" : "" }}
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          to="/profile"><li style={{ color: darkMode ? "whitesmoke" : "" }}>Profile</li></NavLink>

        <li onClick={toggleTheme} className="theme-toggler-container">
          <button className="theme-toggler"><img className="theme-img" src={darkMode ? nightImg : dayImg} /></button>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar