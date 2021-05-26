import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Timekeeper from "react-timekeeper";

const ClockInput = ({
  time,
  type,
  visibility,
  handleClose,
  handleTimeChange,
}) => {
  return (
    <Modal
      show={visibility}
      onHide={handleClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{`Choose ${type} Time`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Timekeeper time={time} onChange={handleTimeChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClockInput;
