import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'


const Login = ({setShowLogin}) => {

  const {url,setToken}= useContext(StoreContext)

  const [currState,setCurrState] = useState("Login")
  const [data,setData]= useState({
    name:'',
    email:'',
    password:''
  })

   const onChangeHandler = (event)=>{
      const name= event.target.name;
      const value= event.target.value;
      setData(data=>({...data,[name]:value}))
   }

   const onLogin= async(event)=>{
        event.preventDefault()
        let newUrl = url + (currState === "Login" ? "/api/user/login" : "/api/user/register");

        try {
          const response = await axios.post(newUrl, data);
  
          if (response.data.success) {
              if (currState === 'Sign Up') {
                  // After successful sign-up, switch to Login mode
                  setCurrState("Login");
                  setData({ name: '', email: '', password: '' }); // Clear input fields
                  alert("Account created successfully! Please log in.");
              } else {
                  // For login, set token and close popup
                  setToken(response.data.token);
                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('isAdmin', response.data.isAdmin);
                  
                  if (response.data.isAdmin) {
                    window.location.href = "https://plant-website-admin.onrender.com";
                } else {
                    setShowLogin(false);
                }
              }
          } else {
              alert(response.data.message);
          }
      } catch (error) {
          console.error("Error:", error);
          alert("Something went wrong. Please try again.");
      }
  };

  
  return (
    <div className='login-popup'>
       <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==='Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name' required />}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currState==='Sign Up'?'Create account':'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState==='Login'
        ?<p>Create a new account? <span onClick={()=>setCurrState('Sign Up')}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState('Login')}>Login here</span></p>
        }
        
       
       </form>
    </div>
  )
}

export default Login