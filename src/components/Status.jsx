import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../components/Status.css';
import { getURL } from '../data/URL';

const Status = () => {
  const [apiBase, setApiBase] = useState("");
  const [reports, setReports] = useState([]);
  const [txtMap, setTxtMap] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ステータス選択肢（表示名とサーバー送信用ID）
  const statusOptions = [
    { id: 1, name: "未処理" },
    { id: 2, name: "撤去完了" },
    { id: 3, name: "自転車無し" }
  ];

  // 時間差を日本語で表示
  const getElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMin = Math.floor((now - created) / 60000);
    if (diffMin < 1) return "1分未満";
    if (diffMin < 60) return `${diffMin}分前`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `${diffH}時間前`;
    return `${Math.floor(diffH / 24)}日前`;
  };

  // セレクト変更時に呼び出される関数
  const handleChange = async (reportId, newStatusName) => {
    // 表示用の状態を先に更新
    setTxtMap(prev => ({ ...prev, [reportId]: newStatusName }));

    const statusEntry = statusOptions.find(opt => opt.name === newStatusName);
    if (!statusEntry) {
      alert("不正なステータスです");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("report_id", reportId);             // ← UUID
      formData.append("new_status_id", statusEntry.id);   // ← 整数ID

      const res = await fetch(`${apiBase}/update_status`, {
        method: "POST",
        body: formData,
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      if (!res.ok) throw new Error(`サーバーエラー (${res.status})`);
      const result = await res.json();
      console.log("更新成功:", result);
    } catch (err) {
      console.error("更新失敗:", err);
      alert("ステータスの更新に失敗しました。");
    }
  };

  // 地図に遷移
  const handleMapClick = (lat, lng) => {
    navigate(`/osaka?location=${lat},${lng}`);
  };

  // 初回データ取得
  useEffect(() => {
    const initialize = async () => {
      try {
        const url = await getURL();
        const base = url.replace(/\/+$/, "").replace(/^\/+/, "");
        setApiBase(base);

        const res = await fetch(`${base}/reports_info`, {
          headers: { "ngrok-skip-browser-warning": "true" }
        });

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data ?? [];

        setReports(list);

        // 初期ステータス設定：report_id をキーに保存
        const initTxtMap = {};
        list.forEach(item => {
          initTxtMap[item.report_id] = item.status_name || statusOptions[0].name;
        });
        setTxtMap(initTxtMap);
      } catch (err) {
        setError("データ取得に失敗しました: " + err.message);
      }
    };

    initialize();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 py-6 space-y-6">
      {error && <div className="text-red-500">{error}</div>}
      <div className="w-full max-w-2xl space-y-4">
        {reports.map((item) => (
          <div
            key={item.report_id}
            className="w-full max-w-md bg-white border border-gray-300 rounded-2xl shadow-md p-6"
          >
            <div className="info-row">
              {/* ステータス選択 */}
              <select
                value={txtMap[item.report_id] ?? statusOptions[0].name}
                onChange={(e) => handleChange(item.report_id, e.target.value)}
                className="mb-2 p-2 border border-gray-300 rounded"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.id} value={opt.name}>
                    {opt.id}.{opt.name}
                  </option>
                ))}
              </select>

              {/* 通報情報表示 */}
              <p className="info-item">住所：{item.address ?? "—"}</p>
              <p className="info-item">台数：{item.number ?? "—"}</p>
              <p className="info-item">報告者：{item.user_name ?? "—"}</p>
              <p className="info-item">送信日時：{new Date(item.created_at).toLocaleString()}</p>
              <p className="info-item">経過：{getElapsedTime(item.created_at)}</p>

              {/* 地図遷移ボタン */}
              <button
                onClick={() => handleMapClick(item.latitude, item.longitude)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                マップ詳細を見る
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Status;