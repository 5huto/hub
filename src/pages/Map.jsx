import React from 'react'
import Header from '../components/Header';
import OsakaMap from '../components/OsakaMap';


const Map = () => {
  return (
    <div>
      <h1>
      <Header />
      </h1>
      <OsakaMap />
      {/* 全てピンの表示などのオプションを追加したい。 */}
    </div>
    
  )
}

export default Map