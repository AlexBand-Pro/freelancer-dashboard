import userIcon from "../assets/user.png"
import { clients } from '../../api'

function Gig({ gig, applyForGig, applied }) {
  const client = clients.filter((client) => gig.ownedBy === client.clientId)
  const clientAvatar = client[0].avatarUrl ? client[0].avatarUrl : userIcon

  const appliedSetting = applied[gig.id]

  return (
    <div className="new-gig">
      <div className="gig-body">
        <div className="client-info">
          <img className="explore-client-img" src={clientAvatar} />
        </div>
        <div className="gig-info">
          <p className="gig-name bold">{gig.title}</p>
          <p className="explore-p">${gig.price}</p>
        </div>
      </div>
      <button className={`apply-gig-button bold ${appliedSetting ? "applied-btn" : ""}`} onClick={() => applyForGig(gig.id)}>
        {appliedSetting ? "Applied" : "Apply"}
      </button>
    </div>
  )
}

export default Gig