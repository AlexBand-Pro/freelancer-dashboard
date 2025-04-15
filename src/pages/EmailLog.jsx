import { useLocation, Navigate, Link } from "react-router-dom"
import { useRef, useState, useContext } from "react"
import { authCreateAccountWithEmail, authSignInWithEmail } from "../../api"
import { MenuContext } from "../components/Layout"

function EmailLog() {
  const location = useLocation()
  const hasAccount = location.state?.logIn

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const [error, setError] = useState(null)
  const [reqStatus, setReqStatus] = useState("idle")
  const { loggedIn, setLoggedIn, darkMode } = useContext(MenuContext)

  const createAccount = (e) => {
    e.preventDefault()
    authCreateAccountWithEmail(emailRef.current.value, passwordRef.current.value, setLoggedIn, setReqStatus, setError)
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }

  const logIn = (e) => {
    e.preventDefault()
    authSignInWithEmail(emailRef.current.value, passwordRef.current.value, setLoggedIn, setReqStatus, setError)
    emailRef.current.value = ""
    passwordRef.current.value = ""
  }
  return (
    !loggedIn ? <main className={`login-main ${darkMode ? "main-dark" : ""}`}>
      <div className="go-back-link-wrapper"><Link className="go-back-log-in-link" relative="path" to="..">Go back</Link></div>
      <h1 className="log-in-title">{hasAccount ? "Log in" : "Create Account"}</h1>
      {error ? <p className="red-error">{error}</p> : null}
      <form>
        <input className={`log-in-input ${darkMode ? "dark" : ""}`} ref={emailRef} name="email" id="email" type="email" placeholder="Email" />
        <input className={`log-in-input ${darkMode ? "dark" : ""}`} ref={passwordRef} name="password" id="password" type="password" placeholder="Password" />
        {hasAccount
          ? <button className={`log-in-input ${darkMode ? "dark" : ""}`} disabled={reqStatus === "submitting"} onClick={logIn}>Log in</button>
          : <button className={`log-in-input ${darkMode ? "dark" : ""}`} disabled={reqStatus === "submitting"} onClick={createAccount}>Create Account</button>}
      </form>
    </main> : <Navigate to="/dashboard" />
  )
}

export default EmailLog