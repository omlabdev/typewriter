'use client'

import '../styles/cursor.css'

import { useEffect, useState } from 'react'

import { Mode } from '@/types/mode'

function Cursor({ mode }: { mode: Mode }) {
  const [blink, setBlink] = useState(true)
  useEffect(() => { setTimeout(() => setBlink(!blink), 700) }, [blink])

  if (mode === 'read') return(null)

  return(
    <div className="cursor-wrapper">
      <span className={`cursor ${blink ? 'cursor--off' : ''}`}></span>
    </div>
  )
}

export default Cursor
