import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Layout from '../layout';
import { useEffect } from 'react';
import { useState } from 'react';
import { getClassAdmissionSummary, getClassApplication, getSchoolClassesData } from '../../../utils/services';
import ShowApplications from "./showApplications";
import OpenModal from "./openModal";
import FilterApp from "./filterApp";


export const ManageApplication = () => {
  const [rowsData, setRowsData] = useState([]);
  const schoolId = 1;
  const [openModal, setOpenModal] = useState(false);
  const [admissionData, setAdmissionData] = useState(null);
  const [applicationStaus, setApplicationStatus] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [schoolClassesData, setSchoolClassesData] = useState([]);
  const [classId, setClassId] = useState('');

  const fetchSchoolClassesData = (schoolId) => {
    getSchoolClassesData(schoolId)
      .then(response => {
        if (response.status === 200) {
          setSchoolClassesData(response?.data);
          setClassId(response?.data[0]?.classId);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchClassAdmissionSummary = (classId) => {
    getClassAdmissionSummary(classId)
      .then(response => {
        if (response.status === 200) {
          setAdmissionData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchClassApplication = (classId) => {
    getClassApplication(classId).
      then(response => {
        let res = response.data;
        console.log(res);
        res = res.map((val, index) => {
          return {
            ...val,
            rowIndex: index + 1
          };
        });
        console.log(res);

        setRowsData(res);
      });
  };

  useEffect(() => {
    fetchSchoolClassesData(schoolId);
  }, [schoolId]);

  useEffect(() => {
    if (classId) {
      fetchClassAdmissionSummary(classId);
      fetchClassApplication(classId);
    }
  }, [classId]);

  return (
    <Layout admissionSummary={admissionData?.upperSchoolAdmissionSummary}>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <FilterApp
            schoolClassesData={schoolClassesData}
            classId={classId}
            setClassId={setClassId}
            setRowsData={setRowsData}
          />
          <ShowApplications
            setApplicationStatus={setApplicationStatus}
            setApplicationId={setApplicationId}
            setOpenModal={setOpenModal}
            rowsData={rowsData}
          />
          <OpenModal
            show={openModal}
            setShow={setOpenModal}
            applicationStaus={applicationStaus}
            setApplicationStatus={setApplicationStatus}
            applicationId={applicationId}
            setApplicationId={setApplicationId}
          />
        </div>
      </div>
    </Layout>
  );
};
export default ManageApplication;
