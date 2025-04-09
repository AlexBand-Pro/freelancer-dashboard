import React from 'react'

function Spinner({ size = 40, color = '#333' }) {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
        borderLeftColor: color,
        borderBottomColor: color
      }}
    ></div>
  )
}

export default Spinner