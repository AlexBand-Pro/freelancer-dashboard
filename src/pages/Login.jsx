import googleIcon from "../assets/google.png"
import emailIcon from "../assets/mail.png"
import darkEmailIcon from "../assets/mail-dark.png"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "../components/Layout"
import { authSignInWithGoogle } from "../../api"

function Login() {
  const { loggedIn, darkMode } = useContext(MenuContext)

  const signInWithGoogle = (e) => {
    e.preventDefault()
    authSignInWithGoogle()
  }

  const location = useLocation()
  const to = location.state?.to || "/dashboard"
  const accessError = location.state?.error || null

  return (
    !loggedIn ? <main className={`login-main ${darkMode ? "main-dark" : ""}`}>
      <h1 className="log-in-title">Choose your log in option</h1>
      {accessError ? <p className="red-error">{accessError}</p> : null}
      
      <Link className={`log-in-btn ${darkMode ? "dark" : ""}`} state={{ logIn: true }} to="/login/email-log"><img className="log-in-icon" src={darkMode ? darkEmailIcon : emailIcon} />Log in</Link>

      <Link className={`log-in-btn ${darkMode ? "dark" : ""}`} state={{ logIn: false }} to="/login/email-log"><img className="log-in-icon" src={darkMode ? darkEmailIcon : emailIcon} />Create Account</Link>

      <p>or</p>

      <button className={`log-in-btn ${darkMode ? "dark" : ""}`} onClick={signInWithGoogle}><img className="log-in-icon" src={googleIcon} /> Sign in with Google</button>
    </main> : <Navigate to={to} replace />
  )
}

export default Login