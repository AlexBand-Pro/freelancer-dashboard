import { MenuContext } from "../components/Layout"
import { useContext } from "react"
import { Link } from "react-router-dom"

function NotFound() {
  const { darkMode } = useContext(MenuContext)

  return (
    <main className={`not-found-main ${darkMode ? "main-dark" : ""}`}>
      <h1>Page Not Found</h1>
      <Link className={`not-found-link ${darkMode ? "not-found-link-dark" : "not-found-link-light"}`} to="/">Go Home</Link>
    </main>
  )
}

export default NotFound