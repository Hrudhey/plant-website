import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Category from '../../components/Category/Category'
import PlantDisplay from '../../components/PlantDisplay/PlantDisplay'

const Home = () => {
   const [category,setCategory] = useState('All')

  return (
    <div>
        <Header/>                                      {/*mounting the Header component in the home page */}
        <Category category={category} setCategory={setCategory}/>         {/* props */}
        <PlantDisplay category={category}/>
    </div>
  )
}

export default Home