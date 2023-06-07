import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ReactComponent as FooterCampusLogo } from "../../assets/admin/img/footer-logo-campuscredso.svg";
import "../../assets/admin/scss/custom-styles.scss";
import ChangePasswordIcon from "../../assets/img/icons/change-passsword.svg";
import LogoutIcon from "../../assets/img/icons/logout.svg";
import Breadcrumbs from "../../common/Breadcrumbs";
import {
  ADMIN_DASHBOARD_LINK,
  MANAGE_USER_PERMISSION,
  SUPER_ADMIN_LINK,
} from "../../constants/app";
import {
  getLocalData,
  getPresentableRoleName,
  logout,
  setLocalData,
} from "../../utils/helper";
import ResetUserPassword from "./resetUserPassword";

export const Layout = ({
  admissionSummary,
  sessionValue,
  setSessionValue,
  ...props
}) => {
  const navigate = useNavigate();
  const adminHeaderLink = useSelector(
    (state) => state?.userData?.modulePermissions
  );
  const sessionOption = (getLocalData("admissionSession") || "").split(",");
  const [adminLink, setAdminLink] = useState([]);
  const [changeAdminPassword, setChangeAdminPassword] = useState(false);
  const location = useLocation();
  const breadcrumbTitle = ADMIN_DASHBOARD_LINK.find(
    (val) => val.url === location.pathname
  );

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (getLocalData('roles') === 'SUPER_ADMIN') {
      setAdminLink(SUPER_ADMIN_LINK);
    } else
      setAdminLink(
        adminHeaderLink.filter(
          (val) => val?.isPermit !== MANAGE_USER_PERMISSION[1]
        )
      );
    let pathname = window.location.pathname;
    const data = (getLocalData('roles') === 'SUPER_ADMIN') ? true : adminHeaderLink.find(
      (val) =>
        val?.isPermit !== MANAGE_USER_PERMISSION[1] && val.url === pathname
    );
    if (!data && pathname !== "/termsAndConditions" && pathname !== "/all-application") {
      navigate("/dashboard");
    }
  }, [adminHeaderLink]);

  useEffect(() => {
    setLocalData("sessionValue", sessionValue);
    if (sessionOption.length > 0 && sessionValue === "") {
      setSessionValue(sessionOption[0]);
    }
  }, [sessionOption]);
  const changePassword = () => {
    setChangeAdminPassword(true);
  };
  const closeChangePasswordDialog = () => {
    setChangeAdminPassword(false);
  };
  return (
    <Container className="main-container admin-contianer" fluid>
      <div className="top-navigation">
        <div className="items-row">
          <div className="item-col brand-logo">
            <span className="subscriber-name subscriber-logo">
              {getLocalData("schoolName") !== 'undefined' ? <Link to="/dashboard">
                {getLocalData("schoolName")}
                {/* <CampusLogo /> */}
              </Link> : <Link>Campus Credo Super Admin </Link>}
            </span>
          </div>
          <div className="item-col">
            <div className="inner-cell profile-info">
              {/* <Avatar name='Wim Mostmans' size='28' round={true} /> */}
              <span className="text-white">
                {getPresentableRoleName(getLocalData("roles"))}
              </span>
            </div>

            <div
              className="inner-cell"
              style={{ cursor: "pointer" }}
              onClick={changePassword}
            >
              {/* <i className="icons union-icon"></i> */}
              <img src={ChangePasswordIcon} alt="Change Password" title="Change Password" />
            </div>
            <div
              className="inner-cell"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              {/* <i className="icons union-icon"></i> */}
              <img src={LogoutIcon} alt="Logout" title="Logout" />{" "}
            </div>
          </div>
        </div>
      </div>

      <Navbar className="mainmenu-wrap">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="menu-items">
            {adminLink.map((val) => (
              <Nav.Link
                as={Link}
                key={`url${val.url}`}
                className={location.pathname === val.url ? "active-page" : ""}
                to={val.url}
              >
                {val.title.replace("Manage Fee", "Manage Fees")}
              </Nav.Link>
            ))}
          </Nav>
          {setSessionValue && (
            <div className="d-flex">
              <label>Admission Year</label>
              <Form.Select
                value={sessionValue}
                onChange={(e) => {
                  setSessionValue(e.target.value);
                }}
                size="sm"
              >
                {sessionOption.map((val, index) => (
                  <option value={val} key={`select${index}`}>
                    {val}
                  </option>
                ))}
              </Form.Select>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div className="content-area user-supAdmin">
        <div className="title-kpi-wrapper">
          <Breadcrumbs />
          {/* <Breadcrumb className='bc-nav'>
            <Breadcrumb.Item href='#'>Admin</Breadcrumb.Item>
            <Breadcrumb.Item active>{breadcrumbTitle?.title}</Breadcrumb.Item>
          </Breadcrumb> */}
          {breadcrumbTitle?.showsData && (
            <div className="kpi-wrapper">
              <ListGroup className="kpi-list-group">
                <ListGroup.Item>
                  <label className="lbl">Seats</label>{" "}
                  <span className="value">
                    {admissionSummary?.totalSeats || 0}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className="lbl">Application Received</label>{" "}
                  <span className="value">
                    {admissionSummary?.totalApplication || 0}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className="lbl">Under Review</label>{" "}
                  <span className="value">
                    {admissionSummary?.underReview || 0}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className="lbl">AT/PI</label>{" "}
                  <span className="value">{admissionSummary?.atPi || 0}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <label className="lbl">Final Review</label>{" "}
                  <span className="value">
                    {admissionSummary?.underFinalReview || 0}
                  </span>
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
        {breadcrumbTitle?.title === "Dashboard" ||
          breadcrumbTitle?.title === "Manage Application" ? (
          <div className="application-status status-block">
            <div className="app-status-cell">
              <label className="lbl">
                Approved{" "}
                <span className="value text-success">
                  {admissionSummary?.totalApproved || 0}
                </span>
              </label>{" "}
            </div>
            <div className="app-status-cell">
              <label className="lbl">
                Accepted{" "}
                <span className="value text-success">
                  {admissionSummary?.accepted || 0}{" "}
                </span>
              </label>{" "}
            </div>
            <div className="app-status-cell">
              <label className="lbl">
                Application Declined{" "}
                <span className="value text-danger">
                  {admissionSummary?.declined || 0}
                </span>
              </label>{" "}
            </div>
            <div className="app-status-cell">
              <label className="lbl">
                Revoked{" "}
                <span className="value text-danger">
                  {admissionSummary?.revoked || 0}
                </span>
              </label>{" "}
            </div>
          </div>
        ) : (
          ""
        )}
        {props.children}
      </div>
      <div className="footer-panel">
        <Link to="/dashboard">
          <FooterCampusLogo />
        </Link>
        {breadcrumbTitle ? (
          <Link to="/termsAndConditions">Terms &amp; Conditions</Link>
        ) : (
          ""
        )}
      </div>
      <ToastContainer autoClose={2000} position="top-right" />
      <ResetUserPassword
        show={changeAdminPassword}
        handleClose={closeChangePasswordDialog}
      />
    </Container>
  );
};
export default Layout;
