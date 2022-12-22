import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from './RestClient';
import { toast } from 'react-toastify';

export const getClassAdmissionData = (session) => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_DATA + `/${session}`);
};

export const saveClassAdmissionData = (data) => {
  return RESTClient.post(RestEndPoint.CLASS_ADMISSION_DATA, data);
};

export const applicationfilterData = (data) => {
  return RESTClient.post(RestEndPoint.APPLICATION_FILTER_DATA, data);
};

export const getSchoolAdmissinSummary = () => {
  return RESTClient.get(RestEndPoint.SCHOOL_ADMISSION_SUMMARY);
};

export const getSchoolAdmissinFeeSummary = () => {
  return RESTClient.get(RestEndPoint.SCHOOL_ADMISSION_FEE_SUMMARY);
};

export const getApplicationChartStatus = () => {
  return RESTClient.get(RestEndPoint.APPLICATION_CHART_STATUS);
};

export const getClassAdmissionSessionData = () => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_SESSION_DATA);
};

export const getSchoolAdmissionGradeList = () => {
  return RESTClient.get(RestEndPoint.SCHOOL_GRADE_LIST);
};

export const getClassAdmissionSummary = (classId) => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_SUMMARY + `/${classId}`);
};

export const getAtPiForClass = (classId) => {
  return RESTClient.get(RestEndPoint.ATPI_FOR_CLASS + `${classId}`);
};

export const getSchoolClassesData = (schoolId) => {
  return RESTClient.get(RestEndPoint.SCHOOL_CLASSES_DATA + `/${schoolId}/classes`);
};

export const getClassApplication = (classId) => {
  return RESTClient.get(RestEndPoint.CLASS_APPLICATION_CLASS + `/${classId}`);
};

export const updateApplicationStatus = (payload) => {
  return RESTClient.post(RestEndPoint.CHANGE_APPLICATION_STATUS, payload);
};

export const updateBulkApplicationStatus = (payload) => {
  return RESTClient.post(RestEndPoint.CHANGE_BULK_APPLICATION_STATUS, payload);
};

export const downloadDocument = async (childId, documentName) => {
  try {
    const data = await RESTClient.getBlob(RestEndPoint.DOWNLOAD_DOCUMENT + '/' + childId + '/' + documentName);
    downloadFile(data, documentName);
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }
};

export const downloadApplicationDocument = async (applicationId) => {
  try {
    const data = await RESTClient.getBlob(RestEndPoint.DOWNLOAD_APPLICANT_DETAIL + '/' + applicationId);
    downloadFile(data, 'applicationDocument');
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }

  
};
const downloadFile = (data, documentName) => {
  const contentType = data.headers['content-type'];
  const blob = new Blob([data.data], { type: contentType });
  const blobURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = documentName;
  document.body.appendChild(link);
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );
  document.body.removeChild(link);
  setTimeout(() => {
    // For Firefox it is necessary to delay
    window.URL.revokeObjectURL(blobURL);
  }, 100);
}
export const getAgeClassMap = async () => {
  let classAgeMap = {};
  try {
    const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_CLASSES_WITH_AGE);
    response.data.classesWithAgeLimit.length
      && response.data.classesWithAgeLimit.forEach((it) => {
        classAgeMap[parseInt(it[1])] = it[0];
      });
    return classAgeMap;
  } catch (error) {
    return classAgeMap;
  }

};
