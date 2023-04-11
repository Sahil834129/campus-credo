import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { convertDate } from "../../../utils/DateUtil";
import { getCurrentModulePermission, getLocalData } from "../../../utils/helper";
import {
  getClassAdmissionData, getClassAdmissionSessionData
} from '../../../utils/services';
import Layout from '../layout';
import GetTableRow from "./getTableRow";

const initialFormData = undefined;

export const ManageAdmission = () => {
  const isWritePermission = getCurrentModulePermission("Manage Admission");
  const [formData, setFormData] = useState(initialFormData);
  const [fieldData, setFieldData] = useState(initialFormData);
  const [sessionValue, setSessionValue] = useState(null);
  const [pastSessionValue, setPastSessionValue] = useState(null);
  const [currentSessionValue, setCurrentSessionValue] = useState(null);
  const [nextSessionValue, setNextSessionValue] = useState(null);
  const [sessionOption, setSessionOption] = useState([]);
  const [sessionStartDate, setSessionStartDate] = useState(convertDate(getLocalData("sessionStartDate")));
  const [sessionEndDate, setSessionEndDate] = useState(convertDate(getLocalData("sessionEndDate")));


  const fetchAdmissionSession = () => {
    getClassAdmissionSessionData()
      .then(response => {
        setSessionOption(response.data);
        setPastSessionValue(response.data[0]);
        setSessionValue(response.data[1]);
        setCurrentSessionValue(response.data[1]);
        setNextSessionValue(response.data[2]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const convertRowData = val => {
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
  };

  const convertTableData = (response) => {
    return response.map(val => {
      return convertRowData(val);
    });
  };

  const fetchClassAdmissionData = (session) => {
    getClassAdmissionData(session)
      .then(response => {
        if (response.status === 200) {
          const data = convertTableData(response.data);
          setFormData(data.map(v => {
            return {
              ...v
            };
          }));
          setFieldData(data.map(v => {
            return {
              ...v
            };
          }));
        }
      })
      .catch(error => {
        console.log('Error while getting cities list' + error);
      });
  };


  useEffect(() => {
    if (sessionValue !== null) {
      fetchClassAdmissionData(sessionValue);
      const sesssionYears = sessionValue.split('-');
      sessionStartDate.setFullYear(sesssionYears[0]);
      sessionEndDate.setFullYear(sesssionYears[1]);
      setSessionStartDate(sessionStartDate);
      setSessionEndDate(sessionEndDate);
    }
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
                  className='save-btn'
                  onClick={_ => {
                    window.open(`/print-manage-admission/${sessionValue}`, '_blank');
                  }}
                >
                  Print
                </Button>
                <Button
                  className='reset-btn'
                  disabled={!isWritePermission || sessionValue === pastSessionValue}
                  onClick={_ => {
                    setFieldData(formData.map(v => {
                      return {
                        ...v,
                      };
                    }));
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
                    <th>Total Seats<span className='required'>*</span></th>
                    <th>Seats Available<span className='required'>*</span></th>
                    <th>Application Window<span className='required'>*</span></th>
                    <th>Parent Interview Dates</th>
                    <th>Candidate Screening Dates</th>
                    <th>Application Fees<span className='required'>*</span></th>
                    <th>Registration Fees<span className='required'>*</span></th>
                    <th className="action-cell">Action</th>
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
                        setFormData={setFormData}
                        convertRowData={convertRowData}
                        sessionStartDate={sessionStartDate}
                        sessionEndDate={sessionEndDate}
                        currentSessionValue={currentSessionValue}
                        pastSessionValue={pastSessionValue}
                        nextSessionValue={nextSessionValue}
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
