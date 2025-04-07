import googleIcon from "../assets/google.png"
import emailIcon from "../assets/mail.png"
import { Link, Navigate, useLocation } from "react-router-dom"
import { useContext } from "react"
import { MenuContext } from "../components/Layout"
import { authSignInWithGoogle } from "../../api"

function Login() {
  const { loggedIn } = useContext(MenuContext)
  const signInWithGoogle = (e) => {
    e.preventDefault()
    authSignInWithGoogle()
  }

  const location = useLocation()
  const to = location.state?.to || "/dashboard"
  const accessError = location.state?.error || null
  return (
    !loggedIn ? <main className="login-main">
      <h1 className="log-in-title">Choose your log in option</h1>
      {accessError ? <p className="red-error">{accessError}</p> : null}
      <Link state={{ logIn: true }} to="/login/email-log" className="log-in-btn"><img className="log-in-icon" src={emailIcon} />Log in</Link>
      <Link state={{ logIn: false }} to="/login/email-log" className="log-in-btn"><img className="log-in-icon" src={emailIcon} />Create Account</Link>
      <p>or</p>
      <button onClick={signInWithGoogle} className="log-in-btn"><img className="log-in-icon" src={googleIcon} /> Sign in with Google</button>
    </main> : <Navigate to={to} replace />
  )
}

export default Login