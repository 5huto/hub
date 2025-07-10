import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation } from 'react-router-dom';

// マーカーの画像（デフォルトの表示崩れを修正）
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// 中心を動的に変更するコンポーネント
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const OsakaMap = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locationParam = queryParams.get('location'); // 例: "34.699228,135.494274"

  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (locationParam) {
      const [x, y] = locationParam.split(',').map(Number);
      if (!isNaN(x) && !isNaN(y)) {
        setPosition([x, y]);
      }
    }
  }, [locationParam]);

  if (!position) {
    return <div>座標が無効か、URLに含まれていません。</div>;
  }

  return (
    <div>
      <MapContainer
        center={position}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: '700px', width: '100%' }}
      >
        <ChangeMapCenter center={position} />
        <TileLayer
          attribution='&copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>ここが報告場所</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OsakaMap;