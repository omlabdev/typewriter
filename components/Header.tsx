'use client'

import '../styles/header.css'

import Image from 'next/image'

import { useState } from 'react'

import { Mode } from '@/types/mode'
import { PageSize } from '@/types/pageSize'

import writeIcon from '../public/icons/write.svg'
import readIcon from '../public/icons/read.svg'
import pageA4Icon from '../public/icons/page-a4.svg'
import pageLtrIcon from '../public/icons/page-ltr.svg'
import sizeIcon from '../public/icons/size.svg'
import downloadIcon from '../public/icons/download.svg'

function Header({ handleDownload, handleModeChange, handleSizeChange, mode }: { handleDownload: () => void, handleModeChange: (mode: Mode) => void, handleSizeChange: (size: PageSize) => void, mode: Mode }) {
  const [sizeDropdown, setSizeDropdown] = useState(false)

  function toggleSizeDropdown() {
    setSizeDropdown(currentSizeDropdown => !currentSizeDropdown)
  }

  let modeChangeBtn
  if (mode === 'read') {
    modeChangeBtn = (
      <button type="button" className="header-btn" onClick={() => handleModeChange('write')}>
        <Image className="header-icon" src={writeIcon} alt="Write mode" />
      </button>
    )
  } else {
    modeChangeBtn = (
      <button type="button" className="header-btn" onClick={() => handleModeChange('read')}>
        <Image className="header-icon" src={readIcon} alt="Read mode" />
      </button>
    )
  }

  let sizeDropdownElement = null
  if (sizeDropdown) {
    sizeDropdownElement = (
      <div className="header-dropdown">
        <button type="button" className="header-btn" onClick={() => handleSizeChange('a4')}>
          <Image className="header-icon" src={pageA4Icon} alt="Page size A4" />
        </button>
        <button type="button" className="header-btn" onClick={() => handleSizeChange('ltr')}>
          <Image className="header-icon" src={pageLtrIcon} alt="Page size LTR" />
        </button>
      </div>
    )
  }

  const sizeSelector = (
    <li className="header-list__item">
      <button type="button" className="header-btn" onClick={toggleSizeDropdown}>
        <Image className="header-icon" src={sizeIcon} alt="Page size" />
      </button>
      {sizeDropdownElement}
    </li>
  )

  return(
    <header className="header">
      <h1 className="header-title">
        Typewriter
      </h1>
      <ul className="header-list ms-auto">
        <li className="header-list__item">
          {modeChangeBtn}
        </li>
        <li className="header-list__item">
          <button type="button" className="header-btn" onClick={handleDownload}>
            <Image className="header-icon" src={downloadIcon} alt="Download" />
          </button>
        </li>
      </ul>
    </header>
  )
}

export default Header
