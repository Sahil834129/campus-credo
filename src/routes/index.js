import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import {HomePage, AboutUs, HowItWorks, AllSchools, ContactUs, FAQ, TermsOfUse, PrivacyPolicy, SignUp, SignIn, VerifyPhone, SchoolDetails, ApplicationCart, UserProfile} from "../pages";

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
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;