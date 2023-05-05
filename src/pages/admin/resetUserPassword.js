import { Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import InputField from "../../components/form/InputField";
import { changeAdminPassword } from "../../data/validationSchema";
import GenericDialog from "../../dialogs/GenericDialog";
import { resetSchoolAdminPassword } from "../../utils/services";

const ResetUserPassword = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [passwordError, setPasswordError] = useState(false);
  const togglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const toggleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };
  const handlePasswordSubmit = async (data, resetForm) => {
    setSubmitting(true);
    resetSchoolAdminPassword(data)
      .then((res) => {
        toast.success("Password is changed");
        setSubmitting(false);
        props.handleClose();
      })
      .catch((e) => {
        setSubmitting(false);
        // toast.error(e);
        let error = e.response.data.apierror.message;
        setPasswordError(error);
      });
  };

  return (
    <GenericDialog
      className="change-pwd-model"
      show={props.show}
      handleClose={() => {
        setPasswordError("");
        props.handleClose();
      }}
      modalHeader="Change Password"
    >
      {!submitting && (
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={changeAdminPassword}
          onSubmit={(values, { resetForm }) => {
            handlePasswordSubmit(values, resetForm);
          }}
        >
          {({ errors, touched, resetForm }) => (
            <Form className="form-container forgot-pwd" noValidate>
              <div className="frm-cell cpwd-wrap">
                <label className="lbl">Current Password</label>
                <div className="pwd-fld-inner">
                  <InputField
                    fieldName="currentPassword"
                    fieldType={passwordType}
                    placeholder="Enter Current Password"
                    label=""
                    errors={errors}
                    touched={touched}
                  />
                  <span
                    className="view-pwd-icon"
                    onClick={() => {
                      togglePassword();
                    }}
                  >
                    {passwordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </span>
                </div>
                {passwordError && (
                  <span className="error-exception">{passwordError}</span>
                )}
              </div>
              
              <div className="frm-cell mt-3">
                <label className="lbl">New Password</label>
                <div className="pwd-fld-inner">
                  <InputField
                    fieldName="password"
                    fieldType={confirmPasswordType}
                    placeholder="Enter New Password"
                    label=""
                    errors={errors}
                    touched={touched}
                  />
                  <span
                    className="view-pwd-icon"
                    onClick={() => {
                      toggleConfirmPassword();
                    }}
                  >
                    {confirmPasswordType === "password" ? (
                      <i className="bi bi-eye-slash"></i>
                    ) : (
                      <i className="bi bi-eye"></i>
                    )}
                  </span>
                </div>
              </div>

              <div className="frm-cell mt-3">
                <label className="lbl">Confirm New Password</label>
                <div className="pwd-fld-inner">
                  <InputField
                    fieldName="confirmPassword"
                    fieldType="password"
                    placeholder="Confirm New Password"
                    label=""
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              <div className="frm-cell btn-wrapper mt-3">
                <Button type="submit" variant="primary" className="confirm-btn">
                  Confirm
                </Button>
                <Button
                  variant="primary"
                  className="cancel-btn"
                  onClick={props.handleClose}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {submitting && (
        <div style={{ margin: "50px auto" }}>
          <Spinner animation="border" />
        </div>
      )}
    </GenericDialog>
  );
};

export default ResetUserPassword;
