import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { convertDate } from "../../utils/DateUtil";
import { getCurrentModulePermission } from "../../utils/helper";
import {
  getClassAdmissionData, getClassAdmissionSessionData, removeClassAdmissionData, saveClassAdmissionData
} from '../../utils/services';
import GetTableRow from "./getTableRow";
import Layout from './layout';

const initialFormData = undefined;

export const ManageAdmission = () => {
  const isWritePermission = getCurrentModulePermission("Manage Admission");
  const [formData, setFormData] = useState(initialFormData);
  const [fieldData, setFieldData] = useState(initialFormData);
  const [changedData, setChangedData] = useState({});
  const [sessionValue, setSessionValue] = useState(null);
  const [sessionOption, setSessionOption] = useState([]);


  const fetchAdmissionSession = () => {
    getClassAdmissionSessionData()
      .then(response => {
        setSessionOption(response.data);
        setSessionValue(response.data[1]);
      })
      .catch(error => {
        console.log(error);
      });
  };



  const fetchClassAdmissionData = (session) => {
    getClassAdmissionData(session)
      .then(response => {
        if (response.status === 200) {
          const data = response.data.map(val => {
            val.isOpen = !!(val.formSubmissionStartDate && val.formSubmissionEndDate);
            val.formSubmissionStartDate = convertDate(val?.formSubmissionStartDate || null);
            val.admissionType = val?.admissionType || 'Fixed';
            val.vacantSeats = val?.vacantSeats || '';
            val.formSubmissionEndDate = convertDate(val?.formSubmissionEndDate || null);
            val.admissionTestStartDate = convertDate(val?.admissionTestStartDate || null);
            val.admissionTestEndDate = convertDate(val?.admissionTestEndDate || null);
            val.personalInterviewStartDate =
              convertDate(val?.personalInterviewStartDate || null);
            val.personalInterviewEndDate = convertDate(val?.personalInterviewEndDate || null);
            val.formFee = val?.formFee || null;
            val.registrationFee = val?.registrationFee || null;
            return val;
          });
          setFormData(data);
          setFieldData(data);
        }
      })
      .catch(error => {
        console.log('Error while getting cities list' + error);
      });
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


            <div className='title-area'>
              <h2>
                Activate and modify admission status for different
                classes
              </h2>
              <div className="admission-fld-wrap">
                <label>Admission Year</label>
                <Form.Select
                  value={sessionValue || ''}
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
                  disabled={!isWritePermission}
                  onClick={_ => {
                    Object.keys(changedData).forEach(val => {
                      setFieldData(val, changedData[val]);
                    });
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className='tbl-grid-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Admission Open</th>
                    <th>Admission Type</th>
                    <th>Total Seats <span className='required'>*</span></th>
                    <th>Application <span className='required'>*</span></th>
                    <th>Parent Interview</th>
                    <th>Candidate Screening Test</th>
                    <th>Application Fees <span className='required'>*</span></th>
                    <th>Registration Fees <span className='required'>*</span></th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldData &&
                    fieldData.length > 0 &&
                    fieldData.map((admissionData, index) => (
                      <GetTableRow
                        key={index}
                        index={index}
                        admissionData={admissionData}
                        sessionValue={sessionValue}
                        isWritePermission={isWritePermission}
                        formData={formData}
                        setFieldData={setFieldData}
                        fieldData={fieldData}
                        setChangedData={setChangedData}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default React.memo(ManageAdmission);
