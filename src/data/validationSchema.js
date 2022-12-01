import * as Yup from "yup";
import YupPassword from 'yup-password';

YupPassword(Yup);
export const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Value is too short.").max(30, "Value is too long.").matches(/^[a-zA-Z ]*$/, { message: 'Please enter only alphabets' }).required("Required *"),
    lastName: Yup.string().min(2, "Value is too short.").max(13, "Value is too long.").matches(/^[a-zA-Z ]*$/, { message: 'Please enter only alphabets' }).required("Required *"),
    email: Yup.string().email('Invalid email').required('Required *'),
    password: Yup.string().password().required('Required *')
        .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .minSymbols(1, 'Password must contain at least 1 special character'),
    confirmPassword: Yup.string().required('Required *')
        .when("password", {
            is: val => (val && val.length ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password and Confirm password must be the same."
            )
        }),
    phone: Yup.string().matches(/^[6-9]\d{9}$/gi, { message: "Please enter valid number.", excludeEmptyString: false }).max(10).required('Required *'),
    //state: Yup.string().required('Required'),
    //city: Yup.string().required('Required'),
});

export const VerifyPhoneSchema = Yup.object().shape({
    otp: Yup.string().matches(/^[0-9]+$/, { message: 'Please Enter only numeric value.' }).max(4).test('len', ' OTP Must Be Of 4 Digits', val => val.length === 4).required('Required *')
});

export const ForgotPasswordSchema = Yup.object().shape({ email: Yup.string().email('Invalid email').required('Required'), });
export const AddChildSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Value is too short.").max(30, "Value is too long.").required("Required *"),
    lastName: Yup.string().min(2, "Value is too short.").max(13, "Value is too long.").required("Required *"),
    gender: Yup.string().required("Required *"),
    dateOfBirth: Yup.string().required("Required *"),
});

export const UpdateProfileSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required *'),
});

export const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string().password().required('Required *')
        .min(8, 'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .minSymbols(1, 'Password must contain at least 1 special character'),
    confirmPassword: Yup.string().required('Required *')
        .when("password", {
            is: val => (val && val.length ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password and Confirm password must be the same."
            )
        })
});

export const UpdatePhoneSchema = Yup.object().shape({
    phone: Yup.string().matches(/^[6-9]\d{9}$/gi, { message: "Please enter valid number.", excludeEmptyString: false }).required('Required *'),
});

export const SignInSchema = Yup.object().shape({
    loginWithOTP: Yup.boolean(),
    phone: Yup.string().required('Required *').matches(/^[6-9]\d{9}$/gi, { message: "Please enter valid number.", excludeEmptyString: false }),
    password: Yup.string().when('loginWithOTP',{
        is: false,
        then: Yup.string().when('phone',{
            is: val => (val && val.length ? true : false),
            then: Yup.string().required('Required *')
        })
    }),
    otp: Yup.string().when('loginWithOTP',{
        is: true,
        then: Yup.string().when('phone',{
            is: val => (val && val.length ? true : false),
            then: Yup.string().required('Required *')
        })
    })
});