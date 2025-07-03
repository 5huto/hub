// App.js（修正版）
import React, {useEffect, useState} from 'react';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import Report from './pages/Report'
import Map from './pages/Map';
import Osaka from './pages/Osaka';
import {userData} from './data/userData';
import Status from './components/Status';
import AllMap from './components/AllMap';


function App() {
  //これはこのローカルでの仮データなので消す
  <>
  <Status user={userData} />
  <AllMap user={userData} />
  </>

  return (
    <div>
      {/* <h1>
        <Header/>
      </h1> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/rep" element={<Report />}/>
        <Route path="/map" element={<Map />}/>
        <Route path="/osaka" element={<Osaka />}/>
        
      </Routes>
    </div>
  );
}

export default App;