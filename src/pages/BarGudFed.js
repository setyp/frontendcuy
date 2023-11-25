import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function BarGudFed() {
  const token = localStorage.getItem("token");
  console.log(token); 
  const [gudangData, setGudangData] = useState([]);
  const [barangData, setBarangData] = useState([]);
  const [showGudangModal, setShowGudangModal] = useState(false);
  const [showBarangModal, setShowBarangModal] = useState(false);
  const [selectedGudangId, setSelectedGudangId] = useState(null);
  const [selectedBarangId, setSelectedBarangId] = useState(null);
  const [unchangedBarangData, setUnchangedBarangData] = useState({});
  const [editGudangData, setEditGudangData] = useState({ nama_gudang: "" });
  const [editBarangData, setEditBarangData] = useState({ nama_produk: "" });
  const navigate = useNavigate();
  const url = "http://192.168.0.100:3000/static/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const gudangResponse = await axios.get('http://192.168.0.100:3000/gudang', { headers: { Authorization: `Bearer ${token}` } });
      const barangResponse = await axios.get('http://192.168.0.100:3000/barang/data', { headers: { Authorization: `Bearer ${token}` } });
      setGudangData(gudangResponse.data.data);
      setBarangData(barangResponse.data.data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  function generateRandomBarcode(length) {
    const characters = '0123456789';
    let barcode = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      barcode += characters.charAt(randomIndex);
    }
  
    return barcode;
  }

  const handleShowGudangModal = () => setShowGudangModal(true);
  const handleCloseGudangModal = () => setShowGudangModal(false);

  const handleShowBarangModal = () => setShowBarangModal(true);
  const handleCloseBarangModal = () => setShowBarangModal(false);

  const handleEditGudang = (gudangId) => {
    const gudang = gudangData.find((g) => g.id_gudang === gudangId);
    if (gudang) {
      setSelectedGudangId(gudangId);
      setEditGudangData({ nama_gudang: gudang.nama_gudang });
      handleShowGudangModal();
    }
  };

  const handleEditBarang = (barangId) => {
    console.log("Barang Data:", barangData);
    const barang = barangData.find((b) => b.id_barang === barangId);
    console.log("Selected Barang:", barang);
    if (barang) {
      setSelectedBarangId(barangId);
      setUnchangedBarangData({
        id_gudang: barang.id_gudang,
        nomer_barcode: barang.nomer_barcode,
        nama_produk: barang.nama_produk,
        ket_produk: barang.ket_produk,
        foto_produk: barang.foto_produk,      
        stok_produk: barang.stok_produk,       
        harga: barang.harga,
      });
      setEditBarangData({
        id_gudang: barang.id_gudang,
        nomer_barcode: barang.nomer_barcode,
        nama_produk: barang.nama_produk,
        ket_produk: barang.ket_produk,
        foto_produk: barang.foto_produk,
        stok_produk: barang.stok_produk,       
        harga: barang.harga,
      });
      handleShowBarangModal();
    }
  };

  const handleDeleteGudang = async (gudangId) => {
    try {
      await axios.delete(`http://192.168.0.100:3000/gudang/${gudangId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data gudang:', error);
    }
  };

  const handleDeleteBarang = async (barangId) => {
    try {
      await axios.delete(`http://192.168.0.100:3000/barang/${barangId}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) {
      console.error('Gagal menghapus data barang:', error);
    }
  };

  const handleGudangSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedGudangId) {
        await axios.patch(`http://192.168.0.100:3000/gudang/${selectedGudangId}`, editGudangData, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('http://192.168.0.100:3000/gudang', editGudangData, { headers: { Authorization: `Bearer ${token}` } });
      }

      setSelectedGudangId(null);
      setEditGudangData({ nama_gudang: "" });
      handleCloseGudangModal();
      fetchData();
    } catch (error) {
      console.error('Gagal menyimpan data gudang:', error);
    }
  };

  const handleBarangSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('id_gudang', editBarangData.id_gudang);
      formData.append('nomer_barcode', generateRandomBarcode(8));
      formData.append('nama_produk', editBarangData.nama_produk);
      formData.append('ket_produk', editBarangData.ket_produk);
      formData.append('foto_produk', editBarangData.foto_produk);
      formData.append('stok_produk', editBarangData.stok_produk);
      formData.append('harga', editBarangData.harga);
  
      if (selectedBarangId) {
        await handleEditBarangSubmit(selectedBarangId, formData);
      } else {
        await handleCreateBarangSubmit(formData);
      }
  
      setSelectedBarangId(null);
      setEditBarangData({ nama_produk: '' });
      handleCloseBarangModal();
    } catch (error) {
      console.error('Gagal menyimpan data barang:', error);
      // Add user feedback for failure
    }
  };
  
  const handleEditBarangSubmit = async (barangId, formData) => {
    try {
      await axios.patch(`http://192.168.0.100:3000/barang/${barangId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchData();
    } catch (error) {
      console.error('Gagal mengedit data barang:', error);
      // Add user feedback for failure
    }
  };
  
  const handleCreateBarangSubmit = async (formData) => {
    try {
      await axios.post('http://192.168.0.100:3000/barang', formData, {
        headers: {    
          Authorization: `Bearer ${token}`,     
          'Content-Type': 'multipart/form-data',      
        },
      });
      fetchData();
    } catch (error) {
      console.error('Gagal membuat data barang:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  
    
  const getBarcodeImageUrl = (barcodeData) => {
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(barcodeData)}&code=Code128&translate-esc=on`;
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Data Gudang</h2>         
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Gudang</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {gudangData.map((gudang, index) => (
                <tr key={gudang.id_gudang}>
                  <td>{index + 1}</td>
                  <td>{gudang.nama_gudang}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditGudang(gudang.id_gudang)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDeleteGudang(gudang.id_gudang)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleShowGudangModal}>
            Tambah 
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Data Barang</h2>         
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Foto Barang</th>
                <th>Keterangan</th>
                <th>Stok</th>
                <th>Nama Gudang</th>
                <th>Harga</th>
                <th>Barcode</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barangData.map((barang, index) => (
                <tr key={barang.id_barang}>
                  <td>{index + 1}</td>
                  <td>{barang.nama_produk}</td>
                  <td> <img src={url + barang.foto_produk} height="120" width="120" alt={barang.foto_produk} /></td>
                  <td>{barang.ket_produk}</td>
                  <td>{barang.stok_produk}</td>
                  <td>{barang.nama_gudang}</td>
                  <td>{barang.harga}</td>
                  <td>  <img src={getBarcodeImageUrl(barang.nomer_barcode)} height="80" alt="Barcode" /></td>
                  <td>
                    <Button variant="info" onClick={() => handleEditBarang(barang.id_barang)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => handleDeleteBarang(barang.id_barang)}>
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleShowBarangModal}>
            Tambah 
          </Button>
        </Col>
      </Row>

      {/* Modal untuk Gudang */}
      <Modal show={showGudangModal} onHide={handleCloseGudangModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedGudangId ? "Edit Gudang" : "Tambah Gudang"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleGudangSubmit}>
            <Form.Group className="mb-3" controlId="formGudang">
              <Form.Label>Nama Gudang</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama gudang"
                value={editGudangData.nama_gudang}
                onChange={(e) => setEditGudangData({ ...editGudangData, nama_gudang: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Simpan
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal untuk Barang */}
      <Modal show={showBarangModal} onHide={handleCloseBarangModal}>
  <Modal.Header closeButton>
    <Modal.Title>{selectedBarangId ? "Edit Barang" : "Tambah Barang"}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={handleBarangSubmit}>
      <Form.Group className="mb-3" controlId="formBarang">
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan nama barang"
          value={editBarangData.nama_produk}
          onChange={(e) => setEditBarangData({ ...editBarangData, nama_produk: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFotoProduk">
        <Form.Label>Foto Produk</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(e) => setEditBarangData({ ...editBarangData, foto_produk: e.target.files[0] })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formKetProduk">
        <Form.Label>Keterangan Produk</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan keterangan produk"
          value={editBarangData.ket_produk}
          onChange={(e) => setEditBarangData({ ...editBarangData, ket_produk: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formStokProduk">
        <Form.Label>Stok Produk</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan stok produk"
          value={editBarangData.stok_produk}
          onChange={(e) => setEditBarangData({ ...editBarangData, stok_produk: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNamaGudang">
      <Form.Label>Nama Gudang</Form.Label>
      <Form.Select
        value={editBarangData.id_gudang}
        onChange={(e) => setEditBarangData({ ...editBarangData, id_gudang: e.target.value })}    >
        <option value="" disabled>
          Pilih nama gudang
        </option>
        {gudangData.map((gudang) => (
          <option key={gudang.id} value={gudang.id_gudang}>
            {gudang.nama_gudang}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

      <Form.Group className="mb-3" controlId="formHarga">
        <Form.Label>Harga</Form.Label>
        <Form.Control
          type="text"
          placeholder="Masukkan harga"
          value={editBarangData.harga}
          onChange={(e) => setEditBarangData({ ...editBarangData, harga: e.target.value })}
        />
      </Form.Group>
      {/* nomer_barcode is auto-generated, no need to include it in the form */}
      <Button variant="primary" type="submit">
        Simpan
      </Button>
    </Form>
  </Modal.Body>
</Modal>
    </Container>
  );
}

export default BarGudFed;
