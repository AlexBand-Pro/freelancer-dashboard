import userIcon from "../assets/user.png"
import userIconDark from "../assets/user-dark.png"
import { TiThMenu } from "react-icons/ti"
import { Link, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import { MenuContext } from "./Layout"
import { authSignOut } from "../../api"

function Header() {
  const { toggleMenu, setLoggedIn, loggedIn, userInfo, darkMode } = useContext(MenuContext)

  const navigate = useNavigate()

  const logOut = () => {
    authSignOut(setLoggedIn)
    navigate("/")
  }

  return (
    <>
      <header className={darkMode ? "dark" : ""}>
        <button onClick={toggleMenu} className={"menu-btn"}>
          <TiThMenu className={`sandwich-icon ${darkMode ? "dark" : ""}`} size={18} />
        </button>
        <Link to={"/"} className="logo">Freelancer</Link>
        {!loggedIn
          ? <Link to="/login" className="log-in-container">
            <p className={darkMode ? "log-in-text-responsive-dark" : ""}>Log in</p>
            <img className="user-icon-img" src={ darkMode ? userIconDark : userIcon} />
          </Link>
          : <button className="log-in-container" onClick={logOut}>
            <p className={darkMode ? "log-in-text-responsive-dark" : ""}>Log out</p>
            <img className="user-icon-img" src={userInfo.userImg} />
          </button>}
      </header>
      <Sidebar />
    </>
  )
}

export default Header