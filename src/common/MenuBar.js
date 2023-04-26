import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageContent from "../resources/pageContent";
import { gotoHome } from "../utils/helper";

const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = "/" + location.pathname.split("/")[1];

  return (
    <Navbar collapseOnSelect expand="lg" className="top-navigation main-site">
      <Container>
        <Nav className="siteNav me-auto">
          {PageContent.HEADER_MENU_ITEMS.map((menuItem, index) => (
            <Fragment key={"menuItem_" + index}>
              <Navbar.Text>
                <Link
                  className={menuItem.ref === pageRef ? "active-page" : ""}
                  to={menuItem.ref}
                  onClick={(e) =>
                    menuItem.ref === "/" ? gotoHome(e, navigate) : ""
                  }
                >
                  {menuItem.title}
                </Link>
              </Navbar.Text>
              {index < PageContent.HEADER_MENU_ITEMS.length - 1 ? (
                <Navbar.Text className="dot-wrap">
                  <i className="icons divide-dot"></i>
                </Navbar.Text>
              ) : (
                ""
              )}
            </Fragment>
          ))}
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="contact-info justify-content-end">
          {/* <Navbar.Text className="social-links">
            {PageContent.SOCIAL_MEDIA_LIST.map((sm, index) => (
              <Fragment key={"social_" + index}>
                <Nav.Link href={sm.ref}>
                  <i className={"icons " + sm.icon}></i>
                </Nav.Link>
              </Fragment>
            ))}
          </Navbar.Text>
          <Navbar.Text className="dot-wrap">
            <i className="icons divide-dot"></i>
          </Navbar.Text> */}
          <Navbar.Text>
            <a href="#!">
              <i className="icons phone-icon"></i> {PageContent.PHONE}
            </a>
          </Navbar.Text>
          <Navbar.Text className="dot-wrap">
            <i className="icons divide-dot"></i>
          </Navbar.Text>
          <Navbar.Text>
            <a
              style={{cursor: 'pointer'}}
              onClick={(e) => {
                (window.location = "mailto:support@campuscredo.com")
                e.stopPropagation();
              }}
            >
              <i className="icons email-icon"></i> {PageContent.ENQUIRY_EMAIL}
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default MenuBar;