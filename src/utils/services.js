import { toast } from 'react-toastify';
import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from './RestClient';

export const getClassAdmissionData = (session) => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_DATA + `/${session}`);
};

export const saveClassAdmissionData = (data) => {
  return RESTClient.post(RestEndPoint.CLASS_ADMISSION_DATA, data);
};

export const removeClassAdmissionData = (session) => {
  return RESTClient.delete(RestEndPoint.REMOVE_ADMISSION_DATA + `/${session}`);
};

export const applicationfilterData = (data) => {
  return RESTClient.post(RestEndPoint.APPLICATION_FILTER_DATA, data);
};

export const getSchoolAdmissinSummary = (currentSession) => {
  return RESTClient.get(RestEndPoint.SCHOOL_ADMISSION_SUMMARY + "/" + currentSession);
};

export const getSchoolAdmissinFeeSummary = (sessionValue) => {
  return RESTClient.get(RestEndPoint.SCHOOL_ADMISSION_FEE_SUMMARY + "/" + sessionValue);
};

export const getApplicationChartStatus = (sessionValue) => {
  return RESTClient.get(RestEndPoint.APPLICATION_CHART_STATUS + "/" + sessionValue);
};

export const updateUserModulePermissions = (data) => {
  return RESTClient.put(RestEndPoint.UPDATE_USER_MODULE_PERMISSION, data);
};

export const changeUserPassword = (data) => {
  return RESTClient.post(RestEndPoint.CHANGE_USER_PASSWORD, data);

};

export const getClassAdmissionSessionData = () => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_SESSION_DATA);
};

export const getManagePermissionRoles = () => {
  return RESTClient.get(RestEndPoint.MANAGE_PERMISSION_ROLES);
};

export const getManagePermissions = () => {
  return RESTClient.get(RestEndPoint.MANAGE_PERMISSIONS);
};

export const getManagePermissionModules = () => {
  return RESTClient.get(RestEndPoint.MANAGE_PERMISSION_MODULES);
};
export const getClassAdmissionSummary = (classId, sessionValue) => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_SUMMARY + `/${classId}/${sessionValue}`);
};

export const getAtPiForClass = (classId, sessionValue) => {
  return RESTClient.get(RestEndPoint.ATPI_FOR_CLASS + `${classId}/${sessionValue}`);
};

export const getSchoolClassesData = (schoolId) => {
  return RESTClient.get(RestEndPoint.SCHOOL_CLASSES_DATA + `/${schoolId}/classes`);
};

export const getClassApplication = (classId, sessionValue) => {
  return RESTClient.get(RestEndPoint.CLASS_APPLICATION_CLASS + `/${classId}/${sessionValue}`);
};

export const updateApplicationStatus = (payload) => {
  return RESTClient.post(RestEndPoint.CHANGE_APPLICATION_STATUS, payload);
};

export const updateBulkApplicationStatus = (payload) => {
  return RESTClient.post(RestEndPoint.CHANGE_BULK_APPLICATION_STATUS, payload);
};

export const downloadDocument = async (childId, documentName, applicationChildId) => {
  const baseDownloadURL = applicationChildId ? RestEndPoint.DOWNLOAD_ADMIN_DOCUMENT : RestEndPoint.DOWNLOAD_DOCUMENT;
  try {
    const data = await RESTClient.getBlob(baseDownloadURL + '/' + (childId ?? applicationChildId) + '/' + documentName);
    downloadFile(data, documentName);
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }
};
export const downloadApplicationOnParentDashboard = async (applicationId) => {
  const baseDownloadURL = applicationId ? RestEndPoint.DOWNLOAD_APPLICATION_ON_PARENT_DASHBOARD : toast.error("Error while downloading document");
  try {
    const data = await RESTClient.getBlob(baseDownloadURL + '/' + (applicationId));
    downloadFile(data, 'Application Document');
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }
};
export const downloadInvoice = async (invoiceId) => {
  const baseDownloadURL = invoiceId ? RestEndPoint.DOWNLOAD_PAYMENT_INVOICE : toast.error("Error while downloading document");
  try {
    const data = await RESTClient.getBlob(baseDownloadURL + '/' + (invoiceId));
    downloadFile(data, 'Payment Invoice');
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
};

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

export const getApplications = async (childId) => {
  return RESTClient.get(RestEndPoint.GET_APPLICATION_LIST + `/${childId}`);
};
