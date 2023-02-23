import React from "react";
import GenericDialog from "./GenericDialog";

const OrderLineItems = (props) => {
 let count=0;
 
    return (
        <GenericDialog className="payeedetails-model" show={props.show} handleClose={props.handleClose} modalHeader="Order LineItems Details">
           <div className='model-body-col'>
              {props? (<div className="order-wrapper">
                {props.orderLineItems?.map((orderLineItem)=>
                { count=count+1;
                     return (
                   <ul className="order-list">
                    <div className="order-num">
                        <span className="num-txt">{count}</span>
                    </div>
                    <div className="list-items-wrap">
                        <li className="">
                            <h6 className="order-item title">Admission Session :</h6> 
                            <span className="order-item info">{orderLineItem.admissionSession}</span>
                        </li>
                        <li className="">
                            <h6 className="order-item title">Child Name :</h6>
                            <span className="order-item info">{orderLineItem.childName}</span>
                        </li>
                        <li className="">
                            <h6 className="order-item title">Class Name :</h6>
                            <span className="order-item info">{orderLineItem.className}</span>
                        </li>
                        <li className="">
                            <h6 className="order-item title">School Name :</h6>
                            <span className="order-item info">{orderLineItem.schoolName}</span>
                        </li>
                    </div>
                   </ul>
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