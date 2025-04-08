import userIcon from "../assets/user.png"
import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Clients() {
  const { userClients, darkMode } = useContext(MenuContext)

  const statsComponentDarkStyles = {
    backgroundColor: "#14213D"
  }

  const clientList = userClients.map((client) => {
    return <div key={client.id} className="stat-item-holder">
            <img className="stats-user-icon" src={client.avatarUrl ? client.avatarUrl : userIcon} />
            <p>{client.name}</p>
          </div>
  })
  return (
    <div style={darkMode ? statsComponentDarkStyles : null} className="stats-component">
      {clientList}
    </div>
  )
}

export default Clients