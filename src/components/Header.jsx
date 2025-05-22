import React, { useState } from 'react';
import Home from '../pages/Home';
import { NavLink, useNavigate } from "react-router-dom"


export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

     const navigate = useNavigate();
    
    //メニューラベルをタップ
    const handleMenuItemClick = (path) => {
      navigate(path)
    };
    //nameとpathの辞書型
    const MenuItems =[
      {
        name: 'ホーム',
        path: '/home'
      },
      {
        name: '通報内容',
        path: '/rep'
      },
      {
        name: 'マップ',
        path: '/map'
      },
      {
        name: 'log out',
        path: '/'
      }
    ]

    return(
        <header style={{
            width: '100%',
            // maxWidth: '412px',
            margin: '0 auto',
            borderBottom: '1px solid #000',
            position: 'relative',
            backgroundColor: '#fff',
        }}>
            {/*メニュー画像ボタン*/}
            <div
            style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                cursor: 'pointer',
                fontSize: '30px',
            }}
            onClick={toggleMenu}
            >
                ☰
            </div>
            {/*タイトル*/}
            <div style={{textAlign: 'center', padding: '16px 0'}}>
                <h1 style={{
                    fontFamily: 'sans-serif',
                    fontSize: '24px',
                    fontWeight: 400,
                    marginBottom: '4px'
                }}> HUB </h1>
            </div>
            {/*メニュー*/}
            {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#666666',
          zIndex: 999,
          fontFamily: 'Inter, sans-serif',
          color: '#fff',
        }}>
          {/* 閉じるボタン */}
          <div onClick={toggleMenu} style={{
            position: 'absolute',
            top: '32px',
            right: '20px',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
          }}>
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '2px',
              width: '36px',
              borderTop: '2px solid #FFFFFF',
              transform: 'rotate(45deg)'
            }} />
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '2px',
              width: '36px',
              borderTop: '2px solid #FFFFFF',
              transform: 'rotate(-45deg)'
            }} />
          </div>

          {/* メニュータイトル */}
          <div style={{
            marginTop: '60px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 400,
          }}>
            メニュー
          </div>

          {/* メニュー項目リスト */}
          <div style={{
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px'
          }}>
            {/*画面遷移*/}
            {MenuItems.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '15px',
                    lineHeight: '18px',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleMenuItemClick(item.path)}
                >
                  {item.name}
                </div>
                <hr style={{ width: '100%', borderColor: '#FFFFFF', margin: '8px 0' }} />
              </div>
            ))}
          </div>
        </div>
      )}
        </header>
    )

}