import React from 'react';
import Header from '../components/Header';
import Summary from '../components/Summary';


const Home = () => {
  return ( 
    <div>
      <h1>
        <Header />
      </h1>
      <Summary />
    </div>
  );
};

export default Home;