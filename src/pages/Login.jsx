import React from 'react'
import ID from '../components/ID'
import Pass from '../components/Pass'
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center', // 横中央
    alignItems: 'center',     // 縦中央
    height: '100vh',          // 画面全体を占める
  },
  form: {
    display: 'flex',
    flexDirection: 'column', // 縦並び
    gap: '10px',              // 要素間の間隔
    alignItems: 'center',     // 子要素を中央に揃える
  },
};


const Login = () => {
  const [id, setId] = React.useState('');
  const [pass, setPass] = React.useState('');
  const navigate = useNavigate();
  //ボタンを押したときの動作
  const handleLogin = () => {
    // 認証処理（ここでは仮にログを出力）
    if (id === 'iputosaka' && pass === '0206') {
      //ここにHomeに画面遷移するpathを入れたい。
      // alert('ログイン成功！');
      navigate('/home');
    }else{
    alert('IDまたはパスワードが違います。'); 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        HUB
        <ID label="ID" value={id} onChange={(e) => setId(e.target.value)} />
      {/* <ID label="ID"/> */}
      <Pass label="Pass" value={pass} onChange={(e) => setPass(e.target.value)} />
      {/* <Pass label="Pass"/> */}
      <button onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  )
}

export default Login