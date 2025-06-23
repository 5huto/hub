import React from 'react'
import Header from '../components/Header';
import AllMap from '../components/AllMap';


const Map = () => {
  return (
    <div>
      <h1>
      <Header />
      </h1>
      <AllMap />
      {/* 全てピンの表示などのオプションを追加したい。 */}
    </div>
    
  )
}

export default Map