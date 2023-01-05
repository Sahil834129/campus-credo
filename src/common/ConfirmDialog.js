import React from "react";
import Button from 'react-bootstrap/Button';
import GenericDialog from "../dialogs/GenericDialog";

const ConfirmDialog = (props) => {
    return (
        <GenericDialog className='alert-popup confirm-mob-change' show={props.show} handleClose={props.handleClose}>
            <div className='alert-content-inner'>
                <div className="message-content">{props.message}</div>
                <div className="button-wrapper">
                    <Button className="ok-btn" onClick={props.handleConfirm}>OK</Button>
                    <Button className="cancel-btn" onClick={props.handleClose}>Cancel</Button>
                </div>
            </div>
        </GenericDialog>
    )
}

export default ConfirmDialog;