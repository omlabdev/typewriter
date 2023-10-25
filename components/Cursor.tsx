import '../styles/cursor.css'

import { Mode } from '@/types/mode'

function Cursor({ mode }: { mode: Mode }) {

  if (mode === 'read') return(null)

  return(
    <div className="cursor-wrapper">
      <span className="cursor"></span>
    </div>
  )
}

export default Cursor
