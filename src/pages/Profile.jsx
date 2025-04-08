import { MenuContext } from "../components/Layout"
import { useContext } from "react"

function Profile () {
  const { userInfo, darkMode } = useContext(MenuContext)

  return (
    <main className={`profile-main ${darkMode ? "main-dark" : ""}`}>
      <img className={`user-profile-image ${darkMode ? 'premium-dark-border' : ""}`} src={userInfo.userImg} />
      <div className="profile-text-wrapper">
        <p className="profile-full-name">
          <span className="bold">Name:</span> {userInfo.userName}
        </p>
        <p className="profile-email">
          <span className="bold">Email:</span> {userInfo.userEmail}
        </p>
        <p className="profile-phone">
          <span className="bold">Phone:</span> +1 (555) 014-2398
        </p>
        <p className="profile-bio">
          <span className="bold">Bio:</span> Hey there! I'm {userInfo.userName}, a full-stack developer with over 5 years of experience building web applications that are fast, secure, and user-friendly. I specialize in React, Node.js, and Firebase, and I love turning ideas into functional, polished products. Whether it's a landing page, a dashboard, or a full SaaS platform, I'm all about clean code and clean design. When I'm not coding, I'm probably fishing, gaming, or tinkering with side projects.
        </p>
        <p className="profile-rate">
          <span className="bold">Hourly rate:</span> $60
        </p>
      </div>
    </main>
  )
}

export default Profile