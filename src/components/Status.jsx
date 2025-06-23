import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Status.css';
import 'leaflet/dist/leaflet.css';
import {userData} from '../data/userData'

// 仮データ
const user = userData;

// 住所取得関数
const fetchAddressFromCoords = async (lat, lon) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
  const data = await response.json();
  const addr = data.address;

  // 順序：都道府県 → 市区町村 → 区 → 町（丁目）
  const prefecture = addr.state || "";
  const city = addr.city || addr.county || "";
  const ward = addr.suburb || addr.city_district || "";
  const town = addr.road || addr.neighbourhood || addr.village || "";

  return `${prefecture}${city}${ward}${town}` || "住所不明";
};


// 経過時間を計算する関数
const getElapsedTime = (repTime) => {
  const now = new Date();
  const sent = new Date(repTime.replace(/-/g, "/")); // Safari対応
  const diffMs = now - sent;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay > 0) return `${diffDay}日前`;
  if (diffHr > 0) return `${diffHr}時間前`;
  if (diffMin > 0) return `${diffMin}分前`;
  return `${diffSec}秒前`;
};

// スタイル定義
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
  },
};

const Status = () => {
  const sel = ["未処理", "警告", "撤去完了", "自転車無し"];
  const navigate = useNavigate();

  const [txtMap, setTxtMap] = useState(() => {
    const initial = {};
    user.forEach(u => { initial[u.id] = sel[0]; });
    return initial;
  });

  const [addressMap, setAddressMap] = useState({});

  // useEffect(() => {
  //   user.forEach(async (item) => {
  //     const address = await fetchAddressFromCoords(item.Locx, item.Locy);
  //     setAddressMap(prev => ({ ...prev, [item.id]: address }));
  //   });
  // }, []);
  useEffect(() => {
  const fetchSequentially = async () => {
    for (let i = 0; i < user.length; i++) {
      const item = user[i];
      try {
        const address = await fetchAddressFromCoords(item.Locx, item.Locy);
        setAddressMap(prev => ({ ...prev, [item.id]: address }));
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待つ
      } catch (err) {
        console.error(`住所取得失敗: ID=${item.id}`, err);
        setAddressMap(prev => ({ ...prev, [item.id]: "取得失敗" }));
      }
    }
  };
  fetchSequentially();
}, []);


  const handleChange = (id, value) => {
    setTxtMap(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleMapClick = (location) => {
    navigate(`/osaka?location=${encodeURIComponent(location)}`);
  };

  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6">
      <div style={styles.container}>
        <div style={styles.form}>
          {user.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-md p-6"
            >
              <div className="info-row">
                <select
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  value={txtMap[item.id]}
                >
                  {sel.map((data, index) => (
                    <option key={index} value={data}>
                      {index + 1}.{data}
                    </option>
                  ))}
                </select>
                <span className="info-item">住所：{addressMap[item.id] || "取得中..."}</span>
                <span className="info-item">台数：{item.BicNum}</span>
                <span className="info-item">報告者：{item.RepHum}</span>
                <span className="info-item">送信日時：{item.RepTim.replace(/-/g, "/")}</span>
                <span className="info-item">経過：{getElapsedTime(item.RepTim)}</span>
                <button
                  onClick={() => handleMapClick(`${item.Locx},${item.Locy}`)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  マップ詳細を見る
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
