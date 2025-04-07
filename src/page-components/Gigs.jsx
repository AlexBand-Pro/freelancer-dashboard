import { useContext } from "react"
import { MenuContext } from "../components/Layout";

function Gigs() {
  const { userGigs } = useContext(MenuContext)
  const gigList = userGigs.map(gig => <p key={gig.id} className="stats-item">{gig.title}</p>)

  return (
    <div className="stats-component">
      {gigList}
    </div>
  )
}

export default Gigs