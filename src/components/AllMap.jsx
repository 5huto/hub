import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { userData } from '../data/userData';

// しずく型アイコン（色付き）を台数に応じて返す
const getMarkerIcon = (bicNum) => {
  let color = 'blue'; // デフォルト
  if (bicNum <= 10) color = 'blue';
  else if (bicNum <= 30) color = 'green';
  else if (bicNum <= 50) color = 'yellow';
  else if (bicNum <= 100) color = 'orange';
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
  const center = [34.699228, 135.494274];

  return (
    <MapContainer center={center} zoom={16} scrollWheelZoom={true} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {userData.map((item) => (
        <Marker
          key={item.id}
          position={[item.Locx, item.Locy]}
          icon={getMarkerIcon(Number(item.BicNum))}
        >
          <Popup>
            通報者: {item.RepHum}<br />
            台数: {item.BicNum}<br />
            通報日時: {item.RepTim.replace(/-/g, '/')}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default AllMap;
