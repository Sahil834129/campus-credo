import React, {useState, useEffect} from "react";
import Breadcrumbs from '../common/Breadcrumbs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Layout from "../common/layout";
import AppliedSchools from "../components/userProfile/AppliedSchools";
import LeftMenuBar from "../common/LeftMenuBar";
import PageContent from "../resources/pageContent";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import { useSelector, useDispatch } from "react-redux";
import { getChildsList } from '../redux/actions/childAction';
import { isLoggedIn } from '../utils/helper';
import NoRecordsFound from "../common/NoRecordsFound";

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
          <Col className='inner-page-content '>
            <Row className='content-section profile-bc-section'>
              <Col className='bc-col'>
                <Breadcrumbs />
              </Col>
            </Row>
            <Row className='content-section profile-content-main'>
              <Col className='left sidebar profile-sidebar'>
                <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
              </Col>
              <Col className='profile-content right'>
                <div className='row-items header'>
                  <div className='col-item select-option left'>
                    <label>Select Child<span className='req'>*</span></label>
                    <Form.Group className='frm-cell'>
                      <Form.Select value={selectedChild} onChange={e=>handleChildSelection(e.target.value)}>
                        <option>--Select Child--</option>
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
                    	return <AppliedSchools key={"appliedSchools_" + index} application={application} />
                  	})
					: <NoRecordsFound message="No applications found for select child."/>
                }
              </Col>
            </Row>
          </Col>
        </Container>
      </section>
    </Layout>
  )
}

export default UserProfile;