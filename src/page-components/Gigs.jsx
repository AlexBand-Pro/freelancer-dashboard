import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Gigs() {
  const { userGigs, darkMode } = useContext(MenuContext)

  const statsComponentDarkStyles = {
    backgroundColor: "#14213D"
  }

  const gigList = userGigs.map(gig => <p key={gig.id} className="stats-item">{gig.title}</p>)

  return (
    <div style={darkMode ? statsComponentDarkStyles : null} className="stats-component">
      {gigList}
    </div>
  )
}

export default Gigs