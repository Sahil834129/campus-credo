import React from "react";
import GenericDialog from "./GenericDialog";

const OrderLineItems = (props) => {
    
    return (
        <GenericDialog className="calback-model" show={props.show} handleClose={props.handleClose} modalHeader="Order LineItems Details">
           <div className='model-body-col'>
               hi
            </div>
        </GenericDialog>
    );
};

export default OrderLineItems;
