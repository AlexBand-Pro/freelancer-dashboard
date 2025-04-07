import { Link } from "react-router-dom"

function Home () {
  return (
    <main className="home-main">
      <h1>Take on more clients, stress less.</h1>
      <p className="home-hero-text">Your freelance business just got easier. Manage projects, clients, and payments — all in one place.</p>
      <Link className="start-now-btn" to="/login">Start Now</Link>
    </main>
  )
}

export default Home