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
    <nav className={menuOpen ? "menu-open" : ""}>
      <span className="logo nav-bar-logo">Freelancer</span>
      <ul>
        <NavLink
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          end
          to="/"><li>Home</li></NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          end
          to="/dashboard"><li>Dashboard</li></NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          to="/explore"><li>Explore</li></NavLink>

        <li onClick={toggleTheme} className="theme-toggler-container">
          <button className="theme-toggler"><img className="theme-img" src={darkMode ? nightImg : dayImg} /></button>
        </li>
      </ul>

      <ul className="profile-ul">
        <NavLink
          className={({ isActive }) => isActive ? "nav-link-nav-bar sidebar-active" : "nav-link-nav-bar"}
          onClick={hideMenu}
          to="/profile"><li>Profile</li></NavLink>
      </ul>
    </nav>
  )
}

export default Sidebar