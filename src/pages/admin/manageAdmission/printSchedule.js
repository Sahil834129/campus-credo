import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getLocalData } from "../../../utils/helper";
import '../../../assets/admin/scss/custom-styles.scss';
import { getClassAdmissionData } from "../../../utils/services";
import { convertDate, formatDateToDDMMYYYY } from "../../../utils/DateUtil";

export default function PrintSchedule() {
  let { session } = useParams();
  const [printData, setPrintData] = useState([]);
  const convertTableData = (response) => {
    return response.map(val => {
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
      return val;
    });
  };

  const fetchClassAdmissionData = (session) => {
    getClassAdmissionData(session)
      .then(response => {
        if (response.status === 200) {
          const data = convertTableData(response.data);
          setPrintData(data);
        }
      });
  };

  useEffect(() => {
    fetchClassAdmissionData(session);
  }, []);

  return (
    <Container className='main-container admin-contianer' fluid>
      <div style={{ display: 'flex', margin: '20px', justifyContent: 'space-between', fontSize: 30, fontWeight: 'bold', color: 'black' }}>
        <div></div>
        <div style={{}}>{getLocalData('schoolName')}</div>
        <Button
          className='save-btn' variant="success"
          onClick={() => { window.print(); }}
          style={{ border: 'white', boxShadow: 'none' }}
        >
          <i className='icons print-icon'></i>
        </Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', fontSize: 20, color: 'black' }}>
        Admission Session: {session}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px', fontSize: 20, color: 'black' }}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Class</th>
              <th>Admission Open</th>
              <th>Total Seats</th>
              <th>Application </th>
              <th>Parent Interview</th>
              <th>Candidate Screening Test</th>
              <th>Application Fees</th>
              <th>Registration Fees</th>
            </tr>
          </thead>
          <tbody>
            {printData.map((admissionData, index) =>
              <tr key={`print${index}`}>
                <td>{admissionData.className}</td>
                <td>{admissionData.isOpen ? 'Yes' : 'No'}</td>
                <td>{admissionData.vacantSeats}</td>
                <td>{formatDateToDDMMYYYY(admissionData.formSubmissionStartDate)} - {formatDateToDDMMYYYY(admissionData.formSubmissionEndDate)}</td>
                <td>{formatDateToDDMMYYYY(admissionData.admissionTestStartDate)} - {formatDateToDDMMYYYY(admissionData.admissionTestEndDate)}</td>
                <td>{formatDateToDDMMYYYY(admissionData.personalInterviewStartDate)} - {formatDateToDDMMYYYY(admissionData.personalInterviewStartDate)}</td>
                <td>₹ {admissionData.formFee}</td>
                <td>₹ {admissionData.registrationFee}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </Container>
  );
} 