"use client"

import '../styles/upload.css'

import React from 'react'

function Upload({ handleDrop }) {
  const [display, setDisplay] = React.useState(false)

  if (typeof window === 'object') {
    const dropZoneElement = document.body

    dropZoneElement.addEventListener('dragover', (event) => {
      event.preventDefault()
      setDisplay(true)
    })

    dropZoneElement.addEventListener('dragleave', (event) => {
      event.preventDefault()
      setDisplay(false)
    })

    dropZoneElement.addEventListener('drop', (event) => {
      event.preventDefault()
      setDisplay(false)
      handleDrop(event.dataTransfer.files[0])
    });
  }

  return(
    <div id="upload" className={`upload ${display ? '' : 'upload--hide'}`}>
      <img className="upload-icon" src="/icons/upload.svg" alt="Upload" />
      <span className="upload-text">
        Upload text file
      </span>
    </div>
  )
}

export default Upload
