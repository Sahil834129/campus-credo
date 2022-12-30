import { useState } from "react";
import {Form, Button} from "react-bootstrap";
import GenericDialog from "../../dialogs/GenericDialog"



export const PasswordDialog = ({show, handleClose, usersData, userId}) => {

const [selectedUserId, setSelectedUserId] = useState({})

const handle =(val)=>{
    setSelectedUserId(val)
}


    return(
        <GenericDialog  className='signin-model add-child-model' show={show} handleClose={handleClose} modalHeader='Change Password'>
            <div >
                <div >
                <Form>
                    <div>
                    <Form.Group style={{marginBottom:'5px'}}>
                        <label className="form-label"> Select User</label> 
                        <Form.Select value={selectedUserId} onChange={(e)=>{handle(e.target.value)}}>
                            <option>Select User</option>
                            {usersData.map((val)=>{
                                if(userId === val.id){
                                 return <option value={val?.roleUsers[0]?.userId}>{(val?.roleUsers[0]?.firstName || "" + " "+ val?.roleUsers[0]?.lastName || "")}</option>
                                }
                            })}
                        </Form.Select>
                    </Form.Group >
                    </div>
                    <div>
                    <Form.Group style={{marginBottom:'5px'}}>
                        <label className="form-label"> New Password</label> 
                        <Form.Control type="password"></Form.Control>
                        <label style={{fontSize:'12px', color: 'red'}}>Password is not Matched</label>
                    </Form.Group>
                    </div>
                    <div>
                    <Form.Group style={{marginBottom:'15px' }}>
                        <label className="form-label"> Confirm Password</label>    
                        <Form.Control type="password"></Form.Control>
                        <label style={{fontSize:'12px', color: 'red'}}>Password is not Matched</label>
                    </Form.Group>
                    </div>
                    <div className='model-body-col'>
                    <Form.Group className="mb-3 button-wrap" style={{width:'100px', marginLeft:'630px'}}>
                        <Button variant="primary" className='signup-btn' >Confirm</Button>
                    </Form.Group>
                    </div>
                </Form>
                </div>
            </div>
        </GenericDialog>

    )

} 