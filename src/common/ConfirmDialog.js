import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmDialog = (props) => {
    return (
        <Modal dialogClassName="alert-popup" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>Confirm</Modal.Header>
            <Modal.Body dialogClassName="model-body" >
                <div className='alert-content-inner'>
                    <div className="message-content">{props.message}</div>
                    <div className="button-wrapper">
                        <Button className="ok-btn" onClick={props.handleConfirm}>OK</Button>
                        <Button className="cancel-btn" onClick={props.handleClose}>Cancel</Button>
                    </div>
                    
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmDialog;