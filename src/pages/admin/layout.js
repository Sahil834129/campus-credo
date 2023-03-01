import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as FooterCampusLogo } from '../../assets/admin/img/footer-logo-campuscredso.svg';
import '../../assets/admin/scss/custom-styles.scss';

import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "../../common/Breadcrumbs";
import { ADMIN_DASHBOARD_LINK, MANAGE_USER_PERMISSION } from '../../constants/app';
import { getLocalData, getPresentableRoleName, logout } from '../../utils/helper';

export const Layout = ({ admissionSummary, ...props }) => {
  const navigate = useNavigate();
  const adminHeaderLink = useSelector(state => state?.userData?.modulePermissions);
  const [adminLink, setAdminLink] = useState([]);
  const location = useLocation();
  const breadcrumbTitle = ADMIN_DASHBOARD_LINK.find(
    val => val.url === location.pathname
  );

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setAdminLink(adminHeaderLink.filter(val => val?.isPermit !== MANAGE_USER_PERMISSION[1]));
    let pathname = window.location.pathname;
    const data = adminHeaderLink.find(val => val?.isPermit !== MANAGE_USER_PERMISSION[1] && val.url == pathname);
    if (!data && pathname !== "/termsAndConditions") {
      navigate("/dashboard")
    }
  }, [adminHeaderLink]);
  return (
    <Container className='main-container admin-contianer' fluid>
      <div className='top-navigation'>
        <div className='items-row'>
          <div className='item-col brand-logo'>
            <span className='subscriber-name subscriber-logo'>
              <Link to='/dashboard'>
                {getLocalData('schoolName')}
                {/* <CampusLogo /> */}
              </Link>
            </span>
          </div>
          <div className='item-col'>
            <div className='inner-cell profile-info'>
              {/* <Avatar name='Wim Mostmans' size='28' round={true} /> */}
              <span className='text-white'>{getPresentableRoleName(getLocalData("roles"))}</span>
            </div>
            <div
              className='inner-cell'
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
            >
              <i className='icons union-icon'></i>
            </div>
          </div>
        </div>
      </div>

      <Navbar className='mainmenu-wrap'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse>
          <Nav className='menu-items'>
            {adminLink.map(val => (
              <Nav.Link
                as={Link}
                key={`url${val.url}`}
                className={location.pathname === val.url ? 'active-page' : ''}
                to={val.url}
              >
                {val.title.replace("Manage Fee", "Manage Fees")}
              </Nav.Link>
            ))}
          </Nav>
          {/* <Button className='guide-btn'>Guide</Button> */}
        </Navbar.Collapse>
      </Navbar>
      <div className='content-area'>
        <div className='title-kpi-wrapper'>
          <Breadcrumbs />
          {/* <Breadcrumb className='bc-nav'>
            <Breadcrumb.Item href='#'>Admin</Breadcrumb.Item>
            <Breadcrumb.Item active>{breadcrumbTitle?.title}</Breadcrumb.Item>
          </Breadcrumb> */}
          {breadcrumbTitle?.showsData && (
            <div className='kpi-wrapper'>
              <ListGroup className='kpi-list-group'>
                <ListGroup.Item>
                  <label className='lbl'>Seats</label>{' '}
                  <span className='value'>{admissionSummary?.totalSeats || 0}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className='lbl'>Application Received</label>{' '}
                  <span className='value'>{admissionSummary?.totalApplication || 0}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className='lbl'>Under Review</label>{' '}
                  <span className='value'>{admissionSummary?.underReview || 0}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className='lbl'>AT/PI</label>{' '}
                  <span className='value'>{admissionSummary?.atPi || 0}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className='lbl'>Final Review</label>{' '}
                  <span className='value'>{admissionSummary?.underFinalReview || 0}</span>
                </ListGroup.Item>
                {/* <ListGroup.Item className='application-status'>
                  <div className='app-status-cell'>
                    <label className='lbl'>Approved  <span className='value text-success'>{admissionSummary?.approved || 0}</span></label>{' '}
                  
                  </div>
                  <div className='app-status-cell'>
                    <label className='lbl'>Declined <span className='value text-danger'>{admissionSummary?.declined || 0}</span></label>{' '}
                    
                  </div>
                  <div className='app-status-cell'>
                    <label className='lbl'>Accepted <span className='value text-success'>{admissionSummary?.accepted || 0} </span></label>{' '}
                  </div>
                  <div className='app-status-cell'>
                    <label className='lbl'>Denied <span className='value text-danger'>{admissionSummary?.denied || 0}</span></label>{' '}
                    
                  </div>
                  <div className='app-status-cell'>
                    <label className='lbl'>Revoked <span className='value text-danger'>{admissionSummary?.revoked || 0}</span></label>{' '}
                    
                  </div>
                </ListGroup.Item> */}
              </ListGroup>
            </div>
          )}
        </div>
        {breadcrumbTitle?.title==="Dashboard" || breadcrumbTitle?.title==="Manage Application" ?
        <div className='application-status status-block'>
            <div className='app-status-cell'>
              <label className='lbl'>Approved  <span className='value text-success'>{admissionSummary?.approved || 0}</span></label>{' '}
              {/* {' | '} */}
            </div>
            <div className='app-status-cell'>
              <label className='lbl'>Declined <span className='value text-danger'>{admissionSummary?.declined || 0}</span></label>{' '}
              {/* {' | '} */}
            </div>
            <div className='app-status-cell'>
              <label className='lbl'>Accepted <span className='value text-success'>{admissionSummary?.accepted || 0} </span></label>{' '}
            </div>
            <div className='app-status-cell'>
              <label className='lbl'>Denied <span className='value text-danger'>{admissionSummary?.denied || 0}</span></label>{' '}
              
            </div>
            <div className='app-status-cell'>
              <label className='lbl'>Revoked <span className='value text-danger'>{admissionSummary?.revoked || 0}</span></label>{' '}
            </div>
        </div>:""}
        {props.children}
      </div>
      <div className='footer-panel'>
        <Link to='/dashboard'><FooterCampusLogo /></Link>
        {breadcrumbTitle ? <Link to='/termsAndConditions'>Terms &amp; Conditions</Link> : ""}
        </div>
      <ToastContainer autoClose={2000} position="top-right" />
    </Container>
  );
};
export default Layout;
