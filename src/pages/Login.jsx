import React from 'react'
import ID from '../components/ID'
import Pass from '../components/Pass'
import { useNavigate } from 'react-router-dom';
import { getURL } from '../data/URL';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  }
};

const Login = () => {
  const [id, setId] = React.useState('');
  const [pass, setPass] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const url = await getURL();
      const base = url.replace(/\/+$/, '').replace(/^\/+/, '');

      const formData = new FormData();
      formData.append("email", id);
      formData.append("password", pass);

      const res = await fetch(`${base}/login_customer`, {
        method: 'POST',
        body: formData,
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.detail || "ログインに失敗しました。");
        return;
      }

      const result = await res.json();
      alert("ログイン成功: " + result.name);
      navigate('/home');

    } catch (err) {
      console.error("ログインエラー:", err);
      alert("サーバーとの通信に失敗しました。");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <div style={styles.title}>HUB ログイン</div>
        <ID label="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <Pass label="Pass" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button style={styles.button} onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  )
}

export default Login;
