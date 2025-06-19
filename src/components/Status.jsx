import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Status.css';
import 'leaflet/dist/leaflet.css';

// 仮データ
const user = [
  { id: 1, Locx: 34.698963, Locy: 135.493706, BicNum: "100", RepHum: "山田", RepTim: "2025-05-26-10:30:00" },
  { id: 2, Locx: 34.698894, Locy: 135.493645, BicNum: "85", RepHum: "佐藤", RepTim: "2025-05-28-08:15:00" },
  { id: 3, Locx: 34.699228, Locy: 135.494274, BicNum: "45", RepHum: "田中", RepTim: "2025-05-27-17:45:00" },
  { id: 4, Locx: 34.699335, Locy: 135.494696, BicNum: "120", RepHum: "鈴木", RepTim: "2025-05-25-13:20:00" },
  { id: 5, Locx: 34.700255, Locy: 135.492609, BicNum: "30", RepHum: "高橋", RepTim: "2025-05-29-09:05:00" },
  { id: 6, Locx: 34.700110, Locy: 135.493308, BicNum: "70", RepHum: "伊藤", RepTim: "2025-05-28-14:10:00" },
  { id: 7, Locx: 34.698421, Locy: 135.493392, BicNum: "55", RepHum: "渡辺", RepTim: "2025-05-27-12:25:00" },
  { id: 8, Locx: 34.699862, Locy: 135.496510, BicNum: "90", RepHum: "中村", RepTim: "2025-05-26-15:50:00" },
  { id: 9, Locx: 34.700039, Locy: 135.496528, BicNum: "60", RepHum: "小林", RepTim: "2025-05-25-11:40:00" },
  { id: 10, Locx: 34.699535, Locy: 135.496512, BicNum: "110", RepHum: "加藤", RepTim: "2025-05-24-16:00:00" },
];

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

  useEffect(() => {
    user.forEach(async (item) => {
      const address = await fetchAddressFromCoords(item.Locx, item.Locy);
      setAddressMap(prev => ({ ...prev, [item.id]: address }));
    });
  }, []);

  const handleChange = (id, value) => {
    setTxtMap(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleMapClick = (location) => {
    navigate(`/map?location=${encodeURIComponent(location)}`);
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
