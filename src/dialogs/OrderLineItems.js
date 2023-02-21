import React from "react";
import GenericDialog from "./GenericDialog";

const OrderLineItems = (props) => {
 let count=0;
 
    return (
        <GenericDialog className="readytoapply-model" show={props.show} handleClose={props.handleClose} modalHeader="Order LineItems Details">
           <div className='model-body-col'>
              {props? (<div>
                {props.orderLineItems?.map((orderLineItem)=>
                { count=count+1;
                     return (
                   <div className=" row">{count} |
                    <div className="col">
                        <h6>Admission Session :</h6> <span>{orderLineItem.admissionSession}</span>
                    </div>
                    <div className="col">
                        <h6>Child Name :</h6> <span>{orderLineItem.childName}</span>
                    </div>
                    <div className="col">
                        <h6>Class Name :</h6> <span>{orderLineItem.className}</span>
                    </div>
                    <div className="col">
                        <h6>School Name :</h6> <span>{orderLineItem.schoolName}</span>
                    </div>
                    <hr/>
                   </div>
                   );
                }
            )}
           
              </div>) : <div className="no-remarks" style={{ textAlign: "center" }}>
              No Record Found.
            </div>}
            </div>
        </GenericDialog>
    );
};

export default OrderLineItems;