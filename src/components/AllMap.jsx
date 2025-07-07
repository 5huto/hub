import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getURL } from '../data/URL';

// 台数に応じて色付きマーカーを返す
const getMarkerIcon = (bicNum) => {
  let color = 'blue';
  if (bicNum <= 1) color = 'blue';
  else if (bicNum <= 3) color = 'green';
  else if (bicNum <= 6) color = 'yellow';
  else if (bicNum <= 10) color = 'orange';
  else color = 'red';

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const AllMap = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState("");

  const center = [34.699228, 135.494274];

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

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <MapContainer center={center} zoom={16} scrollWheelZoom={true} style={{ height: '700px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {reportData.map((item) => (
          <Marker
            key={item.report_id}
            position={[Number(item.latitude), Number(item.longitude)]}
            icon={getMarkerIcon(Number(item.number))}
          >
            <Popup>
              通報者: {item.user_name}<br />
              台数: {item.number}<br />
              ステータス: {item.status_name}<br />
              通報日時: {new Date(item.created_at).toLocaleString()}<br />
              住所: {item.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AllMap;
