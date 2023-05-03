import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Form } from 'react-bootstrap';
import { toast } from "react-toastify";
import { ReactComponent as Save } from "../../../assets/admin/img/save.svg";
import { ReactComponent as Delete } from "../../../assets/admin/img/delete.svg";
import DateRangePicker from "../../../common/DateRangePicker";

import { removeClassAdmissionData, saveClassAdmissionData, updateSeatClassAdmissionData } from "../../../utils/services";

export default function GetTableRow({
  index,
  admissionData,
  sessionValue,
  isWritePermission,
  setFieldData,
  formData,
  fieldData,
  setFormData,
  pastSessionValue,
  convertRowData
}) {
  const admissionTypeOptions = ['Rolling', 'Fixed'];
  const [minApplicationDate, setMinApplicationDate] = useState(null);
  const [maxApplicationDate, setMaxApplicationDate] = useState(null);

  const [errors, setErros] = useState([]);

  const convertDateForSave = formDate => {
    let parseDate = null;
    if (formDate !== null) {
      parseDate = moment(formDate).format('DD/MM/YYYY');
    }
    return parseDate;
  };

  const getSessionDate = (currentDate, currentMonth, currentYears) => {
    let datePreviousYear = new Date(currentYears, currentMonth, currentDate,);
    return (datePreviousYear);
  };

  const disabledRow = (currentDate) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return currentDate ? (currentDate <= now) : false;
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

  const validateField = (data, minApplicationDate, maxApplicationDate) => {
    let isValid = true;
    const errorsVal = { vacantSeats: "", formFee: "", registrationFee: "", seatsOpen: "" };
    if (data.isOpen) {
      const vacantSeats = parseInt(data.vacantSeats);
      if (data.vacantSeats === "") {
        errorsVal.vacantSeats = "Required";
        isValid = false;
      } else if (data.vacantSeats === 0) {
        errorsVal.vacantSeats = "Total seats must be > 0";
        isValid = false;
      } else if (vacantSeats > data.capacity) {
        isValid = false;
        errorsVal.vacantSeats = "Total seats must be < capacity " + data?.capacity;
      }
      const seatsOpen = parseInt(data?.seatsOpen);
      if (!data.seatsOpen || data.seatsOpen === "") {
        errorsVal.seatsOpen = "Required";
        isValid = false;
      } else if (seatsOpen === 0) {
        errorsVal.seatsOpen = "Total seats must be > 0";
        isValid = false;
      } else if (seatsOpen > data.capacity) {
        isValid = false;
        errorsVal.seatsOpen = "Total seats must be < capacity " + data?.capacity;
      }
      if (!data.formFee) {
        isValid = false;
        errorsVal.formFee = "Required";
      } else if (parseInt(data.formFee) <= 0) {
        isValid = false;
        errorsVal.formFee = "Application Fees must be > 0";
      }
      if (data.admissionType === "Fixed" && (!data.formSubmissionStartDate || !data.formSubmissionEndDate)) {
        isValid = false;
        errorsVal.applicationDate = "Required";
      } else if (data.admissionType === "Fixed") {
        if (data.formSubmissionStartDate < minApplicationDate || data.formSubmissionEndDate > maxApplicationDate) {
          isValid = false;
          errorsVal.applicationDate = "Invalid date";
        }
      }
      if (data.personalInterviewStartDate && !data.personalInterviewEndDate) {
        isValid = false;
        errorsVal.personalInterview = "End Date Required";
      } else {
        errorsVal.personalInterview = "";
      }
      if (data.admissionTestStartDate && !data.admissionTestEndDate) {
        isValid = false;
        errorsVal.admissionTest = "End Date Required";
      } else {
        errorsVal.admissionTest = "";
      }
      if (!data.registrationFee) {
        isValid = false;
        errorsVal.registrationFee = "Required";
      } else if (parseInt(data.registrationFee) <= 0) {
        isValid = false;
        errorsVal.registrationFee = "Registration Fees must be > 0";
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
    postData.aTPI = false;
    if (payloadData.admissionType === "Fixed") {
      postData = {
        ...postData,
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
      if (postData?.admissionTestStartDate || postData?.personalInterviewStartDate) {
        postData.aTPI = true;
      }
    } else if(postData?.at || postData?.pi) {
      postData.aTPI = true;
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
            return { ...payloadData };
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
        toast.error(error?.response?.data?.apierror?.message || "Application must be submitted after today's date");
      });
  };

  const saveRowData = (rowData, index, selectedSession, minApplicationDate, maxApplicationDate) => {
    if (validateField(rowData, minApplicationDate, maxApplicationDate)) {
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
        toast.error("Error: Not able to delete data");
      });
  };

  const saveAvailableSeats = (vacantSeats, payloadData, index) => {
    updateSeatClassAdmissionData({vacantSeats, classAdmissionInfoId: admissionData?.classAdmissionInfoId})
      .then(val => {
        const saveData = fieldData.map((val, i) => {
          if (i === index) {
            return { ...payloadData, vacantSeats: vacantSeats };
          }
          return val;
        });
        setFormData(formData.map((v, i) => {
          if (i === index) {
            return { ...payloadData, vacantSeats: vacantSeats };
          }
          return { ...v };
        }));
        setFieldData(saveData.map(v => { return { ...v }; }));
      })
      .catch(error => {
        console.log(error);
        toast.error("Error: Not Able to update the Seats");
      })

  };
  useEffect(() => {
    // const sessionYears = sessionValue.split('-');
    // const selectedDate = getSessionDate(31, 2, sessionYears[0] - 1);
    // let getMinDate = selectedDate > new Date() ? selectedDate : new Date();
    // const getFixedMaxDate = getSessionDate(31, 2, sessionYears[admissionData?.admissionType === 'Fixed' ? 0 : 1]);
    // setMinApplicationDate(getMinDate);
    // setMaxApplicationDate(getFixedMaxDate);
    // let rollingMinDate = (new Date(getMinDate));
    // rollingMinDate.setDate(rollingMinDate.getDate() + 1);
    // handleData(
    //   setFieldData,
    //   `${index}.formSubmissionStartDate`,
    //   admissionData.admissionType === "Fixed" || admissionData.vacantSeats !== '' ? formData[index].formSubmissionStartDate : rollingMinDate,
    //   formData[index].admissionType
    // );
    // handleData(
    //   setFieldData,
    //   `${index}.formSubmissionEndDate`,
    //   admissionData.admissionType === "Fixed" || admissionData.vacantSeats !== '' ? formData[index].formSubmissionEndDate : getFixedMaxDate,
    //   formData[index].admissionType
    // );
  }, [admissionData, admissionData.admissionType, sessionValue]);


  return (
    <tr key={index}>
      <td>{admissionData.className}</td>
      <td>
        <div className='switch-wrapper'>
          <Form.Check
            type='switch'
            name={`${index}.isOpen`}
            id='custom-switch'
            disabled={!isWritePermission || sessionValue === pastSessionValue || disabledRow(admissionData?.formSubmissionStartDate)}
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
        </div>
      </td>
      <td>
        <Form.Select
          value={admissionData?.admissionType || ''}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          onChange={(e) => {
            minApplicationDate.setDate(minApplicationDate.getDate() + 1);
            handleData(
              setFieldData,
              `${index}.admissionType`,
              e.target.value,
              formData[index].admissionType
            );
            
            const sessionYears = sessionValue.split('-');
            const getFixedMaxDate = getSessionDate(31, 2, sessionYears[admissionData?.admissionType === 'Fixed' ? 0 : 1]);
            const selectedDate = getSessionDate(31, 2, sessionYears[0] - 1);
            let getMinDate = selectedDate > new Date() ? selectedDate : new Date();
            setMinApplicationDate(getMinDate);
            setMaxApplicationDate(getFixedMaxDate);
            let rollingMinDate = (new Date(getMinDate));
            rollingMinDate.setDate(rollingMinDate.getDate() + 1); 
            handleData(
              setFieldData,
              `${index}.formSubmissionEndDate`,
              e.target.value === "Fixed" ? null : getFixedMaxDate,
              formData[index].formSubmissionEndDate
            );
            handleData(
              setFieldData,
              `${index}.formSubmissionStartDate`,
              e.target.value === "Fixed" ? null : rollingMinDate,
              formData[index].formSubmissionStartDate
            );
          }}
          size='sm'>
          {admissionTypeOptions.map((val, index) => (
            <option value={val} key={`select${index}`}>{val}</option>
          ))}
        </Form.Select>
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.seatsOpen ? 'column' : 'row') }}>
        <Form.Control
          size='sm'
          type='number'
          name={`${index}.seatsOpen`}
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          value={admissionData?.seatsOpen || ''}
          disabled={!isWritePermission || formData[index]?.seatsOpen || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
          required
          min="1"
          max={admissionData.capacity}
          onPaste={e => e.preventDefault()}
          onChange={e => {
            handleData(
              setFieldData,
              `${index}.seatsOpen`,
              e.target.value,
              formData[index]?.seatsOpen || ''
            );
          }}
        />
        {errors?.seatsOpen && <span className="error-exception">{errors.seatsOpen}</span>}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.vacantSeats ? 'column' : 'row') }}>
        <Form.Control
          size='sm'
          type='number'
          name={`${index}.vacantSeats`}
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          value={admissionData?.vacantSeats || ''}
          disabled={!isWritePermission || !admissionData?.isOpen }
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
          onBlur={e => {
            if(!!(!isWritePermission || sessionValue === pastSessionValue || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate))) {
              saveAvailableSeats(e.target.value, admissionData, index)
            }   
          }}
        />
        {errors?.vacantSeats && <span className="error-exception">{errors.vacantSeats}</span>}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.applicationDate ? 'column' : 'row') }}>
        <DateRangePicker
          required
          dateRanges={[
            admissionData?.formSubmissionStartDate,
            admissionData?.formSubmissionEndDate
          ]}
          fixedEndDate={admissionData?.admissionType === "Rolling"}
          minDate={minApplicationDate}
          maxDate={maxApplicationDate}
          dateRangeValue={[
            formData[index]?.formSubmissionStartDate,
            formData[index]?.formSubmissionEndDate
          ]}
          fieldName={[
            `${index}.formSubmissionStartDate`,
            `${index}.formSubmissionEndDate`
          ]}
          setFieldData={setFieldData}
          handleData={handleData}
          disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
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
        {errors?.applicationDate && <span className="error-exception">{errors.applicationDate}</span>}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.personalInterview ? 'column' : 'row') }}>
        {admissionData.admissionType === 'Fixed' ?
          <>
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
            />
            {errors?.personalInterview && <span className="error-exception">{errors.personalInterview}</span>}
          </>
          : (
            <>
              <Form.Check
                checked={admissionData?.pi}
                disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
                onChange={e => {
                  handleData(
                    setFieldData,
                    `${index}.pi`,
                    e.target.checked,
                    formData[index]?.pi || ''
                  );
                }}
              />
            </>
          )}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.admissionTest ? 'column' : 'row') }}>
        {admissionData.admissionType === 'Fixed' ?
          <>
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
            />
            {errors?.admissionTest && <span className="error-exception">{errors.admissionTest}</span>}
          </>
          : <>
            <Form.Check
              checked={admissionData?.at}
              disabled={!isWritePermission || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)}
              onChange={e => {
                handleData(
                  setFieldData,
                  `${index}.at`,
                  e.target.checked,
                  formData[index]?.at || ''
                );
              }} />
          </>}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.formFee ? 'column' : 'row') }}>
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
        {errors?.formFee && <span className="error-exception">{errors.formFee}</span>}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', flexDirection: (errors?.registrationFee ? 'column' : 'row') }}>
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
        {errors?.registrationFee && <span className="error-exception">{errors.registrationFee}</span>}
      </td>
      <td className="action-cell">
        <Save 
          onClick={() => {
            if(!(!isWritePermission || sessionValue === pastSessionValue || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate)))
              saveRowData(admissionData, index, sessionValue, minApplicationDate, maxApplicationDate); 
          }} 
          style={{ cursor: "pointer" }}
        />
        <Delete 
          onClick={() => { 
            if(!(!isWritePermission || sessionValue === pastSessionValue || !admissionData?.isOpen || disabledRow(admissionData?.formSubmissionStartDate))){
              deleteRowData(admissionData, fieldData, sessionValue); 
            } 
          }}
          style={{ cursor: "pointer" }} 
        />
      </td>
    </tr>
  );
}