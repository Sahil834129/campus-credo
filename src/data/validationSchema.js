import * as Yup from "yup";
import YupPassword from "yup-password";
import { getStudentAge } from "../utils/helper";

YupPassword(Yup);
export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .matches(/^[a-zA-Z ]*$/, { message: "Please enter only alphabets" })
    .required("Required *"),
  lastName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .matches(/^[a-zA-Z ]*$/, { message: "Please enter only alphabets" })
    .required("Required *"),
  email: Yup.string().email("Invalid email").required("Required *"),
  password: Yup.string()
    .password()
    .required("Required *")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character"),
  confirmPassword: Yup.string()
    .required("Required *")
    .when("password", {
      is: (val) => (val && val.length ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm password must be the same."
      ),
    }),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/gi, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .max(10)
    .required("Required *"),
  state: Yup.string().required("Required *"),
  city: Yup.string().required("Required *"),
});

export const VerifyPhoneSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^[0-9]+$/, { message: "Please Enter only numeric value." })
    .max(4, "OTP Must Be Of 4 Digits")
    .test("len", " OTP Must Be Of 4 Digits", (val) => val.length === 4)
    .required("Required *"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required *"),
});
export const AddChildSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .required("Required *"),
  lastName: Yup.string()
    .min(2, "Value is too short.")
    .max(13, "Value is too long.")
    .required("Required *"),
  gender: Yup.string().required("Required *"),
  dateOfBirth: Yup.string()
    .required("Required *")
    .test(
      "DOB",
      "Please select a valid date, age should be at least 2 years at 31st March current year.",
      (value) => {
        return value && value != "" && getStudentAge(value) >= 2;
      }
    ),
});

export const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required *"),
  state: Yup.string().required("Required *"),
  city: Yup.string().required("Required *"),
});

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .password()
    .required("Required *")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .minLowercase(1, "Password must contain at least 1 lower case letter")
    .minUppercase(1, "Password must contain at least 1 upper case letter")
    .minNumbers(1, "Password must contain at least 1 number")
    .minSymbols(1, "Password must contain at least 1 special character"),
  confirmPassword: Yup.string()
    .required("Required *")
    .when("password", {
      is: (val) => (val && val.length ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm password must be the same."
      ),
    }),
});

export const UpdatePhoneSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/gi, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .required("Required *"),
});

export const SignInSchema = Yup.object().shape({
  loginWithOTP: Yup.boolean(),
  phone: Yup.string()
    .required("Required *")
    .matches(/^[6-9]\d{9}$/gi, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    }),
  password: Yup.string().when("loginWithOTP", {
    is: false,
    then: Yup.string().when("phone", {
      is: (val) => (val && val.length ? true : false),
      then: Yup.string().required("Required *"),
    }),
  }),
  otp: Yup.string().when("loginWithOTP", {
    is: true,
    then: Yup.string().when("phone", {
      is: (val) => (val && val.length ? true : false),
      then: Yup.string().required("Required *"),
    }),
  }),
});

export const StudentDetailsSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .required("Required *"),
  lastName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .required("Required *"),
  dateOfBirth: Yup.string().required("Required *"),
  gender: Yup.string().required("Required *"),
  className: Yup.string().required("Required *"),
  religion: Yup.string().required("Required *"),
  identificationMarks: Yup.string().when("hasIdentificationMarks", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  nationality: Yup.string().required("Required *"),
  category: Yup.string().required("Required *"),
  schoolName: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  schoolBoard: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  unit: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  obtainedMarks: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().when("unit", {
      is: (val) => val && (val === "SGPA" || val === "Percentage"),
      then: Yup.string().required("Required *"),
    }),
  }),
  grade: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().when("unit", {
      is: (val) => val && val === "Grades",
      then: Yup.string().required("Required *"),
    }),
  }),
  maxMarks: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().when("unit", {
      is: (val) => val && (val === "SGPA" || val === "Percentage"),
      then: Yup.string().required("Required *"),
    }),
  }),
  marksInPercentage: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  schoolAddressLine1: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  schoolState: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  schoolCity: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  schoolPincode: Yup.string().when("isProvidingCurrentSchoolInfo", {
    is: (val) => val && val === "Yes",
    then: Yup.string()
      .required("Required *")
      .matches(/\d{6}$/gi, {
        message: "Please enter valid 6 digit number.",
        excludeEmptyString: false,
      }),
  }),
  addressLine1: Yup.string().required("Required *"),
  familyIncome: Yup.string()
    .required("Required *")
    .matches(/^[0-9]+(\.[0-9][0-9]?)?$/, {
      message: "Please enter valid income.",
      excludeEmptyString: false,
    }),
  //addressLine2: Yup.string().required("Required *"),
  pincode: Yup.string()
    .required("Required *")
    .matches(/\d{6}$/gi, {
      message: "Please enter valid 6 digit number.",
      excludeEmptyString: false,
    }),
  state: Yup.string().required("Required *"),
  city: Yup.string().required("Required *"),
});

export const StudentMedicalDetailsSchema = Yup.object().shape({
  bloodGroup: Yup.string().required("Required *"),
  allergies: Yup.string().when("hasAllergies", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  medicalConditions: Yup.string().when("hasMedicalConditions", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  specialCare: Yup.string().when("doesNeedSpecialCare", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  otherDisability: Yup.string().when("disabilities", {
    is: (val) => val && val.indexOf("Other") >= 0,
    then: Yup.string().required("Required *"),
  }),
});

export const StudentBackgroundCheckSchema = Yup.object().shape({
  violenceBehaviour: Yup.string().when("hadViolenceBehavior", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
  suspension: Yup.string().when("hadSuspension", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),

  offensiveConduct: Yup.string().when("anyOffensiveConduct", {
    is: (val) => val && val === "Yes",
    then: Yup.string().required("Required *"),
  }),
});
export const ContactInfoSchema = Yup.object().shape({
  fullName: Yup.string().required("Required *"),
  email: Yup.string().email("Invalid email").required("Required *"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/gi, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .max(10)
    .required("Required *"),
  category: Yup.string().required("Required *"),
  otherCategory: Yup.string().when("category", {
    is: (val) => val && val === "Others",
    then: Yup.string().required("Required*"),
  }),
  message: Yup.string().required("Required *"),
});
export const StudentParentGuardianSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .required("Required *"),
  lastName: Yup.string()
    .min(2, "Value is too short.")
    .max(30, "Value is too long.")
    .required("Required *"),
  otherRelation: Yup.string().when("relation", {
    is: (val) => val && val !== "father" && val !== "mother",
    then: Yup.string().required("Required*"),
  }),
  otherNationality: Yup.string().when("nationality", {
    is: (val) => val && val === "Other",
    then: Yup.string().required("Required *"),
  }),
  qualification: Yup.string().required("Required *"),
  occupation: Yup.string().required("Required *"),
  dateOfBirth: Yup.string().required("Required *"),
  annualFamilyIncome: Yup.string()
    .required("Required *")
    .matches(/^[0-9]+(\.[0-9][0-9]?)?$/, {
      message: "Please enter valid income.",
      excludeEmptyString: false,
    }),
  addressLine1: Yup.string().when("isAddressSameAsStudent", {
    is: (val) => val && val === "No",
    then: Yup.string().required("Required *"),
  }),
  // addressLine2: Yup.string().when("isAddressSameAsStudent", {
  //   is: (val) => val && val === "No",
  //   then: Yup.string().required("Required *"),
  // }),
  city: Yup.string().when("isAddressSameAsStudent", {
    is: (val) => val && val === "No",
    then: Yup.string().required("Required *"),
  }),
  state: Yup.string().when("isAddressSameAsStudent", {
    is: (val) => val && val === "No",
    then: Yup.string().required("Required *"),
  }),
  pincode: Yup.string().when("isAddressSameAsStudent", {
    is: (val) => val && val === "No",
    then: Yup.string().required("Required *"),
  }),
});
