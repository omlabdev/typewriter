'use client'

import '../styles/upload.css'

import Image from 'next/image'

import { useState } from 'react'

import UploadIcon from '../public/icons/upload.svg'

function Upload({ handleDrop }: { handleDrop: (file: File) => void }) {
  const [display, setDisplay] = useState(false)

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
      if (event.dataTransfer) handleDrop(event.dataTransfer.files[0])
    });
  }

  return(
    <div id="upload" className={`upload ${display ? '' : 'upload--hide'}`}>
      <Image className="upload-icon" src={UploadIcon} alt="Upload" />
      <span className="upload-text">
        Upload text file
      </span>
    </div>
  )
}

export default Upload
