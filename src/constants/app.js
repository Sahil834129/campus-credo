export const FILE_SIZE = 3000000; // 3 MB
export const ACCEPT_MIME_TYPE = ["image/jpeg", "image/png", "application/pdf"];

export const DEFAULT_ROLES = {
  SCHOOL_ADMIN: "SCHOOL_ADMIN",
  ADMISSION_MANAGER: "ADMISSION_MANAGER",
  PRINCIPAL: "PRINCIPAL",
  SR_ADMISSION_MANAGER: "SR_ADMISSION_MANAGER",
  FEE_MANAGER: "FEE_MANAGER",
  SR_FEE_MANAGER: "SR_FEE_MANAGER",
  PARENT: "PARENT",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export const ADMIN_DASHBOARD_LINK = [
  { title: "Dashboard", url: "/dashboard", showsData: true },
  { title: "Manage Application", url: "/manage-application", showsData: true },
  { title: "Manage Admission", url: "/manage-admission", showsData: false },
  { title: "Manage Fee", url: "/manage-fees", showsData: false },
  { title: "Manage User", url: "/manage-user", showsData: false },
];

export const SUPER_ADMIN_LINK = [
  { title: "Application", url: "/all-application", showsData: true },
  { title: "Users", url: "/users", showsData: false },
];
export const DATE_FORMAT = "DD/MM/yyyy";

export const FILE_UPLOAD_ERROR = {
  FILE_SIZE_ERROR_MSG: "Upload file size should be less than 1 MB.",
  FILE_TYPE_ERROR_MSG: "Upload file type is not accpetable ",
};

export const PARENT_APPLICATION_STATUS = {
  SUBMITTED: "SUBMITTED",
  AT_PI_SCHEDULED: "AT_PI_SCHEDULED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
  DECLINED: "DECLINED",
  DENIED: "DENIED",
  UNDER_REVIEW: "UNDER_REVIEW",
  DOCUMENT_REQUESTED: "DOCUMENT_REQUESTED",
};

// School side statuses
export const SCHOOL_APPLICATION_STATUS = {
  RECEIVED: "RECEIVED",
  UNDER_REVIEW: "UNDER_REVIEW",
  AT_PI: "AT_PI",
  UNDER_FINAL_REVIEW: "UNDER_FINAL_REVIEW",
  APPROVED: "APPROVED",
  DECLINED: "DECLINED",
  DENIED: "DENIED",
  REVOKED: "REVOKED",
  ACCEPTED: "ACCEPTED",
  VIEW_APPLICANT_DETAILS: "VIEW_APPLICANT_DETAILS",
  DOCUMENT_REQUESTED: "DOCUMENT_REQUESTED",
  DOCUMENT_SUBMITTED: "DOCUMENT_SUBMITTED",
};

export const MANAGE_FEE_OPTIONS = [
  { value: "createFeeType", text: "Create Fee Type" },
  { value: "configureLateFee", text: "Configure Late Fee" },
  { value: "configureClassFees", text: "Configure Class Fees" },
  { value: "configureStudentFee", text: "Configure Student Fee" },
  { value: "offlineFee", text: "Offline Fee" },
];

export const MODE_OF_PAYMENT = [
  { value: "CASH", text: "Cash" },
  { value: "DEMAND_DRAFT", text: "Demand Draft" },
  { value: "CHEQUE", text: "Cheque" },
  { value: "OTHERS", text: "Others" },
];

export const FEE_TYPE_FREQUENCY = [
  { value: "MONTHLY", text: "MONTHLY" },
  { value: "QUARTERLY", text: "QUARTERLY" },
  { value: "HALF_YEARLY", text: "HALF-YEARLY" },
  { value: "ANNUALY", text: "ANNUALY" },
];

export const CLASS_SECTION = [
  { value: "A", text: "SECTION-A" },
  { value: "B", text: "SECTION-B" },
  { value: "C", text: "SECTION-C" },
];

export const LATE_FEE_FREQUENCY = [
  { value: "DAILY", text: "DAILY" },
  { value: "WEEKLY", text: "WEEKLY" },
];

export const FEE_SUBMISSION_LAST_DATES = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
];

export const SESSION = "2023-2024";

export const STATE_TRANSITION = {
  [SCHOOL_APPLICATION_STATUS.UNDER_REVIEW]: [
    SCHOOL_APPLICATION_STATUS.DOCUMENT_REQUESTED,
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
    SCHOOL_APPLICATION_STATUS.AT_PI,
    SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW,
    SCHOOL_APPLICATION_STATUS.DECLINED,
  ],
  [SCHOOL_APPLICATION_STATUS.RECEIVED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
  [SCHOOL_APPLICATION_STATUS.AT_PI]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
    SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW,
    SCHOOL_APPLICATION_STATUS.DECLINED,
  ],
  [SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
    SCHOOL_APPLICATION_STATUS.APPROVED,
    SCHOOL_APPLICATION_STATUS.DECLINED,
  ],
  [SCHOOL_APPLICATION_STATUS.APPROVED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
    SCHOOL_APPLICATION_STATUS.REVOKED,
  ],
  [SCHOOL_APPLICATION_STATUS.REVOKED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
    SCHOOL_APPLICATION_STATUS.UNDER_REVIEW,
  ],
  [SCHOOL_APPLICATION_STATUS.DECLINED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
  [SCHOOL_APPLICATION_STATUS.DENIED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
  [SCHOOL_APPLICATION_STATUS.ACCEPTED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
  [SCHOOL_APPLICATION_STATUS.DOCUMENT_REQUESTED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
  [SCHOOL_APPLICATION_STATUS.DOCUMENT_SUBMITTED]: [
    SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS,
  ],
};

export const OPERATORS = {
  EQUALS: "EQUALS",
  IN: "IN",
  BETWEEN: "BETWEEN",
  LIKE: "LIKE",
};

export const MANAGE_USER_PERMISSION = ["READ", "NONE", "WRITE"];
