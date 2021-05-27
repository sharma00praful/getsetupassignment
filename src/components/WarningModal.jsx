import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WarningModal = ({
  isWarning,
  message,
  title,
  handleClose,
  handleProceed,
  handleLetMeChange,
}) => {
  return (
    <Modal
      show={isWarning}
      onHide={handleClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleProceed}>
          No, Proceed with current Slot
        </Button>
        <Button variant="primary" onClick={handleLetMeChange}>
          OK, Let Me Change
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WarningModal;
