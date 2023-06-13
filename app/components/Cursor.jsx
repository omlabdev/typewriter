"use client"

import '../styles/cursor.css'

import React from 'react'

function Cursor({ mode }) {
  const [blink, setBlink] = React.useState(true)
  React.useEffect(() => { setTimeout(() => setBlink(!blink), 700) }, [blink])

  if (mode === 'read') return(null)

  return(
    <div className="cursor-wrapper">
      <span className={`cursor ${blink ? 'cursor--off' : ''}`}></span>
    </div>
  )
}

export default Cursor
