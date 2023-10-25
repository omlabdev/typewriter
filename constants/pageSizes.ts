import { PageDimensions } from '@/types/pageDimensions'

export const pageSizes: { [label: string]: PageDimensions } = {
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