import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import GenericDialog from "../../../dialogs/GenericDialog";
import { changeUserPassword } from "../../../utils/services";

export const PasswordDialog = ({ show, handleClose, usersData }) => {
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [emptySelectedUserId, setEmptySelectedUserId] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const changePasswordDetails = { userId: '', password: '' };
    if (password !== '' && confirmPassword !== '' && selectedUserId !== '0') {
      setEmptySelectedUserId(false);
      if (password === confirmPassword) {
        changePasswordDetails['password'] = password;
        changePasswordDetails['userId'] = selectedUserId;
        setIsloading(true);
        changeUserPassword(changePasswordDetails)
          .then(res => {
            toast.success('Password is reset');
            setIsloading(false);
            handleClose();
          })
          .catch(e => {
            setIsloading(false);
            console.log(e);
          });
      } else {
        setIsPasswordMatch(true);
      }
    } else {
      password === '' ? setEmptyPassword(true) : setEmptyPassword(false);
      confirmPassword === '' ? setEmptyConfirmPassword(true) : setEmptyConfirmPassword(false);
      selectedUserId === '0' ? setEmptySelectedUserId(true) : setEmptySelectedUserId(false);
    }
  };

  const handle = (val) => {
    setSelectedUserId(val);
  };

  return (
    <GenericDialog className='change-pwd-model' show={show} handleClose={handleClose} modalHeader='Change Password'>
      
          {!isLoading && (
            <Form onSubmit={handlePasswordSubmit}>
              <div className="">
                <Form.Group style={{ marginBottom: '5px' }}>
                  <label className="form-label"> Select User</label>
                  <Form.Select value={selectedUserId} onChange={(e) => { handle(e.target.value); setEmptySelectedUserId(false); }}>
                    <option value='0'>Select User</option>
                    {usersData.map((val) => {
                      return <option key={`selectedUser:${val.id}`} value={val?.userId}>{`${val?.firstName} ${val?.lastName}`}</option>;
                    })}
                  </Form.Select>
                </Form.Group >
                {emptySelectedUserId && <label style={{ color: 'red', fontSize: '13px' }}> Select User</label>}
              </div>
              <div className="">
                <Form.Group style={{ marginBottom: '5px' }}>
                  <label className="form-label"> New Password</label>
              <div className="pwd-fld-inner">
                <Form.Control
                  type={passwordType}
                  minLength="8"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setEmptyPassword(false);
                    setIsPasswordMatch(false);
                  }}
                />
                <span
                  className="view-pwd-icon"
                  onClick={() => {
                    togglePassword();
                  }}
                >
                  {passwordType === "password" ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              {emptyPassword && (
                <label style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Enter Password
                </label>
              )}
              {isPasswordMatch && (
                <label style={{ fontSize: "12px", color: "red" }}>
                  Password is not Matched
                </label>
              )}
            </Form.Group>
          </div>
          <div className="frm-cell mt-3">
            <Form.Group style={{ marginBottom: "15px" }}>
              <label className="lbl"> Confirm Password</label>
              <div className="pwd-fld-inner">
                <Form.Control
                  type={confirmPasswordType}
                  placeholder="Confirm Password"
                  minLength="8"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setEmptyConfirmPassword(false);
                    setIsPasswordMatch(false);
                  }}
                />
                <span
                  className="view-pwd-icon"
                  onClick={() => {
                    toggleConfirmPassword();
                  }}
                >
                  {confirmPasswordType === "password" ? (
                    <i className="bi bi-eye-slash"></i>
                  ) : (
                    <i className="bi bi-eye"></i>
                  )}
                </span>
              </div>
              {emptyConfirmPassword && (
                <label style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  Enter Confirm Password
                </label>
              )}
              {isPasswordMatch && (
                <label style={{ fontSize: "12px", color: "red" }}>
                  Password is not Matched
                </label>
              )}
            </Form.Group>
          </div>
              <div className='btn-wrapper'>
              
                  <Button variant="primary" className='cancel-btn' onClick={handleClose} >Cancel</Button>
                  <Button type="submit" variant="primary" className='confirm-btn' >Confirm</Button>
             
              </div>
            </Form>
          )}
          {isLoading && <div style={{ margin: '50px auto' }}><Spinner animation="border" /></div>}
        
      
    </GenericDialog>
  );
}; 