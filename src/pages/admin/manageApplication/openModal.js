import Button from '../../../components/form/Button';

import { useEffect, useState } from "react";
import { getActionButtonLabel } from "../../../utils/helper";

import moment from "moment";
import { Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import AlertDialog from "../../../common/AlertDialog";
import { SCHOOL_APPLICATION_STATUS } from "../../../constants/app";
import GenericDialog from "../../../dialogs/GenericDialog";
import { parseDateWithDefaultFormat } from "../../../utils/DateUtil";
import { updateApplicationStatus, updateBulkApplicationStatus } from "../../../utils/services";

const ShowWarningMessage = ({ errorList }) => {
  return (
    <div className='status-result-grid'>
      <div className='result-row header'>
        <div className='cell'>Application Id</div>
        <div className='cell'>Application Request Status</div>
      </div>

      {Object.keys(errorList).map(val => {
        return (
          <div className='result-row content-body'>
            <div className='cell'>{val}</div>
            <div className='cell'>{errorList[val]}</div>
          </div>
        );
      })}

    </div>
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
  callAllApi,
  classId,
  setApiError,
  atPiData,
  sessionValue,
  isAtPiData
}) {
  const [remark, setRemarks] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorList, setErrorList] = useState({});
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [atPiDate, setATPIDate] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const handleClose = () => {
    setRemarks('');
    setApplicationId('');
    setApplicationStatus('');
    setATPIDate(null);
    setShow(false);
    setValidationErrors({});
  };

  const handleSubmit = (note, status, appId, selectDate) => {
    let payloadData = {
      applicationId: appId,
      applicationStatus: status,
      remarks: note,
    };

    if (status === SCHOOL_APPLICATION_STATUS.AT_PI) {
      if (selectDate) {
        const apiDate = moment(selectDate).format('DD/MM/YYYY H:mm');
        payloadData = {
          ...payloadData,
          applicantATPITimeSlot: apiDate
        };
      } else {
        setValidationErrors(val => {
          return {
            ...val,
            'atPiDate': 'Required *'
          };
        });
        return;
      }
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
            callAllApi(classId, sessionValue);
          }

        });
    } else {
      updateApplicationStatus(payloadData)
        .then(response => {
          callAllApi(classId, sessionValue);
        })
        .catch(res => {
          const messageData = res?.response?.data?.apierror?.message;
          setApiError(messageData);
        });
    }
    handleClose();
  };

  const getSessionDate = (currentDate, currentMonth, currentYears) => {
    let datePreviousYear = new Date(currentYears, currentMonth, currentDate,);
    return (datePreviousYear);
  };

  useEffect(() => {
    console.log(atPiData);
    if (atPiData?.ATScheduleStartDate) {
      setMinDate(moment.min([moment(parseDateWithDefaultFormat(atPiData?.ATScheduleStartDate)), moment(parseDateWithDefaultFormat(atPiData?.PIScheduleStartDate))]).toDate());
      setMaxDate(moment.max([moment(parseDateWithDefaultFormat(atPiData?.ATScheduleEndDate)), moment(parseDateWithDefaultFormat(atPiData?.PIScheduleEndDate))]).toDate());
    } else {
      const sessionYears = sessionValue.split('-');
      const selectedDate = getSessionDate(31, 2, sessionYears[0] - 1);
      let getMinDate = selectedDate > new Date() ? selectedDate : new Date();
      const getFixedMaxDate = getSessionDate(31, 2, sessionYears[1]);
      setMinDate(getMinDate);
      setMaxDate(getFixedMaxDate);
    }
  }, [atPiData]);

  return (
    <>
      <GenericDialog className='confirmation-modal' modalHeader={getActionButtonLabel(applicationStaus)} show={show} handleClose={handleClose}>
        <div className='model-body-col'>
          <div className="message-content" style={{ marginBottom: '10px' }}>
            <Form.Label className='form-label'>Add your remarks below</Form.Label>
            <textarea className='form-control' rows={5} value={remark} onChange={e => setRemarks(e.target.value)} />
          </div>
          {isAtPiData && SCHOOL_APPLICATION_STATUS.AT_PI === applicationStaus && (
            <div className='inner-container option-filter'>
              <Form.Label className='form-label'>AT/PI Time Slot <span className='required'>*</span></Form.Label>
              <div className='radio-choice'>
                <div className="react-datepicker-withinput">
                  {/* {JSON.stringify(minDate)}-{JSON.stringify(maxDate)} */}
                  <Form.Control
                    size='sm'
                    type='text'
                    readOnly
                    value={atPiDate ? moment(atPiDate).format('DD/MM/yyyy h:mm a'): ""}
                    placeholder='Select Date Range'
                  />
                  <ReactDatePicker
                    selected={atPiDate}
                    onChange={(date) => setATPIDate(date)}
                    minDate={minDate}
                    maxDate={maxDate}
                    // timeInputLabel="Time:"
                    // dateFormat="dd/MM/yyyy h:mm aa"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={15}
                    dateFormat="Pp"
                    inline
                  />
                  {
                    validationErrors['atPiDate'] ? (
                      <div className="error-exception">{validationErrors['atPiDate']}</div>
                    ) : null
                  }
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="button-wrap" style={{ marginTop: '20px', justifyContent: 'end', display: 'flex' }}> */}
        <div className="button-wrapper">

          <Button class='save-btn' onClick={() => {
            handleSubmit(remark, applicationStaus, applicationId, atPiDate);
          }} buttonLabel='Save' />
          <Button class='cancel-btn' onClick={handleClose} buttonLabel='Cancel' />
        </div>
      </GenericDialog>
      <AlertDialog
        show={showAlert}
        message={''}
        handleClose={() => {
          setShowAlert(false);
          callAllApi(classId, sessionValue);
        }}>
        <ShowWarningMessage errorList={errorList} />
      </AlertDialog>
    </>
  );
}