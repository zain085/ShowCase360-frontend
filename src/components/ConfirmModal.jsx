import React from 'react';

import {
  Button,
  Modal,
} from 'react-bootstrap';

const ConfirmModal = ({
  show,
  onHide,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}) => {
  // Custom styles for the modal
  const modalStyles = {
    modalContent: {
      backgroundColor: '#1a1a1a',
      border: '2px solid #6f42c1',
      borderRadius: '12px',
      boxShadow: '0 5px 20px rgba(111, 66, 193, 0.2)',
    },
    header: {
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #6f42c1',
      padding: '1rem 1.5rem 0.75rem',
    },
    body: {
      backgroundColor: '#1a1a1a',
      color: 'white',
      padding: '0.75rem 1.5rem',
    },
    footer: {
      backgroundColor: '#1a1a1a',
      borderTop: '1px solid #6f42c1',
      padding: '0.75rem 1.5rem 1rem',
    },
    title: {
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
    },
    message: {
      fontSize: '0.95rem',
      color: 'rgba(255, 255, 255, 0.8)',
    },
    cancelButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid #6f42c1',
      backgroundColor: 'transparent',
      color: 'white',
    },
    confirmButton: {
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '0',
      color: 'white',
      background: danger ? '' : 'linear-gradient(135deg, #6f42c1, #8a63d2)',
      boxShadow: danger ? '' : '0 4px 8px rgba(111, 66, 193, 0.3)',
    },
    closeButton: {
      filter: 'invert(1) grayscale(100%) brightness(200%)',
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      style={{ backdropFilter: 'blur(2px)' }}
    >
      <div style={modalStyles.modalContent}>
        <Modal.Header closeButton style={modalStyles.header}>
          <Modal.Title style={modalStyles.title} className="text-white">
            {danger && <i className="bi bi-exclamation-triangle-fill text-warning me-2 fs-5"></i>}
            <span>{title}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={modalStyles.body}>
          <div style={modalStyles.message}>{message}</div>
        </Modal.Body>

        <Modal.Footer style={modalStyles.footer}>
          <Button
            variant="outline-light"
            onClick={onHide}
            style={modalStyles.cancelButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(111, 66, 193, 0.2)';
              e.target.style.borderColor = '#6f42c1';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = '#6f42c1';
            }}
          >
            {cancelText}
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            onClick={onConfirm}
            style={modalStyles.confirmButton}
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ConfirmModal;