'use client'

import '../styles/paper.css'

import { Dimensions } from '@/types/dimensions'
import { PageDimensions } from '@/types/pageDimensions'

function Page({ dimensions, pageDimensions, content }: { dimensions: Dimensions, pageDimensions: PageDimensions, content: string }) {
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
