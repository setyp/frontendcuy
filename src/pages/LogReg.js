import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginStyle = {
  backgroundColor: 'red', // Warna merah
  color: 'white',
  padding: '20px',
};

const registrationStyle = {
  backgroundColor: 'yellow', // Warna kuning
  color: 'black',
  padding: '20px',
};

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      // Proses data login dan simpan token di sini jika diperlukan
      // navigate ke halaman yang sesuai setelah berhasil login
    } catch (error) {
      console.error("Kesalahan: ", error);
      // Handle kesalahan login, seperti menampilkan pesan kesalahan
    }
  };

  return (
    <div style={loginStyle}>
      <Container>
        <Row>
          <Col>
            <h2>Login</h2>
            <Button variant="primary" onClick={handleShow}>
              Login
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Belum punya akun? <a href="/registration">Register</a></p>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

function Registration() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleRegistration = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("http://localhost:3000/registration", {
          name: name,
          email: email,
          password: password,
        });
  
        // Proses hasil registrasi di sini jika diperlukan
        // navigate ke halaman yang sesuai setelah berhasil registrasi
      } catch (error) {
        console.error("Kesalahan: ", error);
        // Handle kesalahan registrasi, seperti menampilkan pesan kesalahan
      }
    };
  
    return (
      <div style={registrationStyle}>
        <Container>
          <Row>
            <Col>
              <h2>Registration</h2>
              <Button variant="primary" onClick={handleShow}>
                Registration
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Sudah punya akun? <a href="/login">Login</a></p>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Registration</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleRegistration}>
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Registration
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }  

export { Login, Registration };
