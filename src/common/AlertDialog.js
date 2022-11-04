import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AlertDialog = (props) => {
    return (
        <Modal dialogClassName="alert-popup" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body dialogClassName="model-body" >
                <div className='alert-content-inner'>
                    <div className="message-content">{props.message}</div>
                    <div className="button-wrapper">
                        <Button className="ok-btn" onClick={props.handleClose}>OK</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AlertDialog;