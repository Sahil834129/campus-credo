import { Field, FieldArray, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateRangePicker from '../../common/DateRangePicker';
import {
  getClassAdmissionData, getClassAdmissionSessionData, saveClassAdmissionData
} from '../../utils/services';
import Layout from './layout';

const initialFormData = undefined;

export const ManageAdmission = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [changedData, setChangedData] = useState({});
  const [sessionValue, setSessionValue] = useState(null);
  const [sessionOption, setSessionOption] = useState([]);

  const handleData = (setFieldData, fieldName, value, initialValue) => {
    setFieldData(fieldName, value);
    setChangedData(val => {
      return {
        ...val,
        [fieldName]: initialValue
      };
    });
  };

  const fetchAdmissionSession = () => {
    getClassAdmissionSessionData()
      .then(response => {
        setSessionOption(response.data);
        setSessionValue(response.data[1])
      })
      .catch(error => {
        console.log(error);
      });
  };
  const converDate = (currentDate) => {
    if (currentDate) {
      const currentDateArr = currentDate.split("/");
      return new Date(`${currentDateArr[1]}/${currentDateArr[0]}/${currentDateArr[2]}`)
    }
    return null
  }

  const fetchClassAdmissionData = (session) => {
    getClassAdmissionData(session)
      .then(response => {
        if (response.status === 200) {
          const data = response.data.map(val => {
            val.isOpen =
              val.formSubmissionStartDate && val.formSubmissionEndDate;
            val.formSubmissionStartDate = converDate(val?.formSubmissionStartDate || null);
            val.formSubmissionEndDate = converDate(val?.formSubmissionEndDate || null);
            val.admissionTestStartDate = converDate(val?.admissionTestStartDate || null);
            val.admissionTestEndDate = converDate(val?.admissionTestEndDate || null);
            val.personalInterviewStartDate =
              converDate(val?.personalInterviewStartDate || null);
            val.personalInterviewEndDate = converDate(val?.personalInterviewEndDate || null);
            val.formFee = val?.formFee || null;
            val.registrationFee = val?.registrationFee || null;
            return val;
          });
          setFormData(data);
        }
      })
      .catch(error => {
        console.log('Error while getting cities list' + error);
      });
  };

  const convertDateForSave = formDate => {
    let parseDate = null;

    if (formDate !== null) {
      parseDate = moment(formDate).format('DD/MM/YYYY');
    }
    return parseDate;
  };

  const handleSubmitData = (formData, selectedSession) => {
    let postData = formData.data;
    postData = postData.filter(val => val.isOpen);
    postData = postData.map(val => {
      val.formSubmissionStartDate = convertDateForSave(
        val?.formSubmissionStartDate || null
      );
      val.formSubmissionEndDate = convertDateForSave(
        val?.formSubmissionEndDate || null
      );
      val.admissionTestStartDate = convertDateForSave(
        val?.admissionTestStartDate || null
      );
      val.admissionTestEndDate = convertDateForSave(
        val?.admissionTestEndDate || null
      );
      val.personalInterviewStartDate = convertDateForSave(
        val?.personalInterviewStartDate || null
      );
      val.personalInterviewEndDate = convertDateForSave(
        val?.personalInterviewEndDate || null
      );
      val.admissionSession = selectedSession;
      delete val?.isOpen;
      delete val?.className;
      delete val?.schoolName;
      delete val?.classOrder;
      delete val?.fee;


      return val;
    });
    saveClassAdmissionData(postData)
      .then(response => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (sessionValue !== null)
      fetchClassAdmissionData(sessionValue);
  }, [sessionValue]);

  useEffect(() => {
    fetchAdmissionSession();
  }, []);


  return (
    <Layout>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper'>
          <div className='inner-content-wrap padt8'> 

            {formData && (
              <Formik
                initialValues={{ data: formData }}
                enableReinitialize
                onSubmit={values => {
                  handleSubmitData(values, sessionValue);
                }}
              >
                {({ values, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <div className='title-area'>
                      <h2>
                        Activate and modify admission status for different
                        classes
                      </h2>
                      <div className="admission-fld-wrap">
                        <label>Admission Year</label>
                        <Form.Select
                          value={sessionValue}
                          onChange={(e) => {
                            setSessionValue(e.target.value);
                          }}
                          size='sm'>
                          {sessionOption.map((val, index) => (
                            <option value={val} key={`select${index}`}>{val}</option>
                          ))}
                        </Form.Select>
                      </div>
                      <div className='btn-wrapper'>
                        <Button
                          className='reset-btn'
                          onClick={_ => {
                            Object.keys(changedData).map(val => {
                              setFieldValue(val, changedData[val]);
                            });
                          }}
                        >
                          Reset
                        </Button>
                        <Button className='save-btn' type='submit'>
                          Save
                        </Button>
                      </div>
                    </div>
                    <div className='tbl-grid-wrapper'>
                      <FieldArray name='data'>
                        {arrayHelpers => (
                          <table>
                            <thead>
                              <tr>
                                <th>Class (Capacity)</th>
                                <th>Allocate Seats</th>
                                <th>Vacant Seats</th>
                                <th>Application(Start Date - End Date)</th>
                                <th>Parent Interview</th>
                                <th>Candidate Screening Test</th>
                                <th>Application Fee</th>
                                <th>Registration Fee</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values.data &&
                                values.data.length > 0 &&
                                values.data.map((admissionData, index) => (
                                  <tr key={index}>
                                    <td>{admissionData.className} ({admissionData.capacity})</td>
                                    <td>
                                      <div className='switch-wrapper'>
                                        <Form.Label className='no'>
                                          No
                                        </Form.Label>
                                        <Field
                                          component={Form.Check}
                                          type='switch'
                                          name={`data.${index}.isOpen`}
                                          id='custom-switch'
                                          checked={admissionData.isOpen}
                                          onChange={e => {
                                            handleData(
                                              setFieldValue,
                                              `data[${index}].isOpen`,
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
                                      <Form.Control
                                        size='sm'
                                        type='number'
                                        name={`data[${index}].vacantSeats`}
                                        value={admissionData?.vacantSeats || ''}
                                        disabled={!admissionData?.isOpen}
                                        min="0"
                                        max={admissionData.capacity}
                                        onPaste={e => e.preventDefault()}
                                        onChange={e => {
                                          handleData(
                                            setFieldValue,
                                            `data[${index}].vacantSeats`,
                                            e.target.value,
                                            formData[index]?.vacantSeats || ''
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <DateRangePicker
                                        dateRanges={[
                                          admissionData?.formSubmissionStartDate ||
                                          null,
                                          admissionData?.formSubmissionEndDate ||
                                          null
                                        ]}
                                        dateRangeValue={[
                                          admissionData?.formSubmissionStartDate,
                                          admissionData?.formSubmissionEndDate
                                        ]}
                                        fieldName={[
                                          `data[${index}].formSubmissionStartDate`,
                                          `data[${index}].formSubmissionEndDate`
                                        ]}
                                        setFieldData={setFieldValue}
                                        handleData={handleData}
                                        disabled={!admissionData?.isOpen}
                                      />
                                    </td>
                                    <td>
                                      <DateRangePicker
                                        dateRanges={[
                                          admissionData?.admissionTestStartDate ||
                                          null,
                                          admissionData?.admissionTestEndDate ||
                                          null
                                        ]}
                                        dateRangeValue={[
                                          admissionData?.admissionTestStartDate,
                                          admissionData?.admissionTestEndDate
                                        ]}
                                        fieldName={[
                                          `data[${index}].admissionTestStartDate`,
                                          `data[${index}].admissionTestEndDate`
                                        ]}
                                        setFieldData={setFieldValue} 
                                        minDate={admissionData?.formSubmissionEndDate}
                                        handleData={handleData}
                                        disabled={!admissionData?.isOpen}
                                      />
                                    </td>
                                    <td>
                                      <DateRangePicker
                                        dateRanges={[
                                          admissionData?.personalInterviewStartDate ||
                                          null,
                                          admissionData?.personalInterviewEndDate ||
                                          null
                                        ]}
                                        dateRangeValue={[
                                          admissionData?.personalInterviewStartDate,
                                          admissionData?.personalInterviewEndDate
                                        ]}
                                        fieldName={[
                                          `data[${index}].personalInterviewStartDate`,
                                          `data[${index}].personalInterviewEndDate`
                                        ]}
                                        setFieldData={setFieldValue}
                                        minDate={admissionData?.formSubmissionEndDate}
                                        handleData={handleData}
                                        disabled={!admissionData?.isOpen}
                                      />
                                    </td>
                                    <td>
                                      <Form.Control
                                        size='sm'
                                        type='text'
                                        name={`data[${index}].formFee`}
                                        value={admissionData?.formFee || ''}
                                        disabled={!admissionData?.isOpen}
                                        onChange={e => {
                                          handleData(
                                            setFieldValue,
                                            `data[${index}].formFee`,
                                            e.target.value,
                                            formData[index]?.formFee || ''
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <Form.Control
                                        size='sm'
                                        type='text'
                                        name={`data[${index}].registrationFee`}
                                        value={admissionData?.registrationFee || ''}
                                        disabled={!admissionData?.isOpen}
                                        onChange={e => {
                                          handleData(
                                            setFieldValue,
                                            `data[${index}].registrationFee`,
                                            e.target.value,
                                            formData[index]?.registrationFee || ''
                                          );
                                        }}
                                      />
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        )}
                      </FieldArray>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default React.memo(ManageAdmission);
