import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpring, animated } from "react-spring";
import { Element, animateScroll as scroll, Events, scrollSpy } from "react-scroll";
const token = localStorage.getItem("token");

function Utama() {
  const [indomieMenu, setIndomieMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermm, setSearchTermm] = useState("");
  const [showBarcodeModal, setShowBarcodeModal] = useState(false); // State for barcode modal
  const [feedback, setFeedback] = useState("");
  const slideAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  });

  const url = "http://192.168.0.100:3000/static/";

  useEffect(() => {
    fetchData();
  }, []);

  
  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://192.168.0.100:3000/barang/data", { headers });
      const data = response.data.data;
      setIndomieMenu(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleShowModal = (menu) => {
    setSelectedMenu(menu);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fungsi untuk mendapatkan URL barcode dari layanan pembuat barcode
  const getBarcodeImageUrl = (barcodeData) => {
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(barcodeData)}&code=Code128&translate-esc=on`;
  };

  const handleSearch = () => {
    // Filter menu based on the search term
    const filteredMenu = indomieMenu.filter((menu) =>
      menu.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Set the filtered menu to be displayed
    setIndomieMenu(filteredMenu);
  };


  const handleSearchh = () => {
    // Filter menu based on the search term
    const filteredMenu = indomieMenu.filter((menu) =>
      menu.nomer_barcode.toLowerCase().includes(searchTermm.toLowerCase())
    );
    // Set the filtered menu to be displayed
    setIndomieMenu(filteredMenu);
  };

  useEffect(() => {
    // Call handleSearch directly when the search term changes
    handleSearchh();
  }, [searchTermm]);
  
  const handleToggleBarcodeModal = () => {
    setShowBarcodeModal(!showBarcodeModal);
  };

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return (
    <Container style={{ position: "relative", marginTop: "20px" }}>
      <style>{styles}</style>
      <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src="/images/image-2_021732830.png"
        alt="Logo"
        style={{ height: "400px", marginLeft: "300px" }}
      />
    </div>
      <Row>
        <Col>
        <animated.h2 style={{slideAnimation, fontSize: "8em", color: "white" }}>Indomie Menu</animated.h2>
        </Col>
      </Row>
      <Row>
      <Form>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Search menu by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ fontSize: "1.5em", marginRight: "10px", marginBottom: "10px" }}
        />
      </Form.Group>
      <div style={{ display: "flex", gap: "950px" }}>
      <Button className="utama-btn" variant="primary" onClick={handleSearch} style={{ fontSize: "1.2em", fontWeight: "bold" }}>
        Search
      </Button>
          <Button className="utama-btn" variant="secondary" onClick={handleToggleBarcodeModal} style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            Scan?
          </Button>
          </div>
    </Form>
</Row>
<Row>       
        <Col>
          <animated.h3 style={{slideAnimation, fontSize: "4em", color: "white" }}>Our Menu</animated.h3>
          <animated.p style={{slideAnimation, fontSize: "1em", color: "white" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </animated.p>
        </Col>
      </Row>
      <Row>
        {indomieMenu.map((menu) => (
          <Col key={menu.id} md={4} className="mb-4">           
            <Card className="parent">           
            <div className="background-image" style={{ backgroundImage: `url(${url + menu.foto_produk})`}} >     
              <Card.Img variant="top" src={menu.fotoproduk} />             
              <Card.Body>           
              <span className="card-title" style={{fontSize: "1.2em", color: "white"}}>{menu.nama_produk}</span>
      <p className="card-content"style={{fontSize: "0.7em", color: "white"}} >{menu.ket_produk}</p>   
              </Card.Body>
              <Button className="utama-btn" variant="primary" onClick={() => handleShowModal(menu)}>
                  View Details
                </Button>
              </div>
            </Card>
          </Col>
        ))}     
      </Row>
      <Row>
      <Col>
          <animated.h3 style={{slideAnimation, fontSize: "3em", color: "white" }}>About Us</animated.h3>
          <animated.p style={{slideAnimation, fontSize: "1em", color: "white" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
          </animated.p>
        </Col>
      </Row>
      <Modal show={showBarcodeModal} onHide={handleToggleBarcodeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Barcode Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchFormBarcodeModal">
            <Form.Control
              type="text"
              placeholder="Search menu by barcode..."
              value={searchTermm}
              onChange={(e) => {
                setSearchTermm(e.target.value);
                handleToggleBarcodeModal(); 
              }}          
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggleBarcodeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>Menu Details</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    {selectedMenu && (
      <>
        <div className="menu-details">
          <div className="background-image" style={{ backgroundImage: `url(${url + selectedMenu.foto_produk})` }}>
            <div className="content-top">
              <h5>{selectedMenu.nama_produk}</h5>
              <p>{selectedMenu.ket_produk}</p>
            </div>
          </div>
          <div className="content-bottom">
            <div className="details">
              <div className="detail">
                <h5>Stock</h5>
                <p>{selectedMenu.stok_produk}</p>
              </div>
              <div className="detail">
                <h5>Warehouse</h5>
                <p>{selectedMenu.nama_gudang}</p>
              </div>
              <div className="detail">
                <h5>Price</h5>
                <p>{selectedMenu.harga}</p>
              </div>
            </div>
            <div className="barcode">
              <img src={getBarcodeImageUrl(selectedMenu.nomer_barcode)} alt="Barcode" />
            </div>
          </div>
        </div>
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </Container>
  );
}

export default Utama;

const styles =`

body {
  background: url('/images/home-banner.jpg') center/cover no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  /* Gaya-gaya lainnya */
}

.modal {
  background: url('/images/home-banner.jpg') center/cover no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
}

.p
.row,
.col,
.form {
  background-color: rgba(255, 255, 255, 0); /* Warna putih dengan tingkat transparansi 0 (sepenuhnya transparan) */
  margin-top: 80px;
  margin-bottom: 80px;
}

.container {
    margin-top: 20px;
    display: "flex",
  justifyContent: "flex-end",
  }

  .parent {
    background-color: rgba(255, 255, 255, 0);
    width: 300px;
    padding: 20px;
    perspective: 1000px;
  }
  
  .card {
    padding-top: 50px;
    /* border-radius: 10px; */
    border: 3px solid rgb(255, 255, 255);
    transform-style: preserve-3d;
    background: linear-gradient(135deg,#0000 18.75%,#f3f3f3 0 31.25%,#0000 0),
        repeating-linear-gradient(45deg,#f3f3f3 -6.25% 6.25%,#ffffff 0 18.75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 0;
    background-color: #f0f0f0;
    width: 100%;
    box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
    transition: all 0.5s ease-in-out;
  }
  
  .card:hover {
    background-position: -100px 100px, -100px 100px;
    transform: rotate3d(0.5, 1, 0, 30deg);
  }
  
  .content-box {
    background:#03c831 ;
    /* border-radius: 10px 100px 10px 10px; */
    transition: all 0.5s ease-in-out;
    padding: 60px 25px 25px 25px;
    transform-style: preserve-3d;
  }
  
  .content-box .card-title {
    display: inline-block;
    color: white;
    font-size: 25px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 50px);
  }
  
  .content-box .card-content {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #f2f2f2;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 30px);
  }
  
  .utama-btn {
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
   
   .utama-btn:hover {
    border-radius: 5px;
    transform: translateY(-10px);
    box-shadow: 0 7px 0 -2px #f85959,
     0 15px 0 -4px #ffb703,
     0 16px 10px -3px #ffb703;
   }
   
   .utama-btn:active {
    transition: all 0.2s;
    transform: translateY(-5px);
    box-shadow: 0 2px 0 -2px #f85959,
     0 8px 0 -4px #ffb703,
     0 12px 10px -3px #ffb703;
   }

   .element {
    height: 100vh
   }

   .menu-details {
    position: relative;
    overflow: hidden;
  }
  
  .background-image {
    height: 200px; /* Atur tinggi sesuai kebutuhan */
    background-size: cover;
    background-position: center;
    opacity: 0.95; /* Atur tingkat transparansi sesuai kebutuhan */
    position: relative;
    overflow: hidden;
  }
  
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; 
    text-align: center;
    padding: 20px;
  }
  
  .menu-details {
    display: flex;
    flex-direction: column;
  }
  
  .background-image {
    height: 200px; /* Sesuaikan tinggi sesuai kebutuhan */
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
  }
  
  .content-top {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff; /* Sesuaikan warna teks agar sesuai dengan kontras background */
    text-align: center;
    padding: 20px;
  }
  
  .content-bottom {
    background-color: #fff; /* Background putih */
    padding: 20px;
  }
  
  .details {
    display: flex;
    justify-content: space-around;
  }
  
  .detail {
    text-align: center;
  }
  
  .barcode img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
`;