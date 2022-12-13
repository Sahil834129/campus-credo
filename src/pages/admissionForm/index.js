import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootStrapForm
} from 'react-bootstrap'
import Layout from '../../common/layout'
import Breadcrumbs from '../../common/Breadcrumbs'
import LeftMenuBar from '../../common/LeftMenuBar'
import PageContent from '../../resources/pageContent'
import 'react-datepicker/dist/react-datepicker.css'

import { useSelector } from 'react-redux'
import AddChildDialog from '../../dialogs/addChild'
import StudentDetails from './student-details'
import MedicalForm from './medicalForm'
import ExtracurricularForm from './extracurriculars'
import BackgroundCheckForm from './background-check'
import ParentsGuardianComponent from './parents-guardian'
import SupportingDocumentForm from './supportingdocumentform'

export const AdmissionForms = () => {
  const [currentStudent, setCurrentStudent] = useState({})
  const studentInitialValue = {
    childId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    className: '',
    dateOfBirth: '',
    isProvidingCurrentSchoolInfo: 'No',
    transportFacility: false,
    schoolName: '',
    schoolBoard: '',
    obtainedMarks: '',
    schoolAddressLine1: '',
    schoolAddressLine2: '',
    schoolCity: '',
    schoolState: '',
    schoolPincode: '',
    gender: '',
    category: '',
    identificationMarks: '',
    religion: '',
    nationality: '',
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    city: '',
    state: '',
    boardingFacility: false
  }
  const childsList = useSelector(state => state.childsData.childs)
  const [showAddChildDialog, setShowAddChildDialog] = useState(false)
  const [showStudentList, setShowStudentList] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  const [step, setStep] = useState(1)
  const [selectedChild, setSelectedChild] = useState(studentInitialValue)

  const handleChildSelection = childId => {
    const selectedChildObj = childsList.find(
      it => it.childId === parseInt(childId)
    )
    setCurrentStudent({ ...selectedChildObj })
    if (selectedChildObj) {
      let childobj = selectedChildObj
      let selectedChildCopy = JSON.parse(JSON.stringify(studentInitialValue))
      selectedChildCopy = {
        ...selectedChildCopy,
        ...childobj
      }

      setSelectedChild(selectedChildCopy)
    }
  }

  const getCurrentComponent = currentStep => {
    switch (currentStep) {
      case 1:
        setShowStudentList(true)
        setPageTitle('Student Details')
        break
      case 2:
        //setShowStudentList(false)
        setPageTitle('Medical Details')
        break
      case 3:
        //setShowStudentList(false)
        setPageTitle('Extracurriculars')
        break
      case 4:
        //setShowStudentList(false)
        setPageTitle('Background Check')
        break
      case 5:
        //setShowStudentList(false)
        setPageTitle('Parents/Guardian')
        break
      case 6:
        //setShowStudentList(false)
        setPageTitle('Supporting Documents')
        break
      default:
        break
    }
  }
  useEffect(() => {
    if (childsList.length > 0) {
      if (setSelectedChild) {
        setSelectedChild(val => {
          return { ...val, ...childsList[2] }
        })
        setCurrentStudent({ ...childsList[2] })
      }
    }
  }, [childsList])

  useEffect(() => {
    getCurrentComponent(step)
  }, [step])

  return (
    <Layout>
      <section className='content-area'>
        <Container className='content-area-inner pt-n16 admmission-sequence-wrap'>
          <Col className='inner-page-content'>
            <Row className='content-section'>
              <Breadcrumbs />
              {showStudentList && (
                <div className='page-container border-bottom d-flex justify-content-between pb-2 pt-2'>
                  <div className='row-wrapper '>
                    <span className='selectbox'>
                      <label>
                        Select Child <span className='req'>*</span>
                      </label>
                      <div className='frm-cell'>
                        <BootStrapForm.Group className='frm-cell'>
                          <BootStrapForm.Select
                            name='selectedChildId'
                            disabled={step>1}
                            onChange={e => {
                              handleChildSelection(e.target.value)
                            }}
                            value={selectedChild.childId}
                          >
                            {childsList.length &&
                              childsList.map((child, i) => {
                                return (
                                  <option
                                    key={'child_' + i}
                                    value={child.childId}
                                  >
                                    {child.firstName + ' ' + child.lastName}
                                  </option>
                                )
                              })}
                          </BootStrapForm.Select>
                        </BootStrapForm.Group>
                      </div>
                    </span>
                  </div>
                  {step === 1 ? <Button
                      className='add-child-btn'
                      onClick={() => setShowAddChildDialog(true)}
                    > 
                    Add Child
                  </Button>
                  : '' }
                </div>
              )}
              <div className='content-area-inner internal-page-wrapper'>
                <LeftMenuBar
                  menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS}
                  parentPage='userProfile'
                  step={step}
                />
                <div className='inner-page-content right'>
                  <div className='inner-page-right-container'>
                    <h6 className='student-heading'>{pageTitle}</h6>
                    <p className='Stud-info'>
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    {(() => {
                      switch (step) {
                        case 1:
                          return (
                            <StudentDetails
                              currentStudent={currentStudent}
                              selectedChild={selectedChild}
                              setSelectedChild={setSelectedChild}
                              setStep={setStep}
                            />
                          )
                        case 2:
                          return (
                            <MedicalForm
                              selectedChild={selectedChild}
                              setStep={setStep}
                            />
                          )
                        case 3:
                          return (
                            <ExtracurricularForm
                              selectedChild={selectedChild}
                              setSelectedChild={setSelectedChild}
                              setStep={setStep}
                            />
                          )
                        case 4:
                          return (
                            <BackgroundCheckForm
                              selectedChild={selectedChild}
                              setSelectedChild={setSelectedChild}
                              setStep={setStep}
                            />
                          )
                        case 5:
                          return (
                            <ParentsGuardianComponent
                              currentStudent={selectedChild}
                              setStep={setStep}
                            />
                          )
                        case 6:
                          return (
                            <SupportingDocumentForm
                              currentStudent={selectedChild}
                              setStep={setStep}
                            />
                          )
                        default:
                          break
                      }
                    })()}
                  </div>
                </div>
              </div>
            </Row>
          </Col>
          <AddChildDialog
            show={showAddChildDialog}
            handleClose={() => setShowAddChildDialog(false)}
          />
        </Container>
      </section>
    </Layout>
  )
}
export default AdmissionForms
