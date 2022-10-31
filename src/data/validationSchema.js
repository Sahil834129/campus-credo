import * as Yup from "yup";
import YupPassword from 'yup-password';

YupPassword(Yup);
export const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Value is too short.").max(30, "Value is too long.").required("Required"),
    lastName: Yup.string().min(2, "Value is too short.").max(13, "Value is too long.").required("Required"),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().password().required('Required')
        .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .minSymbols(1, 'Password must contain at least 1 special character'),
    confirmPassword: Yup.string().required('Required')
        .when("password", {
            is: val => (val && val.length ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password and Confirm password must be the same."
            )
        }),
    phone: Yup.string().matches(/^[7-9]\d{9}$/, {message: "Please enter valid number.", excludeEmptyString: false}),
    //state: Yup.string().required('Required'),
    //city: Yup.string().required('Required'),
});

export const VerifyPhoneSchema = Yup.object().shape({
    otp: Yup.string().min(4).max(4).required('Required')
});

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});
export const ForgotPasswordSchema = Yup.object().shape({email: Yup.string().email('Invalid email').required('Required'),});
export const AddChildSchema  = Yup.object().shape({
    firstName: Yup.string().min(2, "Value is too short.").max(30, "Value is too long.").required("Required"),
    lastName: Yup.string().min(2, "Value is too short.").max(13, "Value is too long.").required("Required"),
    gender: Yup.string().required("Required"),
    dateOfBirth: Yup.string().required("Required"),
});
