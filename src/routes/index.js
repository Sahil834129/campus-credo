import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FiveTipsForChoosingTheBestSchoolForYourChildin2023 from "../common/Blog/5-tips-for-choosing-the-best-school-for-your-child-in-2023";
import Blog from "../common/Blog/blog";
import BlogArticle from "../common/Blog/blog-article";
import { DEFAULT_ROLES } from "../constants/app";
import {
  AboutUs,
  AdminDashboard,
  AllSchools,
  ApplicationCart,
  ContactUs,
  FAQ,
  HomePage,
  HowItWorks,
  ManageAdmission,
  ManageApplication,
  ManageChild,
  ManageFees,
  ManageProfile,
  ManageUsers,
  NotFound,
  OrderConfirm,
  PaymentCheckout,
  PaymentFailed,
  PaymentHistory,
  PrivacyPolicy,
  SchoolAdmission,
  SchoolDetails,
  SignIn,
  SignUp,
  TermsOfUse,
  UserProfile,
  VerifyPhone,
} from "../pages";
import PrintSchedule from "../pages/admin/manageAdmission/printSchedule";
import TermsAndConditions from "../pages/admin/termsAndConditions";
import DisclaimerPolicy from "../pages/disclaimer_Policy";
import RefundPolicy from "../pages/refundPolicy";
import ResetPassword from "../pages/resetPassword";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/howItWorks" element={<HowItWorks />} />
        <Route path="/schools" element={<AllSchools />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogArticle" element={<BlogArticle />} />
        <Route path="/5tipsForChoosingTheBestSchoolForYourChildin2023" element={<FiveTipsForChoosingTheBestSchoolForYourChildin2023 />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/termsOfService" element={<TermsOfUse />} />
        <Route path="/disclaimerPolicy" element={<DisclaimerPolicy />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/refundPolicy" element={<RefundPolicy />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/user/reset/:token" element={<ResetPassword />} />
        <Route path="/verifyPhone/:phone" element={<VerifyPhone />} />
        <Route path="/schools/:id" element={<SchoolDetails />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/orderConfirm" element={<OrderConfirm />} />
        <Route path="/paymentFailed" element={<PaymentFailed />} />
        <Route element={<ProtectedRoute roles={[DEFAULT_ROLES.PARENT]} />}>
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/manageProfile" element={<ManageProfile />} />
          <Route path="/manageChild" element={<ManageChild />} />
          <Route path="/selectedSchools" element={<ApplicationCart />} />
          <Route path="/paymentCheckout" element={<PaymentCheckout />} />
          <Route path="/paymentHistory" element={<PaymentHistory />} />
          <Route path="/admissionForm" element={<SchoolAdmission />} />
        </Route>
        <Route
          element={
            <ProtectedRoute
              roles={[
                DEFAULT_ROLES.SCHOOL_ADMIN,
                DEFAULT_ROLES.ADMISSION_MANAGER,
                DEFAULT_ROLES.PRINCIPAL,
                DEFAULT_ROLES.SR_ADMISSION_MANAGER,
                DEFAULT_ROLES.FEE_MANAGER,
                DEFAULT_ROLES.SR_FEE_MANAGER,
              ]}
            />
          }
        >
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-admission" element={<ManageAdmission />} />
          <Route path="/manage-fees" element={<ManageFees />} />
          <Route path="/manage-user" element={<ManageUsers />} />
          <Route path="/manage-application" element={<ManageApplication />} />
          <Route path="/termsAndConditions" element={<TermsAndConditions />} />
          <Route
            path="/print-manage-admission/:session"
            element={<PrintSchedule />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
