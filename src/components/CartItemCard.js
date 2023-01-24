import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmDialog from "../common/ConfirmDialog";
import { hideLoader, showLoader } from "../common/Loader";
import { getItemsInCart } from '../redux/actions/cartAction';
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import SchoolCardHeader from "./SchoolCardHeader";

const CartItemCard = (props) => {
    const cartItem = props.cartItem;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const confirmMessage = "Are you sure to remove the school from application list?";
    const [showConfirmDialog, setShowConfirmDialog] = useState({show:false});
    
    const removeFromCart = async(cartId) => {
        setShowConfirmDialog({show:true, cartId: cartId});
    }

    const handleRemoveFromCartConfirm = async() => {
        setShowConfirmDialog(false);
        try {
            showLoader(dispatch)
            await RESTClient.delete(RestEndPoint.APPLICATION_CART_BASE + "/" + showConfirmDialog.cartId);
            dispatch(getItemsInCart());
            props.handleChildSelection(props.childId);
            hideLoader(dispatch)
            toast.success("School deleted successfully.");
        } catch (e) {
            hideLoader(dispatch)
            toast.error("Error while removing from cart. Please try again later.");
        }
    }

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
    }

    function viewSchoolDetails(schoolId, schoolName) {
        navigate("/schools/"+schoolName+"?id="+btoa(`#${schoolId}`));
    }

    function schoolCardHeaderObject() {
        let cardHeader = {...cartItem.schoolDto}
        cardHeader['admissionInfo'] = {admissionFormFee:cartItem.admissionFormFee}
        return cardHeader
    }

    return (
        <>
            <Card className='school-card cart-block cart-active'>
                
                <SchoolCardHeader school={schoolCardHeaderObject()}/>
                {/* <ListGroup className="info-list-group">
                    <ListGroup.Item>
                        <div className='left'>Applying to Class</div>
                        <div className='right'>{cartItem.className}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='left'>Monthly Tuition Fees</div>
                        <div className='right fee-wrap'><span className='fee-to'>₹{cartItem.tutionFee}</span> </div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <div className='left'>Admission Status:</div>
                        <div className='right session-wrap'>
                            <span className='session-title'>Open for {cartItem.admissionSession} </span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='left'>Admission Form Fee:</div>
                        <div className='right seats'>₹{cartItem.admissionFormFee}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='left'>Platform Fee:</div>
                        <div className='right seats'>₹0</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='left'>Total Fee:</div>
                        <div className='right seats'>₹{cartItem.admissionFormFee}</div>
                    </ListGroup.Item>
                </ListGroup> */}
                <div className='card-header-item'>
                    <div className='cell'>
                        <Card.Link onClick={(e)=>viewSchoolDetails(cartItem.schoolDto.schoolId, cartItem.schoolDto.schoolName)}>View Details</Card.Link>
                    </div>
                    <div className='cell'>
                        <Card.Link onClick={e=>removeFromCart(cartItem.cartId)} className='rem'>Remove</Card.Link>
                    </div>
                </div>
            </Card>
            <ConfirmDialog show={showConfirmDialog.show} message={confirmMessage} 
                handleConfirm={handleRemoveFromCartConfirm}
                handleClose={handleConfirmDialogClose}/>
        </>
    )
}

export default CartItemCard;