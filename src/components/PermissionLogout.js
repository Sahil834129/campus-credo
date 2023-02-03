import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericDialog from "../dialogs/GenericDialog";
import { setUserHavePermission } from "../redux/actions/userAction";
import { logout } from "../utils/helper";
import Button from "./form/Button";

export default function PermissionLogout() {
  const [show, setShow] = useState(false);
  const havePermission = useSelector(state => state?.userData?.havePermission || false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    dispatch(setUserHavePermission(false));
    logout();
  };

  useEffect(() => {
    setShow(havePermission);
  }, [havePermission]);
  return (
    <GenericDialog className='confirmation-modal' modalHeader={"Permission"} show={show} handleClose={handleClose}>
      <p>You dont have sufficient permission. Please Re-login</p>
      <div className="btn-wrapper">
        <Button class='save-btn btn btn-primary' onClick={() => {
          handleClose();
        }} buttonLabel='Ok' />
      </div>
    </GenericDialog>
  );
}