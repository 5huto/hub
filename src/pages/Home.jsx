// ホーム画面(Home.jsx)
import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { userData } from '../data/userData';

const Home = () => {
  const navigate = useNavigate();

  // 放置台数が多い順に並び替えて上位3件を取得
  const topItems = [...userData]
    .sort((a, b) => Number(b.BicNum) - Number(a.BicNum))
    .slice(0, 3);

  // 最新の通報（日時が最も新しい）
  const latestItem = [...userData].sort((a, b) => new Date(b.RepTim.replace(/-/g, '/')) - new Date(a.RepTim.replace(/-/g, '/')))[0];

  // 1週間以内の通報をフィルタ
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentWeekReports = userData.filter(item => new Date(item.RepTim.replace(/-/g, '/')) >= oneWeekAgo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 px-6 py-12">
      <Header />
      <div className="flex flex-col items-center justify-center text-center mt-8">
        <p className="text-lg text-gray-800 max-w-xl mb-8 leading-relaxed font-semibold bg-white/60 p-4 rounded-2xl shadow">
          地域の放置自転車をみんなで解決しよう！<br />
          通報情報を確認したり、マップで場所をチェックできます
        </p>

        {/* 直近一週間の通報件数 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">直近一週間の通報件数</h2>
          <span className="font-bold">{recentWeekReports.length} 件（ここ1週間）</span>
        </div>

        {/* 最新の通報 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-indigo-600 mb-2">最新の通報内容</h2>
          <p className="text-gray-700">
            {latestItem.RepTim.replace(/-/g, '/')} に <span className="font-bold">{latestItem.RepHum}</span> さんから {latestItem.BicNum} 台の通報
          </p>
        </div>
        
        {/* 一週間の通報内容 */}
        <div className="mb-8 bg-white/70 p-4 rounded-xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold text-green-600 mb-2">ここ1週間の通報内容</h2>
          {recentWeekReports.length > 0 ? (
            recentWeekReports.map(item => (
              <p key={item.id} className="text-gray-700">
                {item.RepTim.replace(/-/g, '/')}：{item.RepHum}さん（{item.BicNum}台）
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
            <p key={item.id} className="text-gray-700">
              {index + 1}位: <span className="font-bold">{item.BicNum} 台</span>（{item.RepHum}さんによる通報）
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

export default Home;