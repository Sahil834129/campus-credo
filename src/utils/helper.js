import moment from "moment";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ADMIN_DASHBOARD_LINK, MANAGE_USER_PERMISSION, PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS } from "../constants/app";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { getDefaultDateFormat } from "./DateUtil";
import RESTClient from "./RestClient";
import StringUtils from "./StringUtils";

export const refreshAccessToken = async () => {
  try {
    const response = await RESTClient.post(RestEndPoint.REFRESH_TOKEN, {
      refreshToken: getLocalData("refreshToken"),
    });
    setLocalData("token", response.data.token);
    setLocalData("refreshToken", response.data.refreshToken);
    return response.data.token;
  } catch (error) {
    logout();
    console.log("Error :" + error);
  }
};

export const setLocalData = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    //console.log("error: " + e)
  }
};

export const logout = () => {
  resetUserLoginData();
  // window.location.reload(); 
  window.location.href = '/';
};

export const resetUserLoginData = () => {
  localStorage.clear();
};

export const setUserLoginData = (loginData, SchoolDetailsLatitude, SchoolDetailsLongitude, cities) => {
  setLocalData("token", loginData.token);
  setLocalData("refreshToken", loginData.refreshToken);
  setLocalData("modulePermissions", JSON.stringify(loginData.modulePermissions || []));
  setLocalData("name", loginData?.firstName);
  setLocalData("roles", loginData?.roles);
  setLocalData("schoolId", loginData?.schoolId);
  setLocalData("userId", loginData?.userId);
  setLocalData("schoolName", loginData?.schoolName);
  setLocalData("sessionStartDate", loginData?.sessionStartDate);
  setLocalData("sessionEndDate", loginData?.sessionEndDate);
  setLocalData("schoolEmail", loginData?.schoolEmail);
  setLocalData("schoolContactNumber", loginData?.schoolContactNumber);
  setLocalData("admissionSession", loginData?.admissionSession);
  if (!isEmpty(loginData?.userLocationDtos[0])) {
    const isCityExist = (cities || "").split(',').find(val => val.toLowerCase() === loginData?.userLocationDtos[0].cityName.toLowerCase())
    if(isCityExist !== undefined) {
      setLocalData("userLocation", loginData?.userLocationDtos[0].cityName);
      setLocalData("selectedLocation", loginData?.userLocationDtos[0].cityName);
    } else {
      setLocalData("userLocation", 'Kolkata');
      setLocalData("selectedLocation", 'Kolkata');
    }
    setLocalData("userLatitude", loginData?.userLocationDtos[0].latitude);
    setLocalData("userLongitude", loginData?.userLocationDtos[0].longitude);
  }
  if (SchoolDetailsLatitude || SchoolDetailsLongitude) {
    setLocalData("SchoolDetailsLatitude", SchoolDetailsLatitude);
    setLocalData("SchoolDetailsLongitude", SchoolDetailsLongitude);
  }
};

export const getLocalData = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalDataItem = (key) => {
  localStorage.removeItem(key);
};

export const isLoggedIn = () => {
  try {
    return localStorage.getItem("token") !== null;
  } catch (e) {
    console.log("Error on getting loggen in user : " + e);
  }
  return false;
};

export const isValidatePhone = (v) => {
  const phoneSchema = Yup.string().matches(/^[7-9]\d{9}$/, {
    message: "Please enter valid number.",
    excludeEmptyString: false,
  });
  try {
    phoneSchema.validateSync(v);
    return true;
  } catch (error) {
    return false;
  }
};

export const str2bool = (value) => {
  if (value && typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return value;
};

export function humanize(str, changeStatusVal) {
  let i;
  try {
    if (changeStatusVal) {
      if (str === SCHOOL_APPLICATION_STATUS.AT_PI) {
        return "Shortlist for AT/PI";
      }
      if (str === SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW) {
        return "Send For Final Approval";
      }
      if (str === SCHOOL_APPLICATION_STATUS.APPROVED) {
        return "Approved";
      }
      if (str === SCHOOL_APPLICATION_STATUS.DECLINED) {
        return "Declined";
      }
    }
    let frags = str ? str.split("_") : [];
    for (i = 0; i < frags.length; i++) {
      frags[i] =
        frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags.join(" ");
  } catch (e) {
    console.log(e, str);
    return str;
  }
}

export function getPresentableRoleName(roleName) {
  switch (roleName) {
    case 'SR_FEE_MANAGER':
      return 'Sr. Fees Manager';
    case 'SR_ADMISSION_MANAGER':
      return 'Sr. Admission Manager';
    case 'FEE_MANAGER':
      return 'Fees Manager';
    default:
      return humanize(roleName);
  }
}

export function convertCamelCaseToPresentableText(str) {

  if (str.includes('-')) {
    let string = str.replace("-", " ");
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export function gotoHome(e, navigate) {
  e.preventDefault();
  navigate(isLoggedIn() ? "/userProfile" : "/");
}

export function getStudentAge(dateOfBirth) {
  const baseDate = moment().set("date", 31).set("month", 2);
  return baseDate.diff(moment(dateOfBirth, getDefaultDateFormat()), "years");
}

export function getAge(dateOfBirth) {
  return moment().diff(moment(dateOfBirth, getDefaultDateFormat()), "years");
}

export function getChildAge(dateOfBirth) {
  let dateAsOnSTR = "31/03/" + moment().year();
  let age = 0;
  try {
    age = moment(dateAsOnSTR, "DD/MM/YYYY").diff(
      moment(dateOfBirth, "DD/MM/YYYY"),
      "years"
    );
  } catch (error) {
    console.log("Error while parsing the date : " + dateOfBirth);
  }
  return age;
}

export function getStudentMaxDateOfBirth() {
  return moment().subtract(2, "years").set("date", 31).set("month", 2).toDate();
}

export function getGuadianMaxDateOfBirth() {
  return moment().subtract(10, "years").toDate();
}

// It needs an array of class names and returns the suitable class based on student age
export function getClassBasedOnAge(classMapWithAge, classOptions, childAge) {
  let age = 0;
  let availableClassOptionsAgeMap = {};
  let classOptionTexts = classOptions.length
    ? classOptions.map((it) => it.text.toLowerCase())
    : [];
  Object.entries(classMapWithAge).forEach(([k, v]) => {
    if (classOptionTexts.indexOf(v.replace("_", " ").toLowerCase()) >= 0)
      availableClassOptionsAgeMap[k] = v.replace("_", " ");
  });
  Object.keys(availableClassOptionsAgeMap).forEach((value, idx) => {
    if (parseInt(value) <= childAge && parseInt(value) > age) age = value;
  });
  return availableClassOptionsAgeMap[parseInt(age)];
}

export function isEmpty(obj) {
  return (
    obj === null ||
    obj === "null" ||
    obj === undefined ||
    obj === "undefined" ||
    obj.length === 0
  );
}

export const getHeaderLink = () => {
  let modulePermissions = getLocalData('modulePermissions');
  if (modulePermissions !== null) {
    modulePermissions = JSON.parse(modulePermissions);
    return ADMIN_DASHBOARD_LINK.map(adminVal => {
      const filterData = modulePermissions.find(val => val.moduleName === adminVal.title);
      if (adminVal.title !== "Dashboard") {
        adminVal.isPermit = filterData?.permissionType || MANAGE_USER_PERMISSION[1];
        adminVal.canApprove = filterData?.canApprove || false;
      } else {
        adminVal.isPermit = MANAGE_USER_PERMISSION[0];
        adminVal.canApprove = false;
      }
      return adminVal;
    });
  }
  return [];
};


export const getCurrentModulePermission = (moduleName) => {
  let modulePermissions = getLocalData('modulePermissions');
  let flag = false;
  if (modulePermissions !== null) {
    modulePermissions = JSON.parse(modulePermissions);
    flag = !!modulePermissions.find(val => val.moduleName === moduleName && val.permissionType.indexOf(MANAGE_USER_PERMISSION[2]) !== -1);
  }
  return flag;
};

export const userCanNotApprove = (isApproveY) => {
  let modulePermissions = getLocalData('modulePermissions');
  let flag = false;
  if (modulePermissions !== null) {
    modulePermissions = JSON.parse(modulePermissions);
    flag = modulePermissions.find(val => { 
      let isApproveYValid = isApproveY ? (val.permissionType.indexOf('APPROVE-Y') !== -1) : val.canApprove
      return val.moduleName === "Manage Application" && isApproveYValid;
    });
  }
  return flag;
};
export const getStatusLabel = (status) => {
  switch (status) {
    case PARENT_APPLICATION_STATUS.AT_PI_SCHEDULED:
      return "Shortlisted for Personal Interview/Admission Test";
    case PARENT_APPLICATION_STATUS.SUBMITTED:
      return "Application Submitted";
    case PARENT_APPLICATION_STATUS.UNDER_REVIEW:
      return "Application Under Review";
    case PARENT_APPLICATION_STATUS.ACCEPTED:
      return "Offer Accepted";
    case PARENT_APPLICATION_STATUS.REJECTED:
      return "Offer Declined";
    case PARENT_APPLICATION_STATUS.APPROVED:
      return "Application Approved";
    case PARENT_APPLICATION_STATUS.DECLINED:
      return "Application Declined";
    case PARENT_APPLICATION_STATUS.DENIED:
      return "Offer Denied";
    default:
      return StringUtils.capitalizeFirstLetter(StringUtils.replaceUnderScoreWithSpace(status));
  }
};
export const getStatusLabelForSchool = (applicationStatus) => {
  switch (applicationStatus) {
    case SCHOOL_APPLICATION_STATUS.AT_PI:
      return "AT/PI";
    case SCHOOL_APPLICATION_STATUS.RECEIVED:
      return "Application Received";
    case SCHOOL_APPLICATION_STATUS.UNDER_REVIEW:
      return "Under Review";
    case SCHOOL_APPLICATION_STATUS.ACCEPTED:
      return "Offer Accepted";
    case SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW:
      return "Under Final Review";
    case SCHOOL_APPLICATION_STATUS.APPROVED:
      return "Application Approved";
    case SCHOOL_APPLICATION_STATUS.REVOKED:
      return "Application Revoked";
    case SCHOOL_APPLICATION_STATUS.DECLINED:
      return "Application Declined";
    case SCHOOL_APPLICATION_STATUS.DENIED:
      return "Offer Declined";

    default:
      return humanize(applicationStatus, true);
  }
};
export const getActionButtonLabel = (applicationStatus) => {
  switch (applicationStatus) {
    case SCHOOL_APPLICATION_STATUS.APPROVED:
      return "Approve";
    case SCHOOL_APPLICATION_STATUS.REVOKED:
      return "Revoke";
    case SCHOOL_APPLICATION_STATUS.DECLINED:
      return "Decline";
    case SCHOOL_APPLICATION_STATUS.UNDER_REVIEW:
      return "Move to Under Review";
    case SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW:
      return "Move to Final Review";
    case SCHOOL_APPLICATION_STATUS.AT_PI:
      return "Shortlist for AT/PI";
    default:
      return humanize(applicationStatus, true);
  }
};
export const getUserlocation = (defaultLocation) => {
  if (isLoggedIn() && !isEmpty(getLocalData("userLocation"))) {
    let userLocation = getLocalData("userLocation");
    return userLocation;
  }
  else
    return defaultLocation;
};

export const getUserLocation = async () => {
  try {
    const response = await RESTClient.get(RestEndPoint.GET_USER_LOCATION);
    return response.data[0];
  } catch (err) {
    toast.error(RESTClient.getAPIErrorMessage(err));
  }
};

export const getGeoLocationState = async () => {
  const permissions = await navigator.permissions.query({ name: 'geolocation' });
  return permissions;
};

export const getPastSession = () => {
  let currentYear = (new Date()).getFullYear();
  let startYear = currentYear - 1;
  let endYear = currentYear;
  return `${startYear}-${endYear}`;
};

export const Pathnames =
  [
    "/",
    "/paymentHistory",
    "/paymentCheckout",
    "/selectedSchools",
    "/manageChild",
    "/userProfile",
    "/manageProfile",
    "/admissionForm",
    "/manage-application",
    "/manage-user",
    "/manage-fees",
    "/manage-admission",
    "/termsAndConditions",
    "/dashboard",
    "/schools",
    "/howItWorks",
    "/aboutUs",
    "/disclaimerPolicy",
    "/termsOfService",
    "/faqs",
    "/contactUs",
    "/user/reset/:token",
    "/signIn",
    "/signup",
    "/privacyPolicy",
    "/orderConfirm",
    "/notFound",
    "/schools/:id",
    "/verifyPhone/:phone",
    "/paymentFailed"
  ];

export const checkIfCityExists = (cities) => {
  if (!isEmpty(getLocalData("userLocation"))) {
    let userLocation = getLocalData("userLocation");
    if (cities && cities.includes(userLocation)) {
      return userLocation;
    }
  }
  else {
    return false;
  }
};

export const checkSelectedCityWithUserCity = () => {
  let selectedCity = getLocalData("selectedLocation");
  let userCity = getLocalData("userLocation");
  if (selectedCity === userCity)
    return true;
  else return false;
};