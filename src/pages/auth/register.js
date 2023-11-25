import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://192.168.0.100:3000/api/auth/register', {
        username: username,
        password: password,
      });
      console.log('Pendaftaran berhasil:', response.data);
      navigate('/auth/login');
      window.location.reload();
    } catch (error) {
      console.error('Gagal mendaftar:', error);
    }
  };

  return (
    <div className="register-container">
      <style>
        {`
          /* CSS Styles */
          body {
            background: url('/images/bg-content-1.jpg') center/cover no-repeat;
            background-position: center;
            background-repeat: no-repeat;
            /* Gaya-gaya lainnya */
          }

          .register-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .btn-primary {
            width: 130px;   
            height: 40px; 
            font-size: 1.1em; 
            cursor: pointer;
    background-color: #171717;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: all .4s;
          }

          .btn-primary:hover {
            border-radius: 5px;
    transform: translateY(-10px);
    box-shadow: 0 7px 0 -2px #f85959,
     0 15px 0 -4px #f51010,
     0 16px 10px -3px #f51010;
          }

          .btn-primary:active {
            transition: all 0.2s;
            transform: translateY(-5px);
            box-shadow: 0 2px 0 -2px #f85959,
             0 8px 0 -4px #f51010,
             0 12px 10px -3px #f51010;
           }
        `}
      </style>
      
      <h2 className="mt-5">Form Pendaftaran</h2>
      <div className="form-group">
        <label>Username:</label>
        <input className="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleRegister}>Daftar</button>
    </div>
  );
};

export default Register;
