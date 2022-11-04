import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {HomePage, AboutUs, HowItWorks, AllSchools, ContactUs, FAQ, TermsOfUse, PrivacyPolicy, SignUp, SignIn, VerifyPhone, SchoolDetails, ApplicationCart, UserProfile, SchoolAdmission} from "../pages";
import MedicalForm from "../pages/admissionForm/medical.-form"
import BackgroundCheckForm from "../pages/admissionForm/background-check";
import ExtracurricularForm from "../pages/admissionForm/extracurriculars";
import ParentsGuardianForm from "../pages/admissionForm/parents-guardian";
import SupportingDocumentForm from "../pages/admissionForm/supportingdocumentform";
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/aboutUs" element={<AboutUs/>}/>
                <Route path="/howItWorks" element={<HowItWorks/>}/>
                <Route path="/schools" element={<AllSchools/>}/>
                <Route path="/contactUs" element={<ContactUs/>}/>
                <Route path="/faqs" element={<FAQ/>}/>
                <Route path="/terms" element={<TermsOfUse/>}/>
                <Route path="/privacyPolicy" element={<PrivacyPolicy/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/signIn" element={<SignIn/>}/>
                <Route path="/verifyPhone/:phone" element={<VerifyPhone/>}/>
                <Route path="/school/:id" element={<SchoolDetails/>}/>
                <Route path="/cart" element={<ApplicationCart/>}/>
                <Route path="/userProfile" element={<UserProfile/>}/>
                <Route path="/userProfile/MedicalForm" element={<MedicalForm/>}/>
                <Route path="/userProfile/ExtracurricularForm" element={<ExtracurricularForm/>}/>
                <Route path="/userProfile/BackgroundCheckForm" element={<BackgroundCheckForm/>}/>
                <Route path="/userProfile/ParentsGuardianForm" element={<ParentsGuardianForm/>}/>
                <Route path="/userProfile/SupportingDocumentForm" element={<SupportingDocumentForm/>}/>
                <Route path="/userProfile/studentDetails" element={<SchoolAdmission/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;