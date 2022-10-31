import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AlertDialog = (props) => {
    return (
        <Modal dialogClassName="signin-model readytoapply-model" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>Alert</Modal.Header>
            <Modal.Body dialogClassName="model-body" >
                <div className='form-control-btn'>
                    <div>{props.message}</div>
                    <Button className="addtoapply-btn" onClick={props.handleClose}>OK</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AlertDialog;