import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from '../common/Breadcrumbs';
import Layout from "../common/layout";
import LeftMenuBar from "../common/LeftMenuBar";
import NoRecordsFound from "../common/NoRecordsFound";
import AppliedSchools from "../components/userProfile/AppliedSchools";
import { getChildsList } from '../redux/actions/childAction';
import RestEndPoint from "../redux/constants/RestEndpoints";
import PageContent from "../resources/pageContent";
import { isLoggedIn } from '../utils/helper';
import RESTClient from "../utils/RestClient";

const UserProfile = () => {
  const dispatch = useDispatch()
  const [selectedChild, setSelectedChild] = useState('')
  const [applications, setApplications] = useState([])
  const childs = useSelector((state) => state.childsData.childs)

  useEffect(() => { 
    if (isLoggedIn())
      dispatch(getChildsList());
  }, [dispatch]);

  useEffect(()=> {
    childs.length && handleChildSelection(childs[0].childId);
  }, [childs]);

  const handleChildSelection = async (childId) => {
    if(!childId)
      return
    setSelectedChild(childId)
    try {
      const response = await RESTClient.get(RestEndPoint.GET_APPLICATION_LIST + `/${childId}`)
      setApplications(response.data)
    } catch (error) {
      setApplications([])
    }
  }
  
  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner profile-page-wrap">
          <Col className='inner-page-content dashboard-page col'>
            <Row className='content-section profile-bc-section'>
              <Col className='bc-col'>
                <Breadcrumbs />
              </Col>
            </Row>
            <div className='content-section profile-content-main'>
              <Col className='left profile-sidebar'>
                
                <Accordion className="sidebar-collapsible" defaultActiveKey={['0']} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Main Categories</Accordion.Header>
                    <Accordion.Body>
                      <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                
              </Col>
              <Col className='profile-content right'>
                <div className='row-items header'>
                  <div className='col-item select-option left'>
                    <label>Select Child<span className='req'>*</span></label>
                    <Form.Group className='frm-cell'>
                      <Form.Select value={selectedChild} onChange={e=>handleChildSelection(e.target.value)}>
                        <option value=''>--Select Child--</option>
                        {
                          childs && childs.map((child, index) => {
                            return <option key={'applicationChild_'+index} value={child.childId}>{child.firstName} {(child.lastName ? ' ' + child.lastName : '')}</option>
                          })
                        }

                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className='col-item application-link right'>
                    <label>Your Application</label> <Link to=''>({applications.length})</Link>
                  </div>
                </div>
                {
                  applications.length > 0 ?
                  applications.map((application, index) => {
                            return <AppliedSchools key={"appliedSchools_" + index} application={application} setApplications={setApplications}/>
                          })
                : <NoRecordsFound message="No applications found for selected child."/>
                      }
              </Col>
            </div>
          </Col>
        </Container>
      </section>
    </Layout>
  )
}

export default UserProfile;