import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Utama from '../pages/utama';
import BarGudFed from '../pages/BarGudFed';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';

function Routing() {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
 
  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log("Berhasil Logout");
    window.location.reload();
  };

  const Navbar = () => {
    const [isSidebarActive, setSidebarActive] = useState(false);

    const handleToggleSidebar = () => {
      setSidebarActive(!isSidebarActive);
    };

    return (
      <Router>
        <style>
        {`
          /* Your component-specific CSS styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            min-height: 100vh;
            background-color: #fff;
          }

          .side-navbar {
            width: 250px;
            height: 100%;
            position: fixed;
            margin-left: ${isSidebarActive ? '0' : '-300px'};
            background: url('/images/i.jpg') center/cover no-repeat;
            transition: 0.5s;
          }

          .nav-link:active,
          .nav-link:focus,
          .nav-link:hover {
            background-color: #ffffff26;
          }

          .my-container {
            transition: 0.4s;
          }

          .active-nav {
            margin-left: 0;
          }

          .active-cont {
            margin-left: 250px;
          }

          #menu-btn {
            background-color: #31333E;
            color: #fff;
            margin-left: -62px;
            height: 40px; /* Sesuaikan tinggi sesuai kebutuhan */
            width: 40px;  /* Sesuaikan lebar sesuai kebutuhan */
          }

          .my-container input {
            border-radius: 2rem;
            padding: 2px 20px;
          }

          .my-container .nav-link {
            color: yellow;
            font-weight: normal;
            transition: color 0.3s;
          }
          
          .my-container .nav-link:hover {
            color: green;
            font-weight: bold;
          }
          
          .my-container .nav-link:active {
            color: green;
            font-weight: bold;
          }

          .navbar-logo {
            width: 200px; 
          }

.mx-2 {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid #dcdcdc; 
  border-radius: 4px; 
  padding: 10px;
}

        `}
      </style>
        <div className={`side-navbar ${isSidebarActive ? 'active-nav' : ''}`}>
        <ul className="nav flex-column w-100">
          <img src="/images/logoindomie.png"alt="Logo" className="navbar-logo" />
            <li className="nav-link">
              <Link to="/utama">
                <i className="bx bxs-dashboard"></i>
                <div className="mx-2" style={{ color: 'yellow', fontWeight: 'normal', transition: 'color 0.3s' }}><b>Home</b></div>
              </Link>
            </li>
            <li className="nav-link">
              <Link to="/BarGudFed">
                <i className="bx bx-user-check" style={{ color: 'black', fontWeight: 'normal', transition: 'color 0.3s' }}></i>
                <div className="mx-2" style={{ color: 'yellow', fontWeight: 'normal', transition: 'color 0.3s' }}><b>Admin only...</b></div>
              </Link>
            </li>
            {isLoggedIn ? (
          // Tampilkan elemen "Logout" hanya jika pengguna sudah login
          <li className="nav-link" onClick={handleLogout}>
            <Link to="/auth/login">
              <i className="bx bx-user-check"></i>
              <div className="mx-2" style={{ color: 'yellow', fontWeight: 'normal', transition: 'color 0.3s' }}><b>Logout</b></div>
            </Link>
          </li>
        ) : null}
        {isLoggedIn ? null : (
          // Tampilkan elemen "Login" hanya jika pengguna belum login
          <li className="nav-link">
            <Link to="/auth/login">
              <i className="bx bx-user-check"></i>
              <div className="mx-2" style={{ color: 'yellow', fontWeight: 'normal', transition: 'color 0.3s' }}><b>Login</b></div>
            </Link>
          </li>
        )}
          </ul>
        </div>

        <div className={`p-1 my-container ${isSidebarActive ? 'active-cont' : ''}`}>
          <nav className="navbar top-navbar px-5">
            <button className="btn border-0" id="menu-btn" onClick={handleToggleSidebar}>
              <i className="bx bx-menu"></i>
            </button>
          </nav>

          <Routes>
            <Route path="/utama" element={<Utama />} />
            <Route path="/BarGudFed" element={<BarGudFed />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    );
  };

  return <Navbar />;
}

export default Routing;
