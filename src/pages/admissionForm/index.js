import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Layout from '../../common/layout'
import Breadcrumbs from '../../common/Breadcrumbs'
import LeftMenuBar from '../../common/LeftMenuBar'
import PageContent from '../../resources/pageContent'
import 'react-datepicker/dist/react-datepicker.css'
import { useSelector } from 'react-redux'
import BootStrapForm from 'react-bootstrap/Form'

export const AdmissionForms = ({
  showStudentList,
  pageTitle,
  selectedChild,
  setSelectedChild,
  ...props
}) => {
  const childsList = useSelector(state => state.childsData.childs)
  const handleChildSelection = childId => {
    const selectedChildObj = childsList.find(
      it => it.childId === parseInt(childId)
    )
    if (selectedChildObj) {
      let childobj = selectedChildObj
      let selectedChildCopy = JSON.parse(JSON.stringify(selectedChild))
      selectedChildCopy.childId = childId
      selectedChildCopy.firstName = childobj.firstName
      selectedChildCopy.middleName = childobj.middleName
      selectedChildCopy.lastName = childobj.lastName
      selectedChildCopy.dateOfBirth = childobj.dateOfBirth
      setSelectedChild(selectedChildCopy)
    }
  }

  useEffect(() => {
    if (setSelectedChild) setSelectedChild({ ...childsList[0] })
  }, [childsList])

  return (
    <Layout>
      <section className='content-area'>
        <Container className='content-area-inner pt-n16 admmission-sequence-wrap'>
          <Col className='inner-page-content'>
            <Row className='content-section'>
              <Breadcrumbs />
              {showStudentList && (
                <div className='page-container border-bottom'>
                  <div className='row-wrapper '>
                    <span className='selectbox'>
                      <label>
                        Select Child <span className='req'>*</span>
                      </label>
                      <div className='frm-cell'>
                        <BootStrapForm.Group className='frm-cell'>
                          <BootStrapForm.Select
                            name='selectedChildId'
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
                </div>
              )}
              <div className='content-area-inner internal-page-wrapper'>
                <LeftMenuBar
                  menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS}
                  parentPage='userProfile'
                />
                <div className='inner-page-content right'>
                  <div className='inner-page-right-container'>
                    <h6 className='student-heading'>{pageTitle}</h6>
                    <p className='Stud-info'>
                      Please provide accurate details of the student applying
                      for admission. This information is used to help the school
                      best cater for the educational needs of the student.
                    </p>
                    {props.children}
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Container>
      </section>
    </Layout>
  )
}
export default AdmissionForms
