import React from "react";
import Button from 'react-bootstrap/Button';
import GenericDialog from "../dialogs/GenericDialog";

const AlertDialog = (props) => {
    return (
        <GenericDialog className='alert-popup' show={props.show} handleClose={props.handleClose}>
            <div className='alert-content-inner'>
                <div className="message-content">{props.message}</div>
                <div className="button-wrapper">
                    <Button className="ok-btn" onClick={props.handleClose}>OK</Button>
                </div>
            </div>
        </GenericDialog>
    )
}

export default AlertDialog;