// ホーム画面(Summary.jsx)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getURL } from '../data/URL';

const Summary = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const url = await getURL();
        const base = url.replace(/\/+$/, "").replace(/^\/+/, "");

        const res = await fetch(`${base}/reports_info`, {
          headers: { "ngrok-skip-browser-warning": "true" },
        });

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data ?? [];
        setReportData(list);
      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("通報データの取得に失敗しました。");
      }
    };

    fetchReports();
  }, []);

  // 放置台数が多い順に並び替えて上位3件を取得
  const topItems = [...reportData]
    .sort((a, b) => Number(b.number) - Number(a.number))
    .slice(0, 3);

  // 最新の通報（日時が最も新しい）
  const latestItem = [...reportData]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

  // 1週間以内の通報をフィルタ
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentWeekReports = reportData.filter(item => new Date(item.created_at) >= oneWeekAgo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-6 py-12">
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <p className="text-lg text-gray-800 max-w-xl mb-8 leading-relaxed font-semibold bg-white/60 p-4 rounded-2xl shadow">
          地域の放置自転車をみんなで解決しよう！<br />
          通報情報を確認したり、マップで場所をチェックできます
        </p>

        {error && <div className="text-red-500">{error}</div>}

        {/* 直近一週間の通報件数 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">直近一週間の通報件数</h2>
          <span className="font-bold">{recentWeekReports.length} 件（ここ1週間）</span>
        </div>

        {/* 最新の通報 */}
        {latestItem && (
          <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
            <h2 className="text-xl font-bold text-indigo-600 mb-2">最新の通報内容</h2>
            <p className="text-gray-700">
              {new Date(latestItem.created_at).toLocaleString()} に <span className="font-bold">{latestItem.user_name}</span> さんから {latestItem.number} 台の通報
            </p>
          </div>
        )}

        {/* 一週間の通報内容 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-green-600 mb-2">ここ1週間の通報内容</h2>
          {recentWeekReports.length > 0 ? (
            recentWeekReports.map(item => (
              <p key={item.report_id} className="text-gray-700">
                {new Date(item.created_at).toLocaleString()}：{item.user_name}さん（{item.number}台）
              </p>
            ))
          ) : (
            <p className="text-gray-700">通報はありません</p>
          )}
        </div>

        {/* 放置台数 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-red-500 mb-4">放置台数ランキング（上位3件）</h2>
          {topItems.map((item, index) => (
            <p key={item.report_id} className="text-gray-700">
              {index + 1}位: <span className="font-bold">{item.number} 台</span>（{item.user_name}さんによる通報）
            </p>
          ))}
        </div>

        {/* 画面遷移ボタン */}
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate('/rep')}
            className="bg-pink-400 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transform transition hover:scale-105 hover:bg-pink-500"
          >
            📋 通報内容一覧を見る
          </button>

          <button
            onClick={() => navigate('/map')}
            className="bg-blue-400 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg transform transition hover:scale-105 hover:bg-blue-500"
          >
            🗺️ マップで確認する
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
