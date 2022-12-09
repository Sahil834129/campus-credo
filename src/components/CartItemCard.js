import React, {useState} from "react";
import Card from 'react-bootstrap/Card';
import SchoolCardHeader from "./SchoolCardHeader";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getItemsInCart } from '../redux/actions/cartAction';
import ConfirmDialog from "../common/ConfirmDialog";
import { useNavigate } from "react-router-dom";

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
        try {
            await RESTClient.delete(RestEndPoint.APPLICATION_CART_BASE + "/" + showConfirmDialog.cartId);
            dispatch(getItemsInCart());
            props.handleChildSelection(props.childId);
            toast.success("School deleted successfully.");
            setShowConfirmDialog(false);
        } catch (e) {
            console.log("error is : " + e)
            toast.error("Error while removing from cart. Please try again later.");
        }
    }

    const handleConfirmDialogClose = () => {
        setShowConfirmDialog(false);
    }

    function viewSchoolDetails(schoolId, schoolName) {
        navigate("/schools/"+schoolName+"?id="+btoa(`#${schoolId}`));
    }

    return (
        <>
            <Card className='school-card cart-block cart-active'>
                
                <SchoolCardHeader school={cartItem.schoolDto}/>
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
                        <Card.Link href='javascript:void(0)' onClick={(e)=>viewSchoolDetails(cartItem.schoolDto.schoolId, cartItem.schoolDto.schoolName)}>View Details</Card.Link>
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