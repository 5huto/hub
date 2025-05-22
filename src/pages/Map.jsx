import React, {useState} from 'react'
import Header from '../components/Header';
import OsakaMap from '../components/OsakaMap';


const Map = () => {
  return (
    <div>
      <h1>
      <Header />
      </h1>
      Maps
      <OsakaMap />
    </div>
    
  )
}

export default Map