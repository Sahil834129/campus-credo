import { useState } from "react";
import GenericDialog from "../../dialogs/GenericDialog";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-toastify";
import { getIpAddress } from "../../utils/helper";
import { SESSION } from "../../constants/app";
import { processOrderAfterPayment, registerPayment } from "../../utils/services";
import { useNavigate } from "react-router";



const PayFee = ({ show, handleClose, totalPay, setTotalPay, setPayFeeButton, data, submissionFrequency, first, studentData, monthQtr, setMonthQtr, session }) => {

    const navigate = useNavigate();
    const GST = 18
    const platformFee = 100

    const handlePayment = async () => {
        handleClose()
        setPayFeeButton(true)
        try {
            const ip = await getIpAddress();
            const payload = {
                'childId': studentData.studentId,
                'ipAddress': ip,
                'deviceUserAgent': window.navigator.userAgent,
                "feePaymentDto": {
                    "classId": studentData.classId,
                    "session": session,
                    "monthQtr": monthQtr
                  }
            };
            console.log('payload', payload)
            const response =  await registerPayment(payload, session)
            const paymentLinkDetails = JSON.parse(response.data.paymentLinkDetails);
            const flowConfig = {
                merchantId: paymentLinkDetails?.parameters?.mercid,
                bdOrderId: paymentLinkDetails?.parameters?.bdorderid,
                authToken: paymentLinkDetails?.headers?.authorization,
                childWindow: false,
                retryCount: 3,
                prefs: { "payment_categories": ["nb", "upi", "card", "wallets", "qr", "gpay"] }
        
              };
              const config = {
                responseHandler: (e) => responseHandler(e, response.data?.orderId),
                merchantLogo: "data:image/png;base64,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",
                flowConfig: flowConfig,
                flowType: "payments"
              };
              console.log(config);
              window.loadBillDeskSdk(config);
              setPayFeeButton(false)
          

        }
        catch (error) {
            console.log('Error', error);
            setPayFeeButton(false)
        }
    }

    const responseHandler = async (e, orderId) => {
        try {
          const formData = new FormData();
          formData.append('response', JSON.stringify(e));
          const response = await processOrderAfterPayment(formData, orderId);
          console.log(response);
          navigate(`/paymentFailed?${response.data}`);
        } catch (e) {
          console.log(e);
          toast.error("Payment Cancelled");
        }
      };

    const handleData = (monthQtr) => {
        if (monthQtr) {
            const feeAmount = (data[`${monthQtr}`].totalFeeDue) || 0
            const lateFee = (data[`${monthQtr}`].lateFee) || 0
            const temp = (feeAmount) + (lateFee) + platformFee + GST
            setTotalPay(parseFloat(temp))
        }
    }
    useEffect(() => {
        handleData(monthQtr)
    }, [monthQtr])

    useEffect(() => {
        setMonthQtr(first)
    }, [first])

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Pay Fee"
            className="review-admission-modal add-child-model"
        >
            <Card style={{ margin: '20px' }} >
                <Card.Body >
                    <ListGroup>
                        <ListGroup.Item>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }} >
                                <label style={{ width: '150px' }}>Fee Period</label> &nbsp;
                                <Form.Select
                                    size='sm'
                                    value={monthQtr}
                                    style={{ width: '250px', }}
                                    onChange={(e) => setMonthQtr(e.target.value)}
                                >
                                    <option value=''>Select Fee Period</option>
                                    {submissionFrequency.map((val, index) => <option key={index} value={val}>{val}</option>)
                                    }
                                </Form.Select>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', }}>
                            <div style={{ marginRight: '10px', width: '150px' }}>Fee Amount</div>
                            <div style={{ color: 'Green' }}>₹ {monthQtr ? parseFloat(data[`${monthQtr}`].totalFeeDue).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', }}>
                            <div style={{ marginRight: '10px', width: '150px' }}>Late Fee</div>
                            <div style={{ color: 'green' }}>₹ {monthQtr ? parseFloat(data[`${monthQtr}`].lateFee).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', }}>
                            <div style={{ marginRight: '10px', width: '150px' }}>Platform Fee</div>
                            <div style={{ color: 'green' }}>
                                {" "}
                                ₹ {monthQtr ? parseFloat(platformFee).toFixed(2) : parseFloat(0).toFixed(2)}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', }}>
                            <div style={{ marginRight: '10px', width: '150px' }}>GST 18%</div>
                            <div style={{ color: 'green' }}> ₹ {monthQtr ? parseFloat(GST).toFixed(2) : parseFloat(0).toFixed(2)}</div>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', }}>
                            <div style={{ marginRight: '10px', width: '150px' }}>Total Payment</div>
                            <div style={{ color: 'green' }}>
                                ₹ {monthQtr ? parseFloat(totalPay).toFixed(2): parseFloat(0).toFixed(2)}
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <div style={{ display: 'flex', justifyContent: 'end', paddingTop: '10px' }}>
                        <Button
                            onClick={handlePayment}>
                            PROCEED
                        </Button>
                    </div>
                </Card.Body>
            </Card>

        </GenericDialog>
    )
}

export default PayFee;