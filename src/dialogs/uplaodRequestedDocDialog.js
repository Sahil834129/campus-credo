import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  ACCEPT_MIME_TYPE,
  FILE_SIZE,
  FILE_UPLOAD_ERROR,
} from "../constants/app";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import {
  commaSeparatedStringToObject,
  humanize,
  isEmpty,
} from "../utils/helper";
import GenericDialog from "./GenericDialog";

const UploadRequestedDocDialog = ({
  requestedDocument,
  setApplications,
  show,
  handleClose,
  applicationId,
  childId,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [fileUploadErrors, setFileUploadErrrors] = useState({});
  const [files, setFiles] = useState({});
  const [requestedDocumentObject, setRequestedDocumentObject] = useState([]);

  const dispatch = useDispatch();

  const handleFileChangeInput = (e) => {
    if (e.target.files[0]) {
      setFileUploadErrrors({});
    }
    setFiles((val) => {
      return {
        ...val,
        [e.target.name]: e.target.files[0],
      };
    });
  };
  const callUploadFIleApi = async (childId, documentName, fileData) => {
    let formData = new FormData();
    formData.append("file", fileData[documentName]);
    formData.append("applicationId", applicationId);
    formData.append("documentName", documentName);
    try {
      setIsUploading(true);
      const response = await RESTClient.post(
        RestEndPoint.STUDENT_EXTRA_DOCUMENT_UPLOAD,
        formData
      );
      if (response.data) {
        const updatedRequestedDocuments = requestedDocumentObject.map((val) => {
          if (val.documentName === response.data.documentName) {
            return {
              ...val,
              ...response.data,
            };
          } else {
            return val;
          }
        });
        setRequestedDocumentObject(updatedRequestedDocuments);
        delete fileData[documentName];
        setFiles(fileData);
        setIsUploading(false);
      }
    } catch (error) {
      setIsUploading(false);
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  };

  const fileUplaod = (fileType, fileData) => {
    const error = {};
    if (fileData[fileType]) {
      if (validateFile(fileData[fileType])) {
        callUploadFIleApi(applicationId, fileType, fileData);
        error[fileType] = "";
      }
    } else {
      error[fileType] = "File is not selected";
    }
    setFileUploadErrrors((val) => {
      return {
        ...val,
        ...error,
      };
    });
  };
  const validateFile = (uploadFile) => {
    if (uploadFile.size > FILE_SIZE) {
      toast.error(FILE_UPLOAD_ERROR.FILE_SIZE_ERROR_MSG);
      return false;
    }

    if (
      ACCEPT_MIME_TYPE.find((element) => element === uploadFile.type) ===
      undefined
    ) {
      toast.error(FILE_UPLOAD_ERROR.FILE_TYPE_ERROR_MSG);
      return false;
    }
    return true;
  };

  const areAllDocumentsUploaded = () => {
    setShowSubmit(
      requestedDocumentObject.every((doc) => {
        return doc.hasOwnProperty("status") && doc.status === "uploaded";
      })
    );
  };
  const submitExtraDocument = () => {
    let payload = {
      applicationId: applicationId,
      childId: childId,
      applicationStatus: "DOCUMENT_SUBMITTED",
    };
    let responseData = RESTClient.post(
      RestEndPoint.UPDATE_APPLICATION_STATUS,
      payload
    )
      .then(async (val) => {
        handleClose();
        setFiles();
        const response = await RESTClient.get(
          RestEndPoint.GET_APPLICATION_LIST + `/${childId}`
        );
        setApplications(response.data);
      })
      .catch((res) => {
        handleClose();
        const messageData =
          res?.response?.requestedDocumentObject?.apierror?.message;
        console.log(messageData);
      });
  };
  useEffect(() => {
    const initialRequestedDocuments =
      commaSeparatedStringToObject(requestedDocument);
    setRequestedDocumentObject(initialRequestedDocuments);
  }, [requestedDocument]);
  useEffect(() => {
    areAllDocumentsUploaded();
  }, [requestedDocumentObject]);
  return (
    <GenericDialog
      show={show}
      className="confirmation-modal"
      handleClose={handleClose}
      modalHeader="Request Documents"
    >
      <Table bordered hover className="document-tbl">
        <thead>
          <tr>
            <th>#</th>
            <th>Document Name</th>
            <th>Select</th>
            <th className="doc-upload-btn">Action</th>
            <th>If exists</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(requestedDocumentObject) &&
            requestedDocumentObject.map((val, index) => (
              <tr key={`${index}`}>
                <td>{index + 1}</td>
                <td className="doc-name">
                  <span>{humanize(val.documentName)}</span>
                  <span className="text-danger">*</span>
                </td>
                <td className="doc-upload-fld">
                  <input
                    type={"file"}
                    accept=".jpg,.jpeg,.png,.pdf"
                    style={{ cursor: "pointer" }}
                    name={val.documentName}
                    onChange={handleFileChangeInput}
                  />
                  <span className="error-msg">
                    {fileUploadErrors[val.documentName] !== undefined
                      ? fileUploadErrors[val.documentName]
                      : ""}
                  </span>
                </td>
                <td className="doc-upload-btn">
                  <Button
                    className="upload-btn"
                    disabled={isUploading}
                    onClick={(e) => {
                      fileUplaod(val.documentName, files);
                    }}
                  >
                    Upload
                  </Button>
                </td>
                <td className="doc-filename">
                  {val.status === "uploaded" && (
                    <span>
                      {" "}
                      Uploaded <i className="icons link-icon"></i>
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {showSubmit ? (
        <Button className="save comn" onClick={() => submitExtraDocument()}>
          Submit
        </Button>
      ) : (
        ""
      )}
    </GenericDialog>
  );
};

export default UploadRequestedDocDialog;
