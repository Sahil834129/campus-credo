import Modal from 'react-bootstrap/Modal';
import Button from '../../../components/form/Button';

import { useState } from "react";
import { humanize } from "../../../utils/helper";

import { updateApplicationStatus, updateBulkApplicationStatus } from "../../../utils/services";
import { SCHOOL_APPLICATION_STATUS } from "../../../constants/app";
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import GenericDialog from "../../../dialogs/GenericDialog";
import AlertDialog from "../../../common/AlertDialog";
import { parseDateWithDefaultFormat } from "../../../utils/DateUtil";

const ShowWarningMessage = ({ errorList }) => {
  return (
    <table>
      <tbody>
        {Object.keys(errorList).map(val => {
          return (
            <tr>
              <td style={{ width: '30%' }}>{val}</td>
              <td>{errorList[val]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default function OpenModal({
  show,
  isBulkOperation,
  setShow,
  applicationStaus,
  applicationId,
  setApplicationId,
  setApplicationStatus,
  fetchClassApplication,
  classId,
  setApiError,
  atPiData,
  isAtPiData
}) {
  const [remark, setRemarks] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState({});
  const minDate = moment.min([moment(parseDateWithDefaultFormat(atPiData?.ATScheduleStartDate)), moment(parseDateWithDefaultFormat(atPiData?.PIScheduleStartDate))]);
  const maxDate = moment.max([moment(parseDateWithDefaultFormat(atPiData?.ATScheduleEndDate)), moment(parseDateWithDefaultFormat(atPiData?.PIScheduleEndDate))]);
  const [atPiDate, setATPIDate] = useState(null);
  const handleClose = () => {
    setRemarks('');
    setApplicationId('');
    setApplicationStatus('');
    setATPIDate(null);
    setShow(false);
  };

  const handleSubmit = (note, status, appId, selectDate) => {
    let payloadData = {
      applicationId: appId,
      applicationStatus: status,
      remarks: note,
    };
    if (status === SCHOOL_APPLICATION_STATUS.AT_PI && selectDate !== null) {
      const apiDate = moment(selectDate).format('DD/MM/YYYY H:mm');
      payloadData = {
        ...payloadData,
        applicantATPITimeSlot: apiDate
      };
    }
    if (isBulkOperation) {
      payloadData = {
        applicationIdList: appId,
        applicationStatus: status,
        remarks: note,
      };
      updateBulkApplicationStatus(payloadData)
        .then(response => {
          if (!response.data.success) {
            setErrorList(response.data);
            setShowAlert(true);
          } else {
            setErrorList({});
            setShowAlert(false);
            fetchClassApplication(classId);
          }

        });
    } else {
      updateApplicationStatus(payloadData)
        .then(response => {
          fetchClassApplication(classId);
        })
        .catch(res => {
          const messageData = res?.response?.data?.apierror?.message;
          setApiError(messageData);
        });
    }
    handleClose();
  };

  return (
    <>
      <GenericDialog className='signin-model add-child-model' modalHeader={humanize(applicationStaus)} show={show} handleClose={handleClose}>
        <div className='model-body-col'>
          <div className="message-content" >
            <Form.Label className='form-label'>Add your remarks below</Form.Label>
            <textarea className='form-control' rows={10} value={remark} onChange={e => setRemarks(e.target.value)} />
          </div>
          {isAtPiData && SCHOOL_APPLICATION_STATUS.AT_PI === applicationStaus && (
            <div className='inner-container option-filter'>
              <Form.Label className='form-label'>AT/PI Time Slot</Form.Label>
              <div className='radio-choice'>
                {/* {JSON.stringify(minDate)}-{JSON.stringify(maxDate)} */}
                <ReactDatePicker
                  selected={atPiDate}
                  onChange={(date) => setATPIDate(date)}
                  minDate={minDate.toDate()}
                  maxDate={maxDate.toDate()}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  showTimeInput
                  placeholderText="dd/MM/yyyy h:mm aa"
                />
              </div>
            </div>
          )}
        </div>
        <div className="frm-cell button-wrap" style={{ marginTop: '20px', justifyContent: 'end', display: 'flex' }}>
          <Button class='cancel-btn mx-2' onClick={handleClose} buttonLabel='Cancel' />
          <Button class='save-btn' onClick={() => {
            handleSubmit(remark, applicationStaus, applicationId, atPiDate);
          }} buttonLabel='Save' />
        </div>
      </GenericDialog>
      <AlertDialog
        show={showAlert}
        message={''}
        handleClose={() => {
          setShowAlert(false);
          fetchClassApplication(classId);
        }}>
        <ShowWarningMessage errorList={errorList} />
      </AlertDialog>
    </>
  );
}