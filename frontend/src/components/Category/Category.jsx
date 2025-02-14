import React from 'react'
import './Category.css'
import { category_list } from '../../assets/assets'
const Category = ({category,setCategory}) => {

  return (
    <div className='category' id='category'>
        <h1>Explore our Plants</h1>
        <p className="category-text">Choose from a range of organised plants based on your preferences as we have the best collections</p>
        <div className="category-list">
            {category_list.map((item,index)=>{


                return(
                    <div onClick={()=>setCategory(prev=>prev===item.c_name?'All':item.c_name)}  // to set the state when we select
                     key={index} className="category-list-item">
                       <img className={category===item.c_name?'active':''} src={item.c_image} alt="" />
                       <p>{item.c_name}</p>
                    </div>
                )
            })}    
        </div> 
        <hr />
      
    </div>
  )
}

export default Category