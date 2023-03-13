import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { Button, Form } from 'react-bootstrap';

import { getPastSession, getLocalData } from "../../../utils/helper";
import DateRangePicker from "../../../common/DateRangePicker";
import { convertDate } from "../../../utils/DateUtil";
import { removeClassAdmissionData, saveClassAdmissionData } from "../../../utils/services";

export default function GetTableRow({
  index,
  admissionData,
  sessionValue,
  isWritePermission,
  setFieldData,
  formData,
  fieldData,
  setFormData,
  sessionEndDate,
  sessionStartDate,
  convertRowData
}) {

  const admissionTypeOptions = ['Rolling', 'Fixed'];
  const [errors, setErros] = useState([]);

  const convertDateForSave = formDate => {
    let parseDate = null;
    if (formDate !== null) {
      parseDate = moment(formDate).format('DD/MM/YYYY');
    }
    return parseDate;
  };


  const getYesterdayDate = () => {
    let now = new Date();
    now.setHours(0, 0, 0, 0);
    now.setDate(now.getDate() - 1);
    return now;
  };

  const disabledRow = (currentDate) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return currentDate ? (currentDate < now) : false;
  };

  const handleData = (setFieldData, fieldName, value, initialValue) => {
    const fields = fieldName.split('.');
    setFieldData(val => {
      return val.map((v, index) => {
        if (index === parseInt(fields[0])) {
          v[fields[1]] = value;
        }
        return v;
      });
    });
  };

  const validateField = (data) => {
    let isValid = true;
    const errorsVal = { vacantSeats: "", formFee: "", registrationFee: "" };
    if (data.isOpen) {
      const vacantSeats = parseInt(data.vacantSeats);
      if (data.vacantSeats === "") {
        isValid = false;
        errorsVal.vacantSeats = "Total seats required field";
      } else if (vacantSeats > data.capacity) {
        isValid = false;
        errorsVal.vacantSeats = "Total seats must be less than Capacity " + data?.capacity;
      }
      if (!data.formFee) {
        isValid = false;
        errorsVal.formFee = "Application Fees required field";
      }
      if (data.admissionType === "Fixed" && (!data.formSubmissionStartDate || !data.formSubmissionEndDate)) {
        isValid = false;
        errorsVal.applicationDate = "Application Date is required field";
      }
      if (!data.registrationFee) {
        isValid = false;
        errorsVal.registrationFee = "Registration Fees required field";
      }
      setErros(errorsVal);
      return isValid;
    }
  };

  const handleSubmitData = (payloadData, index, selectedSession) => {
    let postData = JSON.parse(JSON.stringify(payloadData));
    postData = {
      ...postData,
      formSubmissionStartDate: convertDateForSave(
        postData?.formSubmissionStartDate || null
      ),
      formSubmissionEndDate: convertDateForSave(
        postData?.formSubmissionEndDate || null
      ),
      admissionSession: selectedSession,
    };
    if (payloadData.admissionType === "Rolling") {
      postData = {
        ...postData,
        formSubmissionStartDate: convertDateForSave(
          sessionStartDate || null
        ),
        formSubmissionEndDate: convertDateForSave(
          sessionEndDate || null
        ),
        admissionTestStartDate: convertDateForSave(
          postData?.admissionTestStartDate || null
        ),
        admissionTestEndDate: convertDateForSave(
          postData?.admissionTestEndDate || null
        ),
        personalInterviewStartDate: convertDateForSave(
          postData?.personalInterviewStartDate || null
        ),
        personalInterviewEndDate: convertDateForSave(
          postData?.personalInterviewEndDate || null
        ),
      };
    }
    delete postData?.isOpen;
    delete postData?.className;
    delete postData?.schoolName;
    delete postData?.classOrder;
    delete postData?.fee;
    let apiCall;
    postData = [{ ...postData }];
    apiCall = saveClassAdmissionData(postData);
    apiCall
      .then((data) => {
        const saveData = fieldData.map((val, i) => {
          if (i === index) {
            return payloadData;
          }
          return val;
        });
        setFormData(formData.map((v, i) => {
          if (i === index) {
            return { ...payloadData };
          }
          return { ...v };
        }));
        setFieldData(saveData.map(v => { return { ...v }; }));
        toast.success("Admission Details are saved");
      })
      .catch((error) => {
        toast.error("Error: Not able to save data");
      });
  };

  const saveRowData = (rowData, index, selectedSession) => {
    if (validateField(rowData)) {
      handleSubmitData(rowData, index, selectedSession);
    }
  };

  const deleteRowData = (rowData, tableData, selectedSession) => {
    removeClassAdmissionData(selectedSession, rowData?.classId)
      .then(data => {
        const deletedData = (data.data).find(val => val.classId === rowData?.classId);
        const saveData = tableData.map((val, i) => {
          if (val.classId === rowData?.classId) {
            return { ...convertRowData(deletedData) };
          }
          return val;
        });
        setFormData(formData.map((v, i) => {
          if (v.classId === rowData?.classId) {
            return { ...convertRowData(deletedData) };
          }
          return { ...v };
        }));
        setFieldData(saveData.map(v => { return { ...v }; }));
        toast.success("Admission Details is Deleted");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error: Not able to delete data");
      });
  };

  return (
    <tr key={index}>
      <td>{admissionData.className}</td>
      <td>
        <div className='switch-wrapper'>
          <Form.Label className='no'>
            No
          </Form.Label>
          <Form.Check
            type='switch'
            name={`${index}.isOpen`}
            id='custom-switch'
            disabled={!isWritePermission || disabledRow(admissionData?.formSubmissionStartDate)}
            checked={admissionData.isOpen}
            onChange={e => {
              handleData(
                setFieldData,
                `${index}.isOpen`,
                e.target.checked,
                formData[index].isOpen
              );
            }}
          />
          <Form.Label className='yes'>
            Yes
          </Form.Label>
        </div>
      </td>
      <td>
        <Form.Select
          value={admissionData?.admissionType || ''}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onChange={(e) => {
            handleData(
              setFieldData,
              `${index}.admissionType`,
              e.target.value,
              formData[index].admissionType
            );
          }}
          size='sm'>
          {admissionTypeOptions.map((val, index) => (
            <option value={val} key={`select${index}`}>{val}</option>
          ))}
        </Form.Select>
      </td>
      <td style={{ display: 'flex', flexDirection: (errors?.vacantSeats ? 'column' : 'row') }}>
        <Form.Control
          size='sm'
          type='number'
          name={`${index}.vacantSeats`}
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          value={admissionData?.vacantSeats || ''}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          required
          min="1"
          max={admissionData.capacity}
          onPaste={e => e.preventDefault()}
          onChange={e => {
            handleData(
              setFieldData,
              `${index}.vacantSeats`,
              e.target.value,
              formData[index]?.vacantSeats || ''
            );
          }}
        />
        {errors?.vacantSeats && <span style={{ color: 'red' }}>{errors.vacantSeats}</span>}
      </td>
      <td style={{ display: 'flex', flexDirection: (errors?.vacantSeats ? 'column' : 'row') }}>
        <DateRangePicker
          required
          dateRanges={[
            admissionData.admissionType === "Fixed" ? (admissionData?.formSubmissionStartDate || null) : sessionStartDate,
            admissionData.admissionType === "Fixed" ? (admissionData?.formSubmissionEndDate || null) : sessionEndDate,
          ]}
          minDate={getYesterdayDate()}
          dateRangeValue={[
            admissionData.admissionType === "Fixed" ? (formData[index]?.formSubmissionStartDate) : sessionStartDate,
            admissionData.admissionType === "Fixed" ? (formData[index]?.formSubmissionEndDate) : sessionEndDate
          ]}
          fieldName={[
            `${index}.formSubmissionStartDate`,
            `${index}.formSubmissionEndDate`
          ]}
          setFieldData={setFieldData}
          handleData={handleData}
          disabled={admissionData.admissionType === "Rolling" || !isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          clearDependentValue={() => {
            handleData(
              setFieldData,
              `${index}.admissionTestEndDate`,
              '',
              formData[index]?.admissionTestEndDate || ''
            );
            handleData(
              setFieldData,
              `${index}.admissionTestStartDate`,
              '',
              formData[index]?.admissionTestStartDate || ''
            );
            handleData(
              setFieldData,
              `${index}.personalInterviewStartDate`,
              '',
              formData[index]?.personalInterviewStartDate || ''
            );
            handleData(
              setFieldData,
              `${index}.personalInterviewEndDate`,
              '',
              formData[index]?.personalInterviewEndDate || ''
            );
          }}
        />
        {errors?.applicationDate && <span style={{ color: 'red' }}>{errors.applicationDate}</span>}
      </td>
      <td>
        {admissionData.admissionType === 'Fixed' ?
          <DateRangePicker
            dateRanges={[
              admissionData?.admissionTestStartDate ||
              null,
              admissionData?.admissionTestEndDate ||
              null
            ]}
            dateRangeValue={[
              formData[index]?.admissionTestStartDate,
              formData[index]?.admissionTestEndDate
            ]}
            fieldName={[
              `${index}.admissionTestStartDate`,
              `${index}.admissionTestEndDate`
            ]}
            setFieldData={setFieldData}
            minDate={admissionData?.formSubmissionEndDate}
            handleData={handleData}
            disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}

          /> : (
            <>
              <Form.Check
                checked={admissionData?.aTPI}
                disabled />
            </>
          )}
      </td>
      <td>
        {admissionData.admissionType === 'Fixed' ?
          <DateRangePicker
            dateRanges={[
              admissionData?.personalInterviewStartDate ||
              null,
              admissionData?.personalInterviewEndDate ||
              null
            ]}
            dateRangeValue={[
              formData[index]?.personalInterviewStartDate,
              formData[index]?.personalInterviewEndDate
            ]}
            fieldName={[
              `${index}.personalInterviewStartDate`,
              `${index}.personalInterviewEndDate`
            ]}
            setFieldData={setFieldData}
            minDate={admissionData?.formSubmissionEndDate}
            handleData={handleData}
            disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          /> : <>
            <Form.Check
              checked={admissionData?.aTPI}
              disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
              onChange={e => {
                handleData(
                  setFieldData,
                  `${index}.aTPI`,
                  e.target.checked,
                  formData[index]?.aTPI || ''
                );
              }} />
          </>}
      </td>
      <td style={{ display: 'flex', flexDirection: (errors?.formFee ? 'column' : 'row') }}>
        <Form.Control
          size='sm'
          min="1"
          type='number'
          required
          onPaste={e => e.preventDefault()}
          name={`${index}.formFee`}
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          value={admissionData?.formFee || ''}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onChange={e => {
            handleData(
              setFieldData,
              `${index}.formFee`,
              e.target.value,
              formData[index]?.formFee || ''
            );
          }}
        />
        {errors?.formFee && <span style={{ color: 'red' }}>{errors.formFee}</span>}
      </td>
      <td style={{ display: 'flex', flexDirection: (errors?.registrationFee ? 'column' : 'row') }}>
        <Form.Control
          size='sm'
          type='number'
          required
          min="1"
          name={`${index}.registrationFee`}
          value={admissionData?.registrationFee || ''}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onPaste={e => e.preventDefault()}
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          onChange={e => {
            handleData(
              setFieldData,
              `${index}.registrationFee`,
              e.target.value,
              formData[index]?.registrationFee || ''
            );
          }}
        />
        {errors?.registrationFee && <span style={{ color: 'red' }}>{errors.registrationFee}</span>}
      </td>
      <td>
        <Button
          className='save-btn'
          disabled={!isWritePermission || sessionValue === getPastSession() || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onClick={() => { saveRowData(admissionData, index, sessionValue); }}
        >
          Save
        </Button>
        <Button
          className='delete-btn'
          disabled={!isWritePermission || sessionValue === getPastSession() || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onClick={() => { deleteRowData(admissionData, fieldData, sessionValue); }}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}