import userIcon from "../assets/user.png"
import { TiThMenu } from "react-icons/ti"
import { Link } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useContext } from "react"
import { MenuContext } from "./Layout"
import { authSignOut } from "../../api"

function Header() {
  const { toggleMenu, setLoggedIn, loggedIn, userPhotoURL } = useContext(MenuContext)

  const logOut = () => {
    authSignOut(setLoggedIn)
  }

  return (
    <>
      <header>
        <button onClick={toggleMenu} className={"menu-btn"}>
          <TiThMenu className="sandwich-icon" size={18} />
        </button>
        <Link to={"/"} className="logo">Freelancer</Link>
        {!loggedIn
          ? <Link to="/login" className="log-in-container">
            <p>Log in</p>
            <img className="user-icon-img" src={userIcon} />
          </Link>
          : <button className="log-in-container" onClick={logOut}>
            <p>Log out</p>
            <img className="user-icon-img" src={userPhotoURL || userIcon} />
          </button>}
      </header>
      <Sidebar />
    </>
  )
}

export default Header