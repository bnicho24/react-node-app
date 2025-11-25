import React from 'react';
import { Modal, Button } from "react-bootstrap";

const PopupModal = ({ show, title, children, onClose, onSave }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        {onSave && (
          <Button variant="success" onClick={onSave}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default PopupModal