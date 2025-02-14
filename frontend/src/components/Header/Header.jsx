import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your <span style={{"color":"rgb(233, 100, 100)"}}>
              <span className='sfav'>favourite</span> plants here</span></h2>
            <p>Step into a world where every plant tells a story and every bloom is a testament to nature&apos;s brilliance. 
                Our collection is handpicked to suit every plantlover&apos;s dream, from seasoned gardeners to enthusiastic beginners.Create your own green oasis, right at home.</p>
            <button>View Product</button>    
        </div>

    </div>
  )
}

export default Header