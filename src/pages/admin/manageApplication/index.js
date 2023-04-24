import { useEffect, useState } from 'react';
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import ReviewAdmissionDialog from "../../../dialogs/reviewAdmissionDialog";
import { getCurrentModulePermission, getLocalData } from "../../../utils/helper";
import { getAtPiForClass, getClassAdmissionSummary, getClassApplication, getSchoolClassesData } from '../../../utils/services';
import Layout from '../layout';
import FilterApp from "./filterApp";
import OpenModal from "./openModal";
import ShowApplications from "./showApplications";


export const ManageApplication = () => {
  const isWritePermission = getCurrentModulePermission("Manage Application");
  const [rowsData, setRowsData] = useState([]);
  const [sessionValue, setSessionValue] = useState("");
  const [selectedRows, setSelectedRows] = useState({});
  const schoolId = getLocalData('schoolId');
  const [apiError, setApiError] = useState('');
  const [isBulkOperation, setIsbulkOperation] = useState(false);
  const [atPiData, setAtPiData] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [isLoading, setIsloading] = useState(true);
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
        setIsloading(false);
      });
  };

  const fetchClassAdmissionSummary = (classId, currentSession) => {
    getClassAdmissionSummary(classId, currentSession)
      .then(response => {
        if (response.status === 200) {
          setAdmissionData(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fetchClassApplication = (classId, currentSession) => {
    setIsloading(true);
    getClassApplication(classId, currentSession)
      .then(response => {
        let res = response.data;
        res = res.map((val, index) => {
          return {
            ...val,
            rowIndex: index + 1
          };
        });
        setIsloading(false);
        setSelectedRows({});
        setRowsData(res);
      })
      .catch(() => {
        setSelectedRows({});
        setIsloading(false);
      });
  };

  const handleBulkStatusUpdate = (status, rowIndexes, allData) => {
    const appIds = Object.keys(rowIndexes).map(val => {
      return allData[val]?.applicationId;
    });
    setApplicationStatus(status);
    setApplicationId(appIds);
    setOpenModal(true);
    setIsbulkOperation(true);
  };

  const fetchAtPiForClass = (classId, currentSession) => {
    getAtPiForClass(classId, currentSession)
      .then(res => {
        if (Object.keys(res.data).length > 0) {
          setAtPiData(res.data?.isAtPiSchedule === "true" ? res.data : null);
        } else {
          setAtPiData(null);
        }
      });
  };
  useEffect(() => {
    if (schoolId)
      fetchSchoolClassesData(schoolId);
  }, [schoolId]);

  const callAllApi = (classId, currentSession) => {
    fetchClassAdmissionSummary(classId, currentSession);
    fetchClassApplication(classId, currentSession);
    fetchAtPiForClass(classId, currentSession);
  };
  useEffect(() => {
    if (classId && sessionValue !== "") {
      callAllApi(classId, sessionValue);
    }
  }, [classId, sessionValue]);

  useEffect(() => {
    if (apiError !== '') {
      toast.error(apiError);
    }
  }, [apiError]);

  return (
    <Layout admissionSummary={admissionData?.upperClassAdmissionSummary} sessionValue={sessionValue} setSessionValue={setSessionValue}>
      <div className='content-area-inner manage-application inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <FilterApp
            schoolClassesData={schoolClassesData}
            classId={classId}
            setClassId={setClassId}
            setRowsData={setRowsData}
            sessionValue={sessionValue}
            callAllApi={callAllApi}
          />
          {!isLoading && <ShowApplications
            setApplicationStatus={setApplicationStatus}
            setApplicationId={setApplicationId}
            setOpenModal={setOpenModal}
            setIsbulkOperation={setIsbulkOperation}
            selectedRows={selectedRows}
            isAtPiData={atPiData !== null}
            rowsData={rowsData}
            handleBulkStatusUpdate={handleBulkStatusUpdate}
            setSelectedRows={setSelectedRows}
            setShowApplication={setShowApplication}
            setSelectedApplicationId={setSelectedApplicationId}
            isWritePermission={isWritePermission}
          />}
          {isLoading && <div style={{ margin: '50px auto' }}><Spinner animation="border" /></div>}
          <OpenModal
            show={openModal}
            setShow={setOpenModal}
            isBulkOperation={isBulkOperation}
            applicationStaus={applicationStaus}
            setApplicationStatus={setApplicationStatus}
            applicationId={applicationId}
            callAllApi={callAllApi}
            classId={classId}
            setApplicationId={setApplicationId}
            setApiError={setApiError}
            isAtPiData={atPiData !== null}
            atPiData={atPiData}
            sessionValue={sessionValue}
          />
        </div>
      </div>
      <ReviewAdmissionDialog
        show={showApplication}
        handleClose={() => {
          setShowApplication(false);
          setSelectedApplicationId('');
          fetchClassAdmissionSummary(classId, sessionValue);
          fetchClassApplication(classId, sessionValue);
        }}
        applicationId={selectedApplicationId} />
    </Layout>
  );
};
export default ManageApplication;
