import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Payments() {
  const { userGigs, darkMode } = useContext(MenuContext)

  const statsComponentDarkStyles = {
    backgroundColor: "#14213D"
  }

  const payments = userGigs.map(gig => {
    return <div key={gig.id}>
      <img />
      <p className="stats-item">${gig.price}</p>
    </div>
  })

  return (
    <div style={darkMode ? statsComponentDarkStyles : null} className="stats-component">
      {payments}
    </div>
  )
}

export default Payments