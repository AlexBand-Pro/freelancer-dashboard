import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useState, createContext, useEffect } from "react"
import { gigs, clients, user, determineLogState } from '../../api'

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext()

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [userInfo, setUserInfo] = useState({
    userImg: "/src/assets/user.png",
    userName: "Guest",
    userEmail: "example@gmail.com"
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(savedTheme === "true");
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1300) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen)
  }

  const userGigs = gigs.filter(gig => gig.completedBy === user[0])

  const userClients = clients.filter((client) => {
    return userGigs.some((gig) => client.clientId === gig.ownedBy);
  });

  useEffect(() => {
    const hideMenu = (e) => {
      if (e.target.id === "shadow") {
        setMenuOpen(prevMenuOpen => !prevMenuOpen)
      }
    }

    document.body.addEventListener("click", hideMenu)

    return () => {
      document.body.removeEventListener("click", hideMenu)
    }
  }, [])

  useEffect(() => {
    determineLogState(setLoggedIn, setUserInfo, darkMode)
  }, [loggedIn, darkMode])

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, toggleMenu, userGigs, userClients, loggedIn, setLoggedIn, userInfo, darkMode, setDarkMode }}>
      <div id="shadow" className="shadow" style={{ display: menuOpen ? "block" : "none" }}></div>
      <Header />
      <Outlet />
    </MenuContext.Provider>
  )
}

export default Layout