const RestEndPoint = {
  GET_STATE: "v1/state",
  GET_STATE_CITIES: "v1/city",
  GET_MEDIUM_OF_INSTRUCTIONS: "v1/school/schoolMedium",
  GET_SCHOOL_BOARDS: "v1/school/schoolBoard",
  GET_SCHOOL_GENDER: "v1/school/schoolGender",
  GET_SCHOOL_FACILITIES: "v1/school/facilities",
  GET_SCHOOL_EXTRA_CURRICULAR_ACTIVITIES: "v1/school/extracurricularActivities",
  GET_SCHOOL_CLASSES: "v1/school/classes",
  GET_SCHOOL_CLASSES_WITH_AGE: "v1/school/classesWithAge",
  REGISTER: "user/register",
  VERIFY_PHONE: "user/verifyPhone/",
  SEND_OTP: "user/sendOtp",
  LOGIN_WITH_OTP: "user/loginWithOtp",
  LOGIN_WITH_PASSWORD: "user/loginWithPassword",
  REFRESH_TOKEN: "user/refreshToken",
  FORGOT_PASSWORD: "user/forgetPassword",
  FIND_SCHOOLS: "/v1/school/find",
  FIND_NEARBY_SCHOOL: "/v1/nearbyschools",
  SCHOOL_BY_ID: "/v1/schooldetails",
  GET_CHILD_LIST: "/parent/childList",
  ADD_CHILD: "/parent/child/create",
  UPDATE_CHILD: "/parent/child",
  ADD_TO_CART: "/applicationCart/applicationList",
  APPLICATION_CART_BASE: "/applicationCart",
  GET_CART_ITEMS: "/applicationCart/child",
  GET_CITIES: "/v1/school/city",
  CREATE_STUDENT_PROFILE: "student/profile",
  GET_STUDENT_PROFILE: "student/profile",
  GET_STUDENT_PARENT: "parent/guardian",
  GET_STUDENT_MEDICAL_DETAILS: "student/medicalDetail",
  CREATE_STUDENT_MEDICAL_DETAILS: "student/medicalDetail",
  CREATE_STUDENT_PROFILE_EXTRA_CURRICULARS: "student/profile/extracurriculars",
  CREATE_STUDENT_PROFILE_BACKGROUND_CHECK: "student/profile/backgroundCheck",
  STUDENT_DOCUMENT: "student/documents",
  STUDENT_DOCUMENT_UPLOAD: "student/document/upload",
  APPLICATION_CHECKOUT: "applicationCart/checkOutApplication",
  GET_APPLICATION_LIST: "admission/application",
  GET_DISABILITIES: "v1/school/disabilities",
  GET_PARENT_OCCUPATION: "v1/school/parentOccupation",
  MARK_PROFILE_COMPLETE: "/student/markProfileComplete",
  GET_USER_DETAILS: "/parent/getProfile",
  GET_USER_LOCATION: "/parent/userLocation",
  UPDATE_USER: "/parent/updateUser",
  UPDATE_USER_LOCATION: "/parent/update/userLocation",
  SAVE_USER_ADDRESS: "/parent/save/userLocation",
  UPDATE_USER_ADDRESS: "/parent/update/userLocation",
  CHANGE_PASSWORD: "/parent/changePassword",
  UPDATE_PHONE: "/parent/updatePhone",
  CLASS_ADMISSION_DATA: "/admission/classAdmissionData",
  REMOVE_ADMISSION_DATA: "/admission/removeClassAdmissionData",
  UPDATE_SEAT_ADMISSION_DATA: "/admission/classAdmissionData",
  APPLICATION_FILTER_DATA: "/admissionApplications/find",
  SUPER_ADMIN_FILTER_DATA:"/superAdmin/find/allApplications",
  SCHOOL_ADMISSION_SUMMARY: "admission/application/schoolAdmissionSummary",
  SCHOOL_ADMISSION_FEE_SUMMARY: "dashboard/schoolAdmissionFeeSummary",
  RESET_PASSWORD: "user/resetPassword",
  DOWNLOAD_DOCUMENT: "/student/download/document",
  DOWNLOAD_ADMIN_DOCUMENT: "/admissionApplications/download/document",
  DOWNLOAD_APPLICATION_ON_PARENT_DASHBOARD:
    "/admission/applicationform/download",
  DOWNLOAD_PAYMENT_INVOICE: "/admission/download/invoice",
  DOWNLOAD_MONEY_RECEIPT_INVOICE: "/admission/download/moneyReceipt",
  CLASS_ADMISSION_SESSION_DATA: "admission/classAdmissionSessions",
  CLASS_ADMISSION_SUMMARY: "admissionApplications/classAdmissionSummary",
  CLASS_APPLICATION_CLASS: "admissionApplications/classApplicationsByClass",
  CHANGE_APPLICATION_STATUS: "admissionApplications/changeApplicationStatus",
  CHANGE_BULK_APPLICATION_STATUS:
    "admissionApplications/changeBulkApplicationStatus",
  SCHOOL_CLASSES_DATA: "v1/schooldetails",
  APPLICANT_DETAIL: "admissionApplications",
  ATPI_FOR_CLASS: "admissionApplications/ATPIForClass/",
  DOWNLOAD_APPLICANT_DETAIL:
    "admissionApplications/zip/downloadApplicantDocument",
  MANAGE_PERMISSION_ROLES: "managePermissions/roles",
  MANAGE_PERMISSIONS: "managePermissions/permissions",
  MANAGE_PERMISSION_MODULES: "managePermissions/modules",
  UPDATE_USER_MODULE_PERMISSION:
    "managePermissions/updateUserModulePermissions",
  APPLICATION_CHART_STATUS:
    "admission/application/school/classes/applicationReceivedAcceptedApprovedDeclined",
  UPDATE_APPLICATION_STATUS: "admission/application/updateApplicationStatus",
  CHANGE_USER_PASSWORD: "managePermissions/changeUserPassword",
  RESET_ADMIN_PASSWORD: "school/admin/changePassword",
  CONTACT_US: "/user/contactUs",
  PLACE_CART_ORDER: "payment/placeOrder",
  PLACE_REGISTRATION_ORDER: "payment/payRegistrationFee",
  POPULAR_SCHOOL: "v1/popularschools",
  REQUEST_CALLBACK: "v1/school/callBack",
  REGISTRATION_CHECKOUT: "payment/registrationCheckout",
  JOIN_US: "user/joinUs",
  GET_CITY_NAME: "v1/cityNameByLatitudeAndLongitude",
  GET_PAYMENT_HISTORY: "payment/paymentHistory",
  ZIP_DOWNLOAD_APPLICATION: "/admissionApplications/zip/downloadApplications",
  PLACE_ORDER: "payment/placeOrder",
  PROCESS_AFTER_PAYMENT: "payment/processOrderAfterPayment",
  UPDATE_USER_EXCEL_DATA: "/superAdmin/uploadUserExcelData",
  GET_PARTNER_SCHOOL: "/superAdmin/getAll/partnerSchools",
  GET_SCHOOL_USERS:"/superAdmin/getSchoolUsers",
  GET_ADD_DELET_SCHOOL_FEE_TYPE:"/fee/schoolFeeType",
  UPDATE_FEE_SETTING:"/fee/feeSettings",
  GET_ADD_UPDATE_CLASS_FEE_DETAILS:"/fee/classFee",
  FIND_STUDENT_DETAILS:"/schoolStudent/fee/findStudents"

};

export default RestEndPoint;
