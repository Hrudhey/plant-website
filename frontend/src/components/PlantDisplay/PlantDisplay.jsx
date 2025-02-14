import React, { useContext } from 'react'
import './PlantDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import PlantItem from '../PlantItem/PlantItem'


const PlantDisplay = ({category}) => {

   const {plant_list}= useContext(StoreContext)

  return (
    <div className='plant-display' id='plant-display'>
        <h2>Top Greeneries near you</h2>
        <div className="plant-display-list">
            {plant_list.map((item,index)=>{
                if (category==='All' || category===item.category){
                    return <PlantItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                }

              
            })}
        </div>


    </div>
  )
}

export default PlantDisplay