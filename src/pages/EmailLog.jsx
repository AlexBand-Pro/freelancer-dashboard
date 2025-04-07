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
  const { loggedIn, setLoggedIn } = useContext(MenuContext)

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
    !loggedIn ? <main className="login-main">
      <div className="go-back-link-wrapper"><Link className="go-back-log-in-link" relative="path" to="..">Go back</Link></div>
      <h1 className="log-in-title">{hasAccount ? "Log in" : "Create Account"}</h1>
      {error ? <p className="red-error">{error}</p> : null}
      <form>
        <input ref={emailRef} className="log-in-input" name="email" id="email" type="email" placeholder="Email" />
        <input ref={passwordRef} className="log-in-input" name="password" id="password" type="password" placeholder="First password" />
        {hasAccount
          ? <button disabled={reqStatus === "submitting"} onClick={logIn}>Log in</button>
          : <button disabled={reqStatus === "submitting"} onClick={createAccount}>Create Account</button>}
      </form>
    </main> : <Navigate to="/dashboard" />
  )
}

export default EmailLog