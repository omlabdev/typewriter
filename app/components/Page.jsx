"use client"

import '../styles/paper.css'

import React from 'react'

function Page({ dimensions, pageDimensions, content }) {
  const styles = {
    height: pageDimensions.height,
    width: pageDimensions.width,
    fontSize: dimensions.fontSize,
    padding: dimensions.padding,
    marginBottom: dimensions.margin,
  }

  return(
    <div className="paper" style={styles}>
      {content}
    </div>
  )
}

export default Page
