import React from 'react'
import { useState } from 'react'

export default function ComponentReact() {
  const [count, setcount] = useState(false);
  const onclick = () => {
    setcount(false)
  }
  return (
    <div>
      {!count && <p>State not changed</p>}
      {count && <p>State changed</p>}
      <button onClick={onclick}>Submit</button>
    </div>
  )
}
