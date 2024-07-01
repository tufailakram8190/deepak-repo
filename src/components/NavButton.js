import React from 'react'
import { Link } from 'react-router-dom'

const NavButton = () => {
  return (
<div>

      
<div style={{ display: 'flex', gap: '10px', marginTop: '15px',marginBottom:'15px' }}>

  <Link to="/" style={{ textDecoration: 'none' }}>
    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to MTSVQ</button>
  </Link>


  <Link to="/swc" style={{ textDecoration: 'none' }}>
    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Go to SWC</button>
  </Link>
</div>
</div>
  )
}

export default NavButton