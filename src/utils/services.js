import RestEndPoint from '../redux/constants/RestEndpoints';
import RESTClient from './RestClient';
import { toast } from 'react-toastify';

export const getClassAdmissionData = () => {
  return RESTClient.get(RestEndPoint.CLASS_ADMISSION_DATA);
};

export const saveClassAdmissionData = (data) => {
  return RESTClient.post(RestEndPoint.CLASS_ADMISSION_DATA, data);
};

export const getSchoolAdmissinSummary = () => {
  return RESTClient.get(RestEndPoint.SCHOOL_ADMISSION_SUMMARY);
};

export const downloadDocument = async (childId, documentName) => {
  try {
    const data = await RESTClient.getBlob(RestEndPoint.DOWNLOAD_DOCUMENT + '/' + childId + '/' + documentName);
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
  } catch (error) {
    toast.error("Error while downloading document." + error);
  }
};
