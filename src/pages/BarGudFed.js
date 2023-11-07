import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BarGudFed() {
  const [showBarangModal, setShowBarangModal] = useState(false);
  const [barangMode, setBarangMode] = useState('create');
  const [barangDataToEdit, setBarangDataToEdit] = useState(null);

  const [showGudangModal, setShowGudangModal] = useState(false);
  const [gudangMode, setGudangMode] = useState('create');
  const [gudangDataToEdit, setGudangDataToEdit] = useState(null);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackMode, setFeedbackMode] = useState('create');
  const [feedbackDataToEdit, setFeedbackDataToEdit] = useState(null);

  const [barangData, setBarangData] = useState([]);
  const [gudangData, setGudangData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);

  // Create functions for handling CRUD operations
  const createData = (modalName, data) => {
    // Logic for creating data
    // Add data to the appropriate state variable (barangData, gudangData, feedbackData)
    handleCloseModal(modalName);
  };

  const updateData = (modalName, data) => {
    // Logic for updating data
    // Update data in the appropriate state variable (barangData, gudangData, feedbackData)
    handleCloseModal(modalName);
  };

  const showData = (modalName, data) => {
    // Logic for showing data
    // Display data in a "Show" modal
    handleShowShowModal(modalName);
  };

  const deleteData = (modalName, data) => {
    // Logic for deleting data
    // Remove data from the appropriate state variable (barangData, gudangData, feedbackData)
    handleCloseModal(modalName);
  };

  // Handle modal show and close
  const handleShowModal = (modalName, mode, data) => {
    // Set the appropriate mode and data for the modal
    if (modalName === 'barang') {
      setShowBarangModal(true);
      setBarangMode(mode);
      setBarangDataToEdit(data);
    } else if (modalName === 'gudang') {
      setShowGudangModal(true);
      setGudangMode(mode);
      setGudangDataToEdit(data);
    } else if (modalName === 'feedback') {
      setShowFeedbackModal(true);
      setFeedbackMode(mode);
      setFeedbackDataToEdit(data);
    }
  };

  const handleCloseModal = (modalName) => {
    // Close the modal and reset mode and data
    if (modalName === 'barang') {
      setShowBarangModal(false);
      setBarangMode('create');
      setBarangDataToEdit(null);
    } else if (modalName === 'gudang') {
      setShowGudangModal(false);
      setGudangMode('create');
      setGudangDataToEdit(null);
    } else if (modalName === 'feedback') {
      setShowFeedbackModal(false);
      setFeedbackMode('create');
      setFeedbackDataToEdit(null);
    }
  };

  // Handle "Show" modals
  const handleShowShowModal = (modalName) => {
    if (modalName === 'barang') {
      // Implement logic to display data in a "Show" modal
      // Example: showData('barang', data);
    } else if (modalName === 'gudang') {
      // Implement logic to display data in a "Show" modal
      // Example: showData('gudang', data);
    } else if (modalName === 'feedback') {
      // Implement logic to display data in a "Show" modal
      // Example: showData('feedback', data);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShowModal('barang', 'create', null)}>Tambah Barang</Button>
      <Button variant="primary" onClick={() => handleShowModal('gudang', 'create', null)}>Tambah Gudang</Button>
      <Button variant="primary" onClick={() => handleShowModal('feedback', 'create', null)}>Tambah Feedback</Button>

      <BarangForm
        show={showBarangModal}
        handleClose={() => handleCloseModal('barang')}
        handleSubmit={(data) => (barangMode === 'create' ? createData('barang', data) : updateData('barang', data))}
        data={barangDataToEdit}
        mode={barangMode}
      />
      <GudangForm
        show={showGudangModal}
        handleClose={() => handleCloseModal('gudang')}
        handleSubmit={(data) => (gudangMode === 'create' ? createData('gudang', data) : updateData('gudang', data))}
        data={gudangDataToEdit}
        mode={gudangMode}
      />
      <FeedbackForm
        show={showFeedbackModal}
        handleClose={() => handleCloseModal('feedback')}
        handleSubmit={(data) => (feedbackMode === 'create' ? createData('feedback', data) : updateData('feedback', data))}
        data={feedbackDataToEdit}
        mode={feedbackMode}
      />

      {/* Add "Show" buttons for each type of data */}
      <Button variant="secondary" onClick={() => showData('barang', barangDataToEdit)}>Show Barang</Button>
      <Button variant="secondary" onClick={() => showData('gudang', gudangDataToEdit)}>Show Gudang</Button>
      <Button variant="secondary" onClick={() => showData('feedback', feedbackDataToEdit)}>Show Feedback</Button>

      <DeleteButton onClick={() => deleteData('barang', barangDataToEdit)} />
      <DeleteButton onClick={() => deleteData('gudang', gudangDataToEdit)} />
      <DeleteButton onClick={() => deleteData('feedback', feedbackDataToEdit)} />
    </div>
  );
}

// Define BarangForm, GudangForm, and FeedbackForm components

import React from 'react';
import Button from 'react-bootstrap/Button';

function DeleteButton({ onClick }) {
  return (
    <Button variant="danger" onClick={onClick}>
      Delete
    </Button>
  );
}

export default DeleteButton;

