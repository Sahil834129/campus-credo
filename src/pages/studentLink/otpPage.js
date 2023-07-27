
import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import { verifyParentStudent } from '../../utils/services';


const OtpPage = ({ searchResponse, displayCss, setPage, userId }) => {

    const [otp, setOtp] = useState("");

    const handleOtpChange = (otps) => {
        setOtp(otps);
    };


    const handleOtpSubmit = () => {
        const payload = {
            "userId": userId,
            "otp": otp
        }
        console.log('payload', payload)
        verifyParentStudent(payload)
            .then(res => setPage(2))
            .catch(err => {
                toast.error(err?.response?.data?.apierror?.message || "Please Check OTP")
            })
    }

    return (
        <div className='esf-content-inner' 
        
        // style={{
        //     margin: '10px 20px 20px 10px',
        //     width: '100%',
        //     height: '100%'
        // }}
        
        >
            {(searchResponse !== 2)
                ? <div className='no-record-panel' style={{
                    border: '1px solid red',
                    backgroundColor: 'rgba(255,192,203, .4) ',
                    borderRadius: '5px',
                    width: '100%',
                    height: '100%',
                    padding: '30px',
                    marginBottom: '10px',
                    display: `${displayCss ? 'none' : ''}`
                }}
                
                >
                    <h6 style={{ color: 'red' }}>Oops! Student records doesnt not match </h6>
                    <h6 style={{ color: 'grey' }}>Sorry we are unable to match provided information with our records, Please recheck and input your information or talk to admin for further assistance.</h6>
                </div>
                : <div className='success-block'
                
                style={{
                    border: '1px solid lightGrey',
                    backgroundColor: 'rgba(242,242,242, .4) ',
                    borderRadius: '5px',
                    width: '100%',
                    height: '100%',
                    padding: '30px',
                    marginBottom: '10px',
                    display: `${displayCss ? '' : 'none'}`
                }}
                
                >
                    <h6 style={{ color: 'green' }}>Student Verified Successfully </h6>
                    <h6 style={{ color: 'grey' }}>Student's information is successfully matched with our records. Now proceed further please enter OTP recieved in your registered mobile number. </h6>
                </div>
            }
            <div className='cell-block'
            
            style={{
                // border: '1px solid lightGrey', 
                // borderRadius: '5px', 
                padding: '0px 70px',
                paddingTop:`${searchResponse === 0? '160px':'65px'}`,
                height:`${searchResponse === 0? '491px':'308px'}`
            }}
            
            >
                <h5 style={{ display: 'flex', justifyContent: 'center',  }}>Validate Mobile Number</h5>
                <p style={{ display: 'flex', justifyContent: 'center', textAlign:'center' }}>
                    Enter OTP Shared on Your registered
                    Mobile Number
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form >
                        <Form.Group style={{ display: 'flex', justifyContent: 'center' }}>
                            <div>
                                <div >
                                    <OtpInput
                                        onChange={handleOtpChange}
                                        numInputs={4}
                                        isDisabled={!(searchResponse === 2)}
                                        isInputNum={true}
                                        shouldAutoFocus
                                        value={otp}
                                        placeholder="----"
                                        inputStyle={{
                                            width: "52px",
                                            height: "52px",
                                            caretColor: "#000000",
                                            border:'1px solid lightGrey',
                                            borderRadius:'5px',
                                            margin:'10px'
                                        }}
                                    />
                                </div>
                            </div>
                        </Form.Group>
                        <Form.Group style={{ display: 'flex', justifyContent: 'center', marginTop:'20px'}}>
                            <Button
                            disabled={!(searchResponse === 2)}
                            style={{
                                border:`${searchResponse===2? '': '1px solid lightGrey'}`,
                                backgroundColor:`${searchResponse===2? '': 'lightGrey'}`
                            }}
                            onClick={handleOtpSubmit}
                            >
                                Validate OTP
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}


export default OtpPage;