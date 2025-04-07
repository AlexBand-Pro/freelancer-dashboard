import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailLog from "./pages/EmailLog"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Explore from "./pages/Explore"
import Clients from "./page-components/Clients"
import Gigs from "./page-components/Gigs"
import Payments from "./page-components/Payments"
import AuthRequired from "./components/Authrequired"
import '../api'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="login/email-log" element={<EmailLog />} />

          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<Dashboard />} >
              <Route index element={<Clients />} ></Route>
              <Route path="gigs" element={<Gigs />} ></Route>
              <Route path="payments" element={<Payments />} ></Route>
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="explore" element={<Explore />} />
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
