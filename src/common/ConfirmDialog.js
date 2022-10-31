import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmDialog = (props) => {
    return (
        <Modal dialogClassName="signin-model readytoapply-model" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>Confirm</Modal.Header>
            <Modal.Body dialogClassName="model-body" >
                <div className='form-control-btn'>
                    <div>{props.message}</div>
                    <Button className="add-child-btn" onClick={props.handleConfirm}>OK</Button>
                    <Button className="addtoapply-btn" onClick={props.handleClose}>Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmDialog;