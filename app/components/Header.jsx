"use client"

import '../styles/header.css'

import React from 'react'

function Header({ handleDownload, handleModeChange, handleSizeChange, mode }) {
  const [sizeDropdown, setSizeDropdown] = React.useState(false)

  function toggleSizeDropdown() {
    setSizeDropdown(currentSizeDropdown => !currentSizeDropdown)
  }

  let modeChangeBtn
  if (mode === 'read') {
    modeChangeBtn = (
      <button type="button" className="header-btn" onClick={() => handleModeChange('write')}>
        <img className="header-icon" src="/icons/write.svg" alt="Write mode" />
      </button>
    )
  } else {
    modeChangeBtn = (
      <button type="button" className="header-btn" onClick={() => handleModeChange('read')}>
        <img className="header-icon" src="/icons/read.svg" alt="Read mode" />
      </button>
    )
  }

  let sizeDropdownElement = null
  if (sizeDropdown) {
    sizeDropdownElement = (
      <div className="header-dropdown">
        <button type="button" className="header-btn" onClick={() => handleSizeChange('a4')}>
          <img className="header-icon" src="/icons/page-a4.svg" alt="Page size A4" />
        </button>
        <button type="button" className="header-btn" onClick={() => handleSizeChange('ltr')}>
          <img className="header-icon" src="/icons/page-ltr.svg" alt="Page size LTR" />
        </button>
      </div>
    )
  }

  const sizeSelector = (
    <li className="header-list__item">
      <button type="button" className="header-btn" onClick={toggleSizeDropdown}>
        <img className="header-icon" src="/icons/size.svg" alt="Page size" />
      </button>
      {sizeDropdownElement}
    </li>
  )

  return(
    <header className="header">
      <h1 className="header-title">
        Pseudonimus
      </h1>
      <ul className="header-list ms-auto">
        <li className="header-list__item">
          {modeChangeBtn}
        </li>
        <li className="header-list__item">
          <button type="button" className="header-btn" onClick={handleDownload}>
            <img className="header-icon" src="/icons/download.svg" alt="Download" />
          </button>
        </li>
      </ul>
    </header>
  )
}

export default Header
