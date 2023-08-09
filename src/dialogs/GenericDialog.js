import React from "react";
import Modal from "react-bootstrap/Modal";
import "../assets/scss/custom-styles.scss";

const GenericDialog = ({
  children,
  modalHeader,
  className,
  show,
  handleClose,
}) => {
  return (
    <Modal className={className} show={show} onHide={handleClose}>
      <Modal.Header closeButton>{modalHeader}</Modal.Header>
      <Modal.Body className="model-body">{children}</Modal.Body>
    </Modal>
  );
};

export default GenericDialog;
