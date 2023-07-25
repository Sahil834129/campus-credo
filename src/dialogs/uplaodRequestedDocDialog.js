import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { hideLoader, showLoader } from "../common/Loader";
import {
  ACCEPT_MIME_TYPE,
  FILE_SIZE,
  FILE_UPLOAD_ERROR,
} from "../constants/app";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import { humanize, isEmpty } from "../utils/helper";
import { downloadDocument } from "../utils/services";
import GenericDialog from "./GenericDialog";

const UploadRequestedDocDialog = ({
  requestedDocument,
  show,
  handleClose,
  applicationId,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [document, setDocument] = useState([]);
  const [fileUploadErrors, setFileUploadErrrors] = useState({});
  const [files, setFiles] = useState({});
  const dispatch = useDispatch();
  const requestedDocumentArray = !isEmpty(requestedDocument)
    ? requestedDocument.split(",")
    : [];
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
    console.log(formData, "files");
    try {
      showLoader(dispatch);
      const response = await RESTClient.post(
        RestEndPoint.STUDENT_EXTRA_DOCUMENT_UPLOAD,
        formData
      );
      if (response.data) {
        const data = requestedDocumentArray.map((val) => {
          if (val === response.data.documentName) {
            return response.data;
          } else {
            return val;
          }
        });
        setDocument(data);
        delete fileData[documentName];
        setFiles(fileData);
        hideLoader(dispatch);
      }
    } catch (error) {
      hideLoader(dispatch);
      console.log(formData, "formData");
      toast.error(RESTClient.getAPIErrorMessage(error));
    }
  };

  // const validateFile = (uploadFile) => {
  //   if (uploadFile.size > FILE_SIZE) {
  //     toast.error(FILE_UPLOAD_ERROR.FILE_SIZE_ERROR_MSG);
  //     return false;
  //   }

  //   if (
  //     ACCEPT_MIME_TYPE.find((element) => element === uploadFile.type) ===
  //     undefined
  //   ) {
  //     toast.error(FILE_UPLOAD_ERROR.FILE_TYPE_ERROR_MSG);
  //     return false;
  //   }
  //   return true;
  // };

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
    return document.every((doc) => {
      if (typeof doc === "object" && doc.hasOwnProperty("status")) {
        return doc.status === "uploaded";
      } else {
        return true;
      }
    });
  };
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
            <th>Download (If Exist)</th>
          </tr>
        </thead>
        <tbody>
          {!isEmpty(requestedDocumentArray) &&
            requestedDocumentArray.map((val, index) => (
              <tr key={`${index}`}>
                <td>{index + 1}</td>
                <td className="doc-name">
                  <span>{humanize(val)}</span>
                  <span className="text-danger">*</span>
                </td>
                <td className="doc-upload-fld">
                  <input
                    type={"file"}
                    accept=".jpg,.jpeg,.png,.pdf"
                    style={{ cursor: "pointer" }}
                    name={val}
                    onChange={handleFileChangeInput}
                  />
                  <span className="error-msg">
                    {fileUploadErrors[val] !== undefined
                      ? fileUploadErrors[val]
                      : ""}
                  </span>
                </td>
                <td className="doc-upload-btn">
                  <Button
                    className="upload-btn"
                    onClick={(e) => {
                      console.log(files, "files");
                      fileUplaod(val, files);
                    }}
                  >
                    Upload
                  </Button>
                </td>
                <td className="doc-filename">
                  {document.map((doc) => {
                    if (doc.documentName === val) {
                      return (
                        <a
                          href="javascript:void(0)"
                          key={index}
                          onClick={() => {
                            console.log(doc);
                            downloadDocument(doc.applicationId, val);
                          }}
                        >
                          Download <i className="icons link-icon"></i>
                        </a>
                      );
                    }
                  })}
                </td>
              </tr>
            ))}
          <Button
            className="save comn"
            disabled={!areAllDocumentsUploaded()} // Disable the button if not all documents are uploaded
            onClick={() => console.log(document)}
          >
            Submit
          </Button>
        </tbody>
      </Table>
    </GenericDialog>
  );
};

export default UploadRequestedDocDialog;
