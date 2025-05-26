import React from 'react'
import Header from '../components/Header';
import Status from '../components/Status';

const Report = () => {
  return (
    <div>
      <h1>
        <Header />
      </h1>
      Status,大体の場所,写真,台数,報告者情報,報告日時・経過日時
      <Status />
    </div>
  )
}

export default Report