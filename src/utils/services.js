import { toast } from 'react-toastify';
import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from './RestClient';

export const getClassAdmissionData = (session) => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_DATA + `/${session}`);
};

export const saveClassAdmissionData = (data) => {
  return RESTClient.post(RestEndPoint.CLASS_ADMISSION_DATA, data);
};

export const removeClassAdmissionData = (session, classId) => {
  return RESTClient.delete(RestEndPoint.REMOVE_ADMISSION_DATA + `/${classId}/${session}`);
};

export const updateSeatClassAdmissionData = (payload) => {
  return RESTClient.patch(RestEndPoint.UPDATE_SEAT_ADMISSION_DATA, payload);
};

export const applicationfilterData = (data) => {
  return RESTClient.post(RestEndPoint.APPLICATION_FILTER_DATA, data);
};

export const superAdminApplicationfilterData = (data) => {
  return RESTClient.post(RestEndPoint.SUPER_ADMIN_FILTER_DATA, data);
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
export const resetSchoolAdminPassword = (data) => {
  return RESTClient.post(RestEndPoint.RESET_ADMIN_PASSWORD, data);
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

export const getSchoolFeeType = () => {
  return RESTClient.get(RestEndPoint.GET_ADD_DELET_SCHOOL_FEE_TYPE);
};

export const addSchoolFeeType = (data) => {
  return RESTClient.post(RestEndPoint.GET_ADD_DELET_SCHOOL_FEE_TYPE, data);
};

export const addClassFeeTypeDetails = (data) => {
  return RESTClient.post(RestEndPoint.GET_ADD_DELET_SCHOOL_FEE_TYPE, data);
};

export const deleteSchoolFeeType = (feeTypeId ) => {
  return RESTClient.delete(RestEndPoint.GET_ADD_DELET_SCHOOL_FEE_TYPE + `/${feeTypeId }`);
};

export const deleteClassesFeeDetails = (classId, feeId ) => {
  return RESTClient.delete(RestEndPoint.GET_ADD_UPDATE_CLASS_FEE_DETAILS + `/${classId }` +`/${feeId }`);
};

export const updateSchoolFeeType = (payload) => {
  return RESTClient.put(RestEndPoint.GET_ADD_DELET_SCHOOL_FEE_TYPE, payload);
};

export const updateFeeSeetings = (payload) => {
  return RESTClient.patch(RestEndPoint.UPDATE_FEE_SETTING, payload);
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

export const getClassesFeeDetails = (classId) => {
  return RESTClient.get(RestEndPoint.GET_ADD_UPDATE_CLASS_FEE_DETAILS + `/${classId}`);
};

export const addClassFeeTypeAmount = (data) => {
  return RESTClient.post(RestEndPoint.GET_ADD_UPDATE_CLASS_FEE_DETAILS, data);
};

export const findStudentsDetails = (data) => {
  return RESTClient.post(RestEndPoint.FIND_STUDENT_DETAILS, data);
};

export const updateClassFeeTypeAmount = (data) => {
  return RESTClient.put(RestEndPoint.GET_ADD_UPDATE_CLASS_FEE_DETAILS, data);
};

export const zipDownloadApplications = async (applicationIds) => {
  try {
    const data = await RESTClient.postBlob(RestEndPoint.ZIP_DOWNLOAD_APPLICATION, applicationIds);
    console.log(data);
    downloadFile(data, 'applicatntFirstName_ApplicationId');
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }
};

export const getClassApplication = (classId, sessionValue) => {
  return RESTClient.get(RestEndPoint.CLASS_APPLICATION_CLASS + `/${classId}/${sessionValue}`);
};

export const updateApplicationStatus = (payload) => {
  return RESTClient.post(RestEndPoint.CHANGE_APPLICATION_STATUS, payload);
};

export const updateUserExcelData = (payload) => {
  return RESTClient.post(RestEndPoint.UPDATE_USER_EXCEL_DATA, payload);
};

export const getSearchItems = () =>{
  return RESTClient.get(RestEndPoint.GET_PARTNER_SCHOOL)
}

export const getUserData = (userSchoolId)=>{
  return RESTClient.get(RestEndPoint.GET_SCHOOL_USERS+ `/${userSchoolId}`)
}

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
export const moneyReceiptInvoice = async (invoiceId) => {
  const baseDownloadURL = invoiceId ? RestEndPoint.DOWNLOAD_MONEY_RECEIPT_INVOICE : toast.error("Error while downloading document");
  try {
    const data = await RESTClient.getBlob(baseDownloadURL + '/' + (invoiceId));
    downloadFile(data, 'Payment Receipt');
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
 
export const getPlaceOrder = (payload) => {
  return RESTClient.post(RestEndPoint.PLACE_ORDER, payload);
};

export const processOrderAfterPayment = (payload, orderId) => {
  return RESTClient.post(RestEndPoint.PROCESS_AFTER_PAYMENT + `?orderId=${orderId}`, payload);
};  

export const registrationCheckout = (payload) => {
  return RESTClient.post(RestEndPoint.REGISTRATION_CHECKOUT, payload);
};

export const getFeeForStudent = (classId,studentId) => {
  return RESTClient.get(RestEndPoint.GET_FFE_FOR_STUDENT + `${classId}/${studentId}`);
};

export const getFeeAndPaymentHistoryForStudent = (classId,studentId) => {
  return RESTClient.get(RestEndPoint.GET_FEE_AND_PAYMENT + `${classId}/${studentId}`);
};
