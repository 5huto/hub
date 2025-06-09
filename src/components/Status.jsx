import React, { useState } from "react";
import useNavigate from 'react-router-dom'
import '../components/Status.css';


// 仮データ
const user = [
  { id: 1, location: "大阪市北区", BicNum: "100", RepHum: "山田", RepTim: "2025-05-26-10:30:00" },
  { id: 2, location: "大阪市北区", BicNum: "85", RepHum: "佐藤", RepTim: "2025-05-28-08:15:00" },
  { id: 3, location: "大阪市北区", BicNum: "45", RepHum: "田中", RepTim: "2025-05-27-17:45:00" },
  { id: 4, location: "大阪市北区", BicNum: "120", RepHum: "鈴木", RepTim: "2025-05-25-13:20:00" },
  { id: 5, location: "大阪市北区", BicNum: "30", RepHum: "高橋", RepTim: "2025-05-29-09:05:00" },
  { id: 6, location: "大阪市北区", BicNum: "70", RepHum: "伊藤", RepTim: "2025-05-28-14:10:00" },
  { id: 7, location: "大阪市北区", BicNum: "55", RepHum: "渡辺", RepTim: "2025-05-27-12:25:00" },
  { id: 8, location: "大阪市北区", BicNum: "90", RepHum: "中村", RepTim: "2025-05-26-15:50:00" },
  { id: 9, location: "大阪市北区", BicNum: "60", RepHum: "小林", RepTim: "2025-05-25-11:40:00" },
  { id: 10, location: "大阪市北区", BicNum: "110", RepHum: "加藤", RepTim: "2025-05-24-16:00:00" },
  { id: 11, location: "大阪市北区", BicNum: "40", RepHum: "吉田", RepTim: "2025-05-23-09:30:00" },
  { id: 12, location: "大阪市北区", BicNum: "95", RepHum: "山本", RepTim: "2025-05-29-08:00:00" },
  { id: 13, location: "大阪市北区", BicNum: "35", RepHum: "井上", RepTim: "2025-05-28-10:50:00" },
  { id: 14, location: "大阪市北区", BicNum: "75", RepHum: "木村", RepTim: "2025-05-27-19:15:00" },
  { id: 15, location: "大阪市北区", BicNum: "105", RepHum: "清水", RepTim: "2025-05-26-07:05:00" },
  { id: 16, location: "大阪市北区", BicNum: "50", RepHum: "林", RepTim: "2025-05-25-18:45:00" },
  { id: 17, location: "大阪市北区", BicNum: "65", RepHum: "斎藤", RepTim: "2025-05-24-13:10:00" },
  { id: 18, location: "大阪市北区", BicNum: "80", RepHum: "松本", RepTim: "2025-05-23-17:55:00" },
  { id: 19, location: "大阪市北区", BicNum: "25", RepHum: "原田", RepTim: "2025-05-22-16:20:00" },
  { id: 20, location: "大阪市北区", BicNum: "115", RepHum: "大野", RepTim: "2025-05-21-11:35:00" }
];



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

// メインコンポーネント
const Status = () => {
  const sel = ["未処理", "警告", "撤去完了", "自転車無し"];

  // ID別の状態をオブジェクトで管理
  const [txtMap, setTxtMap] = useState(() => {
    const initial = {};
    user.forEach(u => { initial[u.id] = sel[0]; });
    return initial;
  });

  // 状態更新処理
  const handleChange = (id, value) => {
    setTxtMap(prev => ({
      ...prev,
      [id]: value
    }));
  };

  //画面遷移の処理
  // const navigate = useNavigate()
  // const onClick = () => {
    
  // }

  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6">
      <div style={styles.container}>
        <div style={styles.form}>
          {user.map((item) => (
            <div
              key={item.id}
              className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-md p-6"
            >
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
              <div className="info-row">
                <span className="info-item">場所：{item.location}</span>
                <span className="info-item">台数：{item.BicNum}</span>
                <span className="info-item">報告者：{item.RepHum}</span>
                <span className="info-item">送信日時：{item.RepTim.replace(/-/g, "/")}</span>
                <span className="info-item">経過：{getElapsedTime(item.RepTim)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Status;
