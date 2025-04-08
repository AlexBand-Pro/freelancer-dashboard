import { useSearchParams } from "react-router-dom"
import { useState, useContext } from "react"
import { gigs } from '../../api'
import Gig from "../components/Gig"
import { MenuContext } from "../components/Layout";

function Explore() {
  const { darkMode } = useContext(MenuContext)

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
    return <Gig key={gig.id} gig={gig} applyForGig={applyForGig} applied={applied} darkMode={darkMode} />
  })

  const mainDarkStyles = {
    backgroundColor: "#161616",
    color: "whitesmoke"
  }

  const clearFiltersDarkStyles = {
    color: "whitesmoke"
  }

  const premiumFilterDarkStyles = {
    border: "1px solid whitesmoke"
  }

  return (
    <main style={darkMode ? mainDarkStyles : null} className="explore-main">
      <h1>Find your gig</h1>

      <div className="filters">
        <button
          onClick={() => handleFilterChange("type", "standard")}
          className={`gig-filter ${typeFilter === "standard" ? typeFilter : ""}`}>Standard
        </button>
        <button
          style={darkMode ? premiumFilterDarkStyles : null}
          onClick={() => handleFilterChange("type", "premium")}
          className={`gig-filter ${typeFilter === "premium" ? typeFilter : ""}`}>Premium
        </button>
        <button
          style={darkMode ? clearFiltersDarkStyles : null}
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