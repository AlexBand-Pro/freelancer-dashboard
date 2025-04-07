import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import { gigs } from '../../api'
import Gig from "../components/Gig"

function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")

  const uncompletedGigs = gigs.filter(gig => !gig.completedBy);
  const filteredGigs = uncompletedGigs.filter(gig => !typeFilter || typeFilter === gig.status)

  const [applied, setApplied] = useState({})

  const applyForGig = (gigId) => {
    setApplied(prevApplied => ({
      ...prevApplied,
      [gigId]: gigId
    }))
  }


  const handleFilterChange = (key, value) => {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }

  const gigList = filteredGigs.map((gig) => {
    return <Gig key={gig.id} gig={gig} applyForGig={applyForGig} applied={applied} />
  })

  return (
    <main className="explore-main">
      <h1>Find your gig</h1>

      <div className="filters">
        <button
          onClick={() => handleFilterChange("type", "standard")}
          className={`gig-filter ${typeFilter === "standard" ? typeFilter : ""}`}>Standard
        </button>
        <button
          onClick={() => handleFilterChange("type", "premium")}
          className={`gig-filter ${typeFilter === "premium" ? typeFilter : ""}`}>Premium
        </button>
        <button
          onClick={() => handleFilterChange("type", null)}
          className="clear-filter-btn">Clear filters
        </button>
      </div>

      {gigList}
    </main>
  )
}

export default Explore

{/* <div className="new-gig">
        <div className="gig-body">
          <div className="client-info">
            <img className="explore-client-img" src={userIcon} />
          </div>
          <div className="gig-info">
            <p className="gig-name bold">Create a UI design</p>
            <p className="explore-p">$40</p>
          </div>
        </div>
        <button className="apply-gig-button bold">Apply</button>
      </div> */}