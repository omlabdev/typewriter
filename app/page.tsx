'use client'

import { useState } from 'react'

import { Mode } from '@/types/mode'
import { PageSize } from '@/types/pageSize'

import Input from '../components/Input'
import Cursor from '../components/Cursor'
import Pages from '../components/Pages'
import Header from '../components/Header'
import Upload from '../components/Upload'

function App() {
  const [input, setInput] = useState('')
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [mode, setMode] = useState<Mode>('write')
  const [pageSize, setPageSize] = useState<PageSize>('a4')

  function handleInput(newInput: string, newSelectionEnd: number) {
    setInput(newInput)
    setSelectionEnd(newSelectionEnd)
  }

  function handleDownload() {
    if (typeof window === 'object') {
      const text = encodeURIComponent(input)
      const element = document.createElement('a')
      element.setAttribute('href', `data:text/plaincharset=utf-8,${text}`)
      element.setAttribute('download', 'text.txt')
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  function handleDrop(file: File) {
    const fileType = file.type
    const validExtensions = ['text/plain']
    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        const newInput = fileReader.result?.toString() || ''
        setInput(newInput)
        setSelectionEnd(newInput.length)
      }
      fileReader.readAsText(file)
    } else {
      alert('This is not a text file!')
    }
  }

  return(
    <div>
      <Upload handleDrop={handleDrop} />
      <Header handleDownload={handleDownload} handleModeChange={setMode} handleSizeChange={setPageSize} mode={mode} />
      <Input handleInput={handleInput} input={input} mode={mode} />
      <Cursor mode={mode} />
      <Pages input={input} selectionEnd={selectionEnd} mode={mode} pageSize={pageSize} />
    </div>
  )
}

export default App
