import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ReviewAdmissionDialog from "../dialogs/reviewAdmissionDialog";

const PaymentCard = ({selectedChild}) => {

    const [showReviewApplication, setShowReviewApplication] = useState(false);
    let totalFee = 0;
    let convenienceFee = 0;
    let totalPay = 0;
    selectedChild.cartItems.forEach(cartItem => {
      totalFee += parseFloat(cartItem.admissionFormFee);
    });
    let gstAmt = parseFloat((totalFee + parseFloat(convenienceFee)) * 18/100,).toFixed(2)
    totalPay = parseFloat(totalFee) + parseFloat(gstAmt);

    const handleShowReviewApplication = () => setShowReviewApplication(true)
    const handleCloseReviewApplicationDialog = () => {
        setShowReviewApplication(false);
    }
    
    return (
        <Card className='school-card cart-payment-card'>
            <div className='card-header-item title'>Order Summary</div>
            <Card.Body className='school-info-main'>
                <ListGroup className="info-list-group">
                    <ListGroup.Item>
                        <div className='cell left'>School Admission Request</div>
                        <div className='cell right'>1</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='cell left'>Admission Fee</div>
                        <div className='cell right'>₹{totalFee}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='cell left'>Platform Fee</div>
                        <div className='cell right'> ₹{convenienceFee}</div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='cell left'>GST 18%</div>
                        <div className='cell right'> ₹{gstAmt}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="total">
                        <div className='cell left'>Total Payment</div>
                        <div className='cell right totalpayment'>₹{totalPay.toFixed(2)}</div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            <Card.Body className='button-wrap'>
                <Card.Link 
                    className={'btn checkour' + (selectedChild.id ==='' || selectedChild.cartItems.length === 0 ? ' disabled' : '')} 
                    onClick={handleShowReviewApplication}
                    >
                    Review Admission Form <br /> and Submit
                </Card.Link>
                <Card.Link href="/schools" className='btn addmore'>Add More Schools</Card.Link>
            </Card.Body>
            <ReviewAdmissionDialog show={showReviewApplication} handleClose={handleCloseReviewApplicationDialog} childId={selectedChild.id} />
        </Card>
    )
}

export default PaymentCard;