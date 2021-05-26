import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ErrorModal = ({ isError, message, handleClose }) => {
  return (
    <Modal
      show={isError}
      onHide={handleClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          OK, Let Me Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
