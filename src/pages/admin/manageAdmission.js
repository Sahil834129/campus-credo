import { Field, FieldArray, Formik } from 'formik';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DateRangePicker from '../../common/DateRangePicker';
import {
  getClassAdmissionData,
  saveClassAdmissionData
} from '../../utils/services';
import Layout from './layout';

const initialFormData = undefined;

export const ManageAdmission = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [changedData, setChangedData] = useState({});

  const handleData = (setFieldData, fieldName, value, initialValue) => {
    setFieldData(fieldName, value);
    setChangedData(val => {
      return {
        ...val,
        [fieldName]: initialValue
      };
    });
  };

  const fetchClassAdmissionData = () => {
    getClassAdmissionData()
      .then(response => {
        if (response.status === 200) {
          const data = response.data.map(val => {
            val.isOpen =
              val.formSubmissionStartDate && val.formSubmissionEndDate;
            val.formSubmissionStartDate = val?.formSubmissionStartDate || null;
            val.formSubmissionEndDate = val?.formSubmissionEndDate || null;
            val.admissionTestStartDate = val?.admissionTestStartDate || null;
            val.admissionTestEndDate = val?.admissionTestEndDate || null;
            val.personalInterviewStartDate =
              val?.personalInterviewStartDate || null;
            val.personalInterviewEndDate = val?.personalInterviewEndDate || null;
            val.formFee = val?.formFee || null;

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
      parseDate = moment(formDate).format('YYYY-MM-DD');
    }

    return parseDate;
  };
  const handleSubmitData = formData => {
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
    fetchClassAdmissionData();
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
                  handleSubmitData(values);
                }}
              >
                {({ values, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                    <div className='title-area'>
                      <h2>
                        Activate and modify admission status for different
                        classes
                      </h2>
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
                                <th>Class</th>
                                <th>Admisssion Open</th>
                                <th>Allocate Seats</th>
                                <th>Capacity</th>
                                <th>Application(Start Date - End Date)</th>
                                <th>Parent Interview</th>
                                <th>Candidate Screening Test</th>
                                <th>Application Fee</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values.data &&
                                values.data.length > 0 &&
                                values.data.map((admissionData, index) => (
                                  <tr key={index}>
                                    <td>{admissionData.className}</td>
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
                                        type='text'
                                        name={`data[${index}].capacity`}
                                        value={admissionData?.capacity || ''}
                                        disabled={!admissionData?.isOpen}
                                        onChange={e => {
                                          handleData(
                                            setFieldValue,
                                            `data[${index}].capacity`,
                                            e.target.value,
                                            formData[index]?.capacity || ''
                                          );
                                        }}
                                      />
                                    </td>
                                    <td>
                                      <Form.Control
                                        size='sm'
                                        type='text'
                                        name={`data[${index}].vacantSeats`}
                                        value={admissionData?.vacantSeats || ''}
                                        disabled={!admissionData?.isOpen}
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
export default ManageAdmission;
