'use client'

import '../styles/papers.css'

import { ReactNode, useCallback, useEffect, useState } from 'react'

import Page from './Page'

import { Mode } from '@/types/mode'
import { PageSize } from '@/types/pageSize'
import { Dimensions } from '@/types/dimensions'
import { PageDimensions } from '@/types/pageDimensions'

const pageSizes: { [label: string]: PageDimensions } = {
  a4: {
    height: '297mm',
    width: '210mm',
    maxLines: 60,
    maxLineLength: 70,
  },
  ltr: {
    height: '8.5in',
    width: '11in',
    maxLines: 60,
    maxLineLength: 70,
  }
}
// Dimensions constants regarding the pages and font
const dimensions: Dimensions = {
  margin: '15px',
  padding: '15px',
  fontSize: '18px',
  fontWidth: 10.8,
}

function Pages({ selectionEnd, input, mode, pageSize }: { selectionEnd: number, input: string, mode: Mode, pageSize: PageSize }) {
  const [pages, setPages] = useState<ReactNode[]>([])
  const [styles, setStyles] = useState({})

  /**
   * Renders the text in the input element
   */
  const renderPages = useCallback(() => {
    const { height, width, maxLines, maxLineLength } = pageSizes[pageSize]
    // Marker used to keep track of the cursor's position
    const marker = '\0'
    // Current cursor position
    const cursorPosition = selectionEnd - 1
    // Character at the cursor's position
    let cursorPositionChar = input[cursorPosition] ? input[cursorPosition] : ''
    // String that will replace the character at the cursor position
    let replacement = marker
    // if the current character is a '\n' then we store it in the replacement string
    // and not in the cursorPositionChar
    if (cursorPositionChar === '\n') {
      replacement = `\n${marker}`
      cursorPositionChar = ''
    }
    // Replace the character at the current position with the replacement string and split the lines into an array
    const lines = `${input.substring(0, cursorPosition)}${replacement}${input.substring(cursorPosition + 1)}`.split('\n')
    // Get the ammount of line ends
    const lineEnds = lines.length
    // For each line, check to see if there's a "soft wrap" and find the position of the cursor
    let currentLine = 0
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i]
      // If the marker is at this line, mark this line as the current line
      if (line.indexOf(marker) > -1) {
        currentLine = i
      }
      // If the line length exceeds the maxLineLength const, split it into two lines
      if (line.length > maxLineLength) {
        lines[i] = line.slice(maxLineLength + 1)
        lines.splice(i, 0, line.substr(0, maxLineLength + 1))
        // If this index was the current line but it's not anymore then the current line
        // must be the one that was split from this one
        if ((currentLine === i) && (lines[i].indexOf(marker) === -1)) {
          currentLine = i + 1
        }
      }
      // Replace the marker with the original character
      lines[currentLine] = lines[currentLine].replace(marker, cursorPositionChar)
    }
    // Empty the papers element
    const pagesToRender = []
    // Print the lines for each page and keep track of the number of pages
    let totalPages = 0
    let linesToPrint = lines.slice()
    while (linesToPrint.length) {
      // Get the content of one page
      const pageLines = linesToPrint.splice(0, maxLines)
      // Create a new page
      const index = pagesToRender.length
      pagesToRender.push(<Page key={index} content={pageLines.join('\n')} dimensions={dimensions} pageDimensions={pageSizes[pageSize]} />)
      // Increment the total number of pages by one
      totalPages++
    }
    setPages(pagesToRender)
    // Get the current page at which the cursor is positioned right now
    const currentPage = Math.floor(currentLine / maxLines)
    // Truncate the lines array so we keep only the lines previous to the current one
    lines.length = currentLine
    // Current horizontal position is the cursor position minus the length of each previous line
    // plus a little space so the cursor doesn't cover up the characters
    const currentPosition = selectionEnd - lines.reduce((length, line) => length + line.length, 0) - currentLine + 0.5
    // Move the paper to the left based on the position on the current line
    const style: { right?: string, bottom?: string } = {}
    style.right = `calc(50% - ${width} + ${dimensions.padding} + ${currentPosition * dimensions.fontWidth}px)`
    // Move the paper up based on the current line and current page
    // Place it on the lower third of the screen
    let bottom = `calc(33.33% `
    // Move the pages down until the current one has its first line on the cursor
    bottom += `+ (${totalPages - currentPage} * (${dimensions.padding} - ${height})) `
    // If we're not on the last page we need to adjust for the spacing between pages
    // and the difference between the page's height and the lines height
    if (currentPage + 1 !== totalPages) {
      bottom += `- (${totalPages - currentPage - 1} * (${height} - (${maxLines} * ${dimensions.fontSize}) - ${dimensions.margin})) `
    }
    // Move the pages up the number of lines on the current page previous to the current line
    bottom += `+ (${lines.length - (currentPage * maxLines)} * ${dimensions.fontSize}))`
    style.bottom = bottom
    setStyles(style)
  }, [input, pageSize, selectionEnd])

  useEffect(() => {
    if (mode === 'read') {
      setStyles({ position: 'static' })
    } else {
      renderPages()
    }
  }, [renderPages, mode])

  return(
    <div className="js-papers papers" style={styles}>
      {pages}
    </div>
  )
}

export default Pages
