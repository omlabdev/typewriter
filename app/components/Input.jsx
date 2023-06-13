"use client"

import React from 'react'

function Input({ input, handleInput, mode }) {

  function handleChange(event) {
    if (mode === 'write') {
      if (event.code === 'Tab') {
        event.preventDefault()
        event.target.value += ' '
      }
      handleInput(event.target.value, event.target.selectionEnd)
    }
  }

  // Don't let the input lose focus
  React.useEffect(() => document.onmousedown = (event) => event.preventDefault(), [])

  return(
    <div className="input-wrapper">
      <textarea
        value={input}
        onChange={handleChange}
        onKeyDown={handleChange}
        onKeyUp={handleChange}
        autoFocus
      />
    </div>
  )
}

export default Input
