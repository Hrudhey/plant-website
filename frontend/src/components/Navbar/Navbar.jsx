
import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

      const [menu,setMenu]= useState("Home");

      const {getTotalCartAmount,token,setToken}= useContext(StoreContext);

      const navigate= useNavigate();
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      const logout= ()=>{
         localStorage.removeItem('token');
         localStorage.removeItem("isAdmin");
         setToken('');
         navigate('/')
      }

  return (
    <div className='navbar'>
     <Link to='/'><img src={assets.logo} alt="lg" className='logo' /></Link>
     {!isAdmin && (
     <ul className="navbarlist">
      <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
      <a href='#category' onClick={()=>setMenu("Category")} className={menu==="Category"?"active":""}>Category</a>
      <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</a>
     </ul>
      )}
     <div className="navbar-right">
      
       <div className="navbar-search-icon">
        <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
        <div className={getTotalCartAmount()===0?'':'dot'}></div>
       </div>

       {!token? (
          <button onClick={()=>setShowLogin(true) }>sign in</button>
       ) : (
         <div className='navbar-profile'>
           <img src={assets.profile_icon} alt="" />
           <ul className='nav-profile-dropdown'>
           {!isAdmin && (
            <>
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr />
            </>
             )}
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
           </ul>
        </div>
        )}
       
     </div>
    </div>
  )
}

// Defining Prop Types
Navbar.PropTypes = {
   setShowLogin: PropTypes.func
};

export default Navbar