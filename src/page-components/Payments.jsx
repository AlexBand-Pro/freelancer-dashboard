import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Payments() {
  const { userGigs } = useContext(MenuContext)
  const payments = userGigs.map(gig => {
    return <div key={gig.id}>
      <img />
      <p className="stats-item">${gig.price}</p>
    </div>
  })

  return (
    <div className="stats-component">
      {payments}
    </div>
  )
}

export default Payments