import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { DEFAULT_ROLES } from '../constants/app'
import {
  HomePage,
  AboutUs,
  HowItWorks,
  AllSchools,
  ContactUs,
  FAQ,
  TermsOfUse,
  PrivacyPolicy,
  SignUp,
  SignIn,
  VerifyPhone,
  SchoolDetails,
  ApplicationCart,
  UserProfile,
  SchoolAdmission,
  AdminDashboard,
  ManageAdmission,
  ManageFees,
  ManageUsers,
  ManageApplication,
  ManageProfile,
  NotFound
} from '../pages'
import ResetPassword from '../pages/resetPassword'

import ProtectedRoute from './ProtectedRoute'

function AppRoutes () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<></>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/howItWorks' element={<HowItWorks />} />
        <Route path='/schools' element={<AllSchools />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/faqs' element={<FAQ />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/user/reset/:token' element={<ResetPassword />} />
        <Route path='/verifyPhone/:phone' element={<VerifyPhone />} />
        <Route path='/schools/:id' element={<SchoolDetails />} />
        <Route path='/cart' element={<ApplicationCart />} />
        <Route path='/notFound' element={<NotFound />} />
      </Routes>
      <Routes>
        <Route element={<ProtectedRoute roles={[DEFAULT_ROLES.PARENT]} />}>
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/manageProfile' element={<ManageProfile />} />
          <Route
            path='/userProfile/studentDetails'
            element={<SchoolAdmission />}
          />
        </Route>
        <Route
          element={<ProtectedRoute roles={[DEFAULT_ROLES.SCHOOL_ADMIN]} />}
        >
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={[DEFAULT_ROLES.SCHOOL_ADMIN]} />}
        >
          <Route path='/manage-admission' element={<ManageAdmission />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={[DEFAULT_ROLES.SCHOOL_ADMIN]} />}
        >
          <Route path='/manage-fees' element={<ManageFees />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={[DEFAULT_ROLES.SCHOOL_ADMIN]} />}
        >
          <Route path='/manage-users' element={<ManageUsers />} />
        </Route>
        <Route
          element={<ProtectedRoute roles={[DEFAULT_ROLES.SCHOOL_ADMIN]} />}
        >
          <Route path='/manage-application' element={<ManageApplication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
