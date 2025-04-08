import googleIcon from "../assets/google.png"
import emailIcon from "../assets/mail.png"
import darkEmailIcon from "../assets/mail-dark.png"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "../components/Layout"
import { authSignInWithGoogle } from "../../api"

function Login() {
  const { loggedIn, darkMode } = useContext(MenuContext)

  const mainDarkStyles = {
    backgroundColor: "#161616",
    color: "whitesmoke"
  }

  const btnDarkStyles = {
    backgroundColor: "#14213D",
    color: "whitesmoke"
  }

  const signInWithGoogle = (e) => {
    e.preventDefault()
    authSignInWithGoogle()
  }

  const location = useLocation()
  const to = location.state?.to || "/dashboard"
  const accessError = location.state?.error || null

  return (
    !loggedIn ? <main style={darkMode ? mainDarkStyles : null} className="login-main">
      <h1 className="log-in-title">Choose your log in option</h1>
      {accessError ? <p className="red-error">{accessError}</p> : null}
      <Link style={darkMode ? btnDarkStyles : null} state={{ logIn: true }} to="/login/email-log" className="log-in-btn"><img className="log-in-icon" src={darkMode ? darkEmailIcon : emailIcon} />Log in</Link>
      <Link style={darkMode ? btnDarkStyles : null} state={{ logIn: false }} to="/login/email-log" className="log-in-btn"><img className="log-in-icon" src={darkMode ? darkEmailIcon : emailIcon} />Create Account</Link>
      <p>or</p>
      <button style={darkMode ? btnDarkStyles : null} onClick={signInWithGoogle} className="log-in-btn"><img className="log-in-icon" src={googleIcon} /> Sign in with Google</button>
    </main> : <Navigate to={to} replace />
  )
}

export default Login