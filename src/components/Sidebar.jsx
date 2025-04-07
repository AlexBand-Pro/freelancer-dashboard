import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "./Layout";

function Sidebar() {
  const { menuOpen, setMenuOpen } = useContext(MenuContext)

  const hideMenu = () => {
    setMenuOpen(false)
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