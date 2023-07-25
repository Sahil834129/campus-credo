import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NoRecordsFound from "../common/NoRecordsFound";
import { requestDocument } from "../data/validationSchema";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import { humanize } from "../utils/helper";
import { updateApplicationStatus } from "../utils/services";
import GenericDialog from "./GenericDialog";

const RequestDocumentDialog = ({
  show,
  applicationId,
  handleClose,
  classId,
  callAllApi,
  sessionValue,
  setApiError,
}) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [emptyListError, setEmptyListError] = useState("");
  const [documents, setDocuments] = useState([]);
  const [otherDocument, setOtherDocument] = useState(false);
  const [key, setKey] = useState("student");

  const getApplicationDetail = async (applicationId) => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.APPLICANT_DETAIL + `/${applicationId}`
      );
      if (response.data?.applicantDocument !== "") {
        setDocuments(response.data?.applicantDocument || []);
      }
    } catch (error) {
      setDocuments([]);
    }
  };

  const requestDocumentApiCall = (documentString, comment) => {
    setSubmitting(true);
    let payload = {
      applicationId: applicationId,
      applicationStatus: "DOCUMENT_REQUESTED",
      documentsRequested: documentString,
      documentsRequestedComment: comment,
    };

    updateApplicationStatus(payload)
      .then((response) => {
        setSubmitting(false);
        callAllApi(classId, sessionValue);
        handleClose();
      })
      .catch((res) => {
        setSubmitting(false);
        const messageData = res?.response?.data?.apierror?.message;
        setApiError(messageData);
        // handleClose();
      });
  };
  const handleSubmitDocumentRequest = (values, resetForm) => {
    let selectedValuesString;
    values = {
      ...values,
      groups: values.groups.filter((e) => e),
    };
    if (values.other && !values.groups.length) {
      setEmptyListError("");
      selectedValuesString = values.other;
      requestDocumentApiCall(selectedValuesString);
      resetForm();
    } else if (values.groups.length > 0) {
      setEmptyListError("");
      selectedValuesString = values.groups.join(", ");
      if (values.other) {
        selectedValuesString = selectedValuesString + ", " + values.other;
      }
      requestDocumentApiCall(selectedValuesString, values.comment);
      resetForm();
    } else {
      setEmptyListError("Please select atleast one document");
    }
  };
  useEffect(() => {
    setEmptyListError("");
    setOtherDocument(false);
    if (applicationId && applicationId !== "") {
      getApplicationDetail(applicationId);
    }
  }, [applicationId, handleClose]);

  return (
    <GenericDialog
      show={show}
      className="confirmation-modal"
      handleClose={handleClose}
      modalHeader="Request Documents"
    >
      <div className="model-body-col">
        <div className="message-content" style={{ marginBottom: "10px" }}>
          <label className="form-label">
            Please Select the required document,
          </label>
        </div>
        <div className="tab-wrapper">
          <Formik
            initialValues={{
              groups: [],
              otherCheckbox: false,
              other: "",
              comment: "",
            }}
            validationSchema={() => requestDocument(otherDocument)}
            onSubmit={(values, { resetForm }) => {
              setOtherDocument(false);

              handleSubmitDocumentRequest(values, { resetForm });
            }}
          >
            {({ values, setFieldValue, errors, touched, resetForm }) => (
              <Form>
                {emptyListError && (
                  <span name="groups" component="div" className="text-danger">
                    {emptyListError}
                  </span>
                )}
                <div className="document-container">
                  {documents.length > 0 ? (
                    <div>
                      {documents.map((document, index) => (
                        <div
                          key={"childDoc_" + index}
                          className="tab-outer-wrap"
                        >
                          <input
                            type="checkbox"
                            name="groups"
                            onChange={(event) => {
                              const value = event.target.checked
                                ? document.documentName
                                : "";
                              setFieldValue(`groups.${index}`, value);
                            }}
                          />
                          {humanize(document.documentName)}
                        </div>
                      ))}
                      <input
                        type="checkbox"
                        name="otherCheckbox"
                        onChange={(e) => setOtherDocument(e.target.checked)}
                      />
                      Other{" "}
                      {otherDocument && (
                        <input
                          name="other"
                          type="text"
                          placeholder="Enter document name here"
                          onChange={(e) =>
                            setFieldValue("other", e.target.value)
                          }
                        />
                      )}
                      {errors.other && touched.other && (
                        <span className="text-danger">{errors.other}</span>
                      )}
                      <label className="form-label">Please add comment</label>
                      <input
                        name="comment"
                        type="text"
                        placeholder="Enter comment here"
                        onChange={(e) =>
                          setFieldValue("comment", e.target.value)
                        }
                      />
                      {errors.comment && touched.comment && (
                        <span className="text-danger">{errors.comment}</span>
                      )}
                      <Button
                        className="submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button>
                    </div>
                  ) : (
                    <NoRecordsFound message="No documents uploaded yet." />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </GenericDialog>
  );
};

export default RequestDocumentDialog;
