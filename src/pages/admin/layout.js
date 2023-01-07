import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FooterCampusLogo } from '../../assets/admin/img/footer-logo-campuscredso.svg';
import '../../assets/admin/scss/custom-styles.scss';

import Nav from 'react-bootstrap/Nav';

import Avatar from 'react-avatar';
import Navbar from 'react-bootstrap/Navbar';
import { ToastContainer } from "react-toastify";
import Breadcrumbs from "../../common/Breadcrumbs";
import { ADMIN_DASHBOARD_LINK } from '../../constants/app';
import { getLocalData, logout } from '../../utils/helper';

export const Layout = ({ admissionSummary, ...props }) => {
  const location = useLocation();
  const breadcrumbTitle = ADMIN_DASHBOARD_LINK.find(
    val => val.url === location.pathname
  );

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

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
              <Avatar name='Wim Mostmans' size='28' round={true} />
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
            {ADMIN_DASHBOARD_LINK.map(val => (
              <Nav.Link
                as={Link}
                key={`url${val.url}`}
                className={location.pathname === val.url ? 'active-page' : ''}
                to={val.url}
              >
                {val.title}
              </Nav.Link>
            ))}
          </Nav>
          <Button className='guide-btn'>Guide</Button>
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
                <ListGroup.Item className='application-status'>
                  <label className='lbl'>Application Status :: </label>
                  <div className='app-status-cell'>
                    <label className='lbl'>Accepted</label>{' '}
                    <span className='value text-success'>{admissionSummary?.accepted || 0} </span>{' | '}
                  </div>
                  <div className='app-status-cell'>
                    <label className='lbl'>Declined</label>{' '}
                    <span className='value text-danger'>{admissionSummary?.declined || 0}</span>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          )}
        </div>
        {props.children}
      </div>
      <div className='footer-panel'>
        <Link to='/dashboard'><FooterCampusLogo /></Link>
        <Link href=''>Terms &amp; Conditions</Link>
      </div>
      <ToastContainer autoClose={2000} position="top-right" />
    </Container>
  );
};
export default Layout;
