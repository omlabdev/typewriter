'use client'

import { ChangeEvent, KeyboardEvent, useEffect } from 'react'

import { Mode } from '@/types/mode'

function Input({ input, handleInput, mode }: { input: any, handleInput: (value: string, selectionEnd: number) => void, mode: Mode }) {

  function handleChange(event: KeyboardEvent | ChangeEvent) {
    if (mode === 'write') {
      let { value, selectionEnd } = event.target as HTMLTextAreaElement
      if (('code' in event) && (event.code === 'Tab')) {
        event.preventDefault()
        value += ' '
      }
      handleInput(value, selectionEnd)
    }
  }

  // Don't let the input lose focus
  useEffect(() => { document.onmousedown = (event) => event?.preventDefault() }, [])

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
