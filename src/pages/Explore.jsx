import { useSearchParams } from "react-router-dom"
import { useState, useContext } from "react"
import Gig from "../components/Gig"
import { MenuContext } from "../components/Layout"
import clsx from 'clsx'
import Spinner from '../components/Spinner'

function Explore() {
  const { darkMode, loadingAllGigs, gigs, clients } = useContext(MenuContext)

  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = searchParams.get("type")

  const uncompletedGigs = gigs.filter(gig => !gig.completedBy)
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
    return <Gig key={gig.id} gig={gig} applyForGig={applyForGig} applied={applied} darkMode={darkMode} clients={clients} />
  })

  const filterClass = clsx(
    'gig-filter',
    typeFilter === 'premium' && typeFilter,
    darkMode && 'premium-dark-border'
  )

  return (
    <main className={`explore-main ${darkMode ? "main-dark" : ""}`}>
      <h1>Find your gig</h1>

      <div className="filters">
        <button
          onClick={() => handleFilterChange("type", "standard")}
          className={`gig-filter ${typeFilter === "standard" ? typeFilter : ""}`}>Standard
        </button>
        <button
          onClick={() => handleFilterChange("type", "premium")}
          className={filterClass}>Premium
        </button>
        <button
          onClick={() => handleFilterChange("type", null)}
          className={`clear-filter-btn ${darkMode ? "dark-text-white" : null}`}>Clear filters
        </button>
      </div>

      {loadingAllGigs ? <Spinner size={50} color={darkMode ? "#ffffff" : "#333333"} /> :
        <div className="gigs-container">
          {gigList}
        </div>}
    </main>
  )
}

export default Explore