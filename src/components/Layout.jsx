import { Outlet } from "react-router-dom"
import Header from "./Header"
import { useState, createContext, useEffect } from "react"
import { determineLogState, fetchUserGigs, fetchUserClients, fetchAllGigs, fetchAllClients } from '../../api'

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext()

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [userGigs, setUserGigs] = useState([])
  const [userClients, setUserClients] = useState([])
  const [loadingGigs, setLoadingGigs] = useState(false)
  const [loadingClients, setLoadingClients] = useState(false)
  const [loadingAllGigs, setLoadingAllGigs] = useState(false)
  const [gigs, setGigs] = useState([])
  const [clients, setClients] = useState([])
  const [userInfo, setUserInfo] = useState({
    userImg: "/src/assets/user.png",
    userName: "Guest",
    userEmail: "example@gmail.com"
  })

  useEffect(() => {
    async function loadGigs() {
      setLoadingGigs(true)
      try {
        const data = await fetchUserGigs()
        setUserGigs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingGigs(false)
      }
    }

    loadGigs()
  }, [])

  useEffect(() => {
    async function loadClients() {
      setLoadingClients(true)
      try {
        const data = await fetchUserClients()
        setUserClients(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingClients(false)
      }
    }

    loadClients()
  }, [])

  useEffect(() => {
    async function loadAllGigs() {
      setLoadingAllGigs(true)
      try {
        const data = await fetchAllGigs()
        setGigs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingAllGigs(false)
      }
    }

    loadAllGigs()
  }, [])

  useEffect(() => {
    async function loadAllClients() {
      try {
        const data = await fetchAllClients()
        setClients(data)
      } catch (err) {
        console.error(err)
      }
    }

    loadAllClients()
  }, [])


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

  const isLoading = loadingClients && loadingGigs

  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen, toggleMenu, userGigs, userClients, loggedIn, setLoggedIn, userInfo, darkMode, setDarkMode, isLoading, loadingAllGigs, gigs, clients }}>
      <div id="shadow" className="shadow" style={{ display: menuOpen ? "block" : "none" }}></div>
      <Header />
      <Outlet />
    </MenuContext.Provider>
  )
}

export default Layout