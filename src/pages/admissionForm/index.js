import React, { useState } from 'react';
import "../../assets/scss/custom-styles.scss";
import Container from "react-bootstrap/Container";
import logoHeader from "../../assets/img/brand-logo-header.png";
import FooterGraphic from "../../assets/img/footer-graphic.png";
import CartIcon from "../../assets/img/icons/cart-icon.png";
import { ReactComponent as SignupGraphic } from "../../assets/img/singup-graphic1.svg";
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import { FormGroup } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
    
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );
  const popover = (
    <Popover id="popover-cart-list" className='popover cart-list-popover'>
      <Popover.Header className=''>
        <div className='left selected-school'>
          <h2>Selected Schools</h2>
          <label className='child-name-lbl'>View Child Details</label>
        </div>
        <div className='right view-link'><Link>View All</Link></div>
      </Popover.Header>
      <Popover.Body>
        <div className='cart-items-list'>
          <div className='cart-item'>
              <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
              <div className='info-item item-details'>
                  <h2>Maxfort School Cambridge</h2>
                  <h4>Rohini, North West Delhi</h4>
                  <div className='price'>₹125</div>
              </div>
              <div className='info-item delete-cart-item'>
                  <Link href=''>
                    <i className='icons cross-icon'></i>
                  </Link>
                </div>  
              
          </div>
          <div className='cart-item'>
              <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
              <div className='info-item'>
                <h2>Maxfort School Cambridge</h2>
                <h4>Rohini, North West Delhi</h4>
                <div className='price'>₹125</div>
              </div>
              <div className='info-item delete-cart-item'>
                  <Link href=''>
                    <i className='icons cross-icon'></i>
                  </Link>
                </div>  
          </div>
        </div>
        <div className='item-qprice'>
          <div className='col quantity'>Subtotal <span className='item-num'>(2 Items)</span> </div>
          <div className='col price'>₹150.00</div>
        </div>

        <div className='admission-button'>
          <Button className='proceed' href="/school-admission">Proceed For Admission</Button>
        </div>
        <div className='disc-info-block'>
          <div className="disc-item">Enjoy Discount with code <span className='disc-code'>MYFIRSTADMISSION</span></div>
        </div>
      </Popover.Body>

    </Popover>
  );

export const SchoolAdmission = (SchoolAdmission) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);

  const history = useNavigate();
    return(
      <Container className="main-container" fluid>
      <header className="header">
        <Navbar collapseOnSelect expand="lg" className="top-navigation">
          <Container>
            <Nav className="siteNav me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Nav.Link href="#features">About Us</Nav.Link>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Nav.Link href="#pricing">How It Works</Nav.Link>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Nav.Link className="active-page" href="">
                All Schools
              </Nav.Link>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Nav.Link href="">FAQ's</Nav.Link>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Nav.Link href="">Contct Us</Nav.Link>
            </Nav>
            <Navbar.Toggle />
            <Navbar.Collapse className="contact-info justify-content-end">
              <Navbar.Text className="social-links">
                <Nav.Link href="#">
                  <i className="icons fb-icon"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="icons twitter-icon"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="icons insta-icon"></i>
                </Nav.Link>
                <Nav.Link href="#">
                  <i className="icons g-icon"></i>
                </Nav.Link>
              </Navbar.Text>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Navbar.Text>
                <Link href="">
                  <i className="icons phone-icon"></i> 080-4150 5473
                </Link>
              </Navbar.Text>
              <Navbar.Text className="dot-wrap">
                <i className="icons divide-dot"></i>
              </Navbar.Text>
              <Navbar.Text>
                <a href="">
                  <i className="icons email-icon"></i> enquiry@edusmart.com
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Col className="navbar-header">
          <Container className="header-container">
          <div className="header-item brand-logo"><Link to='/home-page'><img src={logoHeader} alt="brand logo" /></Link></div>
            <div className="header-item search-region-pane">
              <div className="region-dropdown-wrap">
                <i className="loc-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                  </svg>
                </i>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    Custom toggle
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1">Red</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                      Orange
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="search-wrapper">
                <Form inline className="srch-form-wrap">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search-field"
                  />
                  <Button className="search-btn">
                    <svg width="15px" height="15px">
                      <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
                    </svg>
                  </Button>
                </Form>
              </div>
            </div>
            <div className="header-item cart-profile-wrap">
              <div className="cart-num-comp">
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={popover}
                >
                  <Button variant="success">
                    <span className="cart-img">
                      <img src={CartIcon} alt="Cart" />
                    </span>
                    <span className="num-badge">9</span>
                  </Button>
                </OverlayTrigger>
              </div>

              <div className="user-profile">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-user-profile">
                    Hi <span className="user-name">Andrew B!</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1">User Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Students</Dropdown.Item>
                    <Dropdown.Item eventKey="3" active>
                      Orange
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </Col>
      </header>
      <section className="content-area">
        <Container className="content-area-inner pt-n16 admmission-sequence-wrap">
          <Col className="inner-page-content">
            <Row className="content-section">
              <Breadcrumb className="bc-main-wrap border-bottom">
                <Breadcrumb.Item to="/home-page">Home</Breadcrumb.Item>
                <Breadcrumb.Item to="/home-page">Admission</Breadcrumb.Item>
                <Breadcrumb.Item to="" active>
                  Admission Form
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="page-container border-bottom">
                <div className="row-wrapper ">
                  <span className="selectbox">
                    
                    <label>
                      Select Child <span className="req">*</span>
                    </label>
                    <div className="frm-cell">
                    <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                        <option>--Select Child--</option>
                        <option value="1">Child-one</option>
                        <option value="2">Child-two</option>
                        <option value="3">Child-three</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                  </span>
                  <Button variant="primary" onClick={() => history('/')}>Add Child</Button>
                  <span className="selectbox">
                    <label>Class<span className="req">*</span></label>
                    
                    <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                        <option>--Select Class--</option>
                        <option value="1">STD - 1</option>
                        <option value="2">STD - 2</option>
                        <option value="3">STD - 1</option>
                        </Form.Select>
                    </Form.Group>
                    
                  </span>
                  <span className="selectbox">
                    <label>
                      Session<span className="req">*</span>
                    </label>
                    <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                        <option>--Select Session--</option>
                        <option value="1">Open for 2022 - 2023</option>
                        <option value="2">Open for 2022 - 2023</option>
                        <option value="3">Open for 2022 - 2023</option>
                        </Form.Select>
                    </Form.Group>
                  </span>
                </div>
              </div>
              <div className="content-area-inner internal-page-wrapper">
              <div className="inner-page-content left sidebar">
                <Nav defaultActiveKey="/home" className="sideNav-indicator">
                    <Nav.Link href="/home" disabled><div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Student Details</div></Nav.Link>
                    <Nav.Link eventKey="link-1" disabled>
                    <div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Medical Details</div>
                    </Nav.Link>
                    <Nav.Link eventKey="link-2" disabled>
                    <div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Extracurriculars</div>
                    </Nav.Link>
                    <Nav.Link eventKey="link-3" disabled>
                    <div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Background Check</div>
                    </Nav.Link>
                    <Nav.Link eventKey="link-4" disabled>
                      <div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Parents/Guardian</div>
                    </Nav.Link>
                    <Nav.Link eventKey="link-5" disabled>
                      <div className='indicator'><span className='indiShape circle'></span></div> <div className='lbl'>Supporting Documents</div>
                    </Nav.Link>
                  </Nav>
              
                </div>
                <div className="inner-page-content right">
                  <div className="inner-page-right-container">
                    <h6 className="student-heading">Student Details</h6>
                    <p className="Stud-info">
                      Please provide accurate details of the student applying for admission. This information is used to help the school best cater for the educational needs of the student.
                    </p>
                    <form className="row g-3">
                      <div className="col-md-6">
                        <label for="validationServer01" className="form-label">
                          First name <span className="req">*</span>
                        </label>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="Enter text here" />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <label for="validationServer02" className="form-label">
                          Middle name
                        </label>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="Enter text here" />
                        </Form.Group>
                      
                      </div>
                      <div className="col-md-6">
                        <label for="validationServer01" className="form-label">
                          Last name <span className="req">*</span>
                        </label>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" placeholder="Enter text here" />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <label for="validationServer02" className="form-label">
                          Date of Birth <span className="req">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="birthday" name="birthday"
                          value=""
                          placeholder="DD-MM-YYYY"
                          required
                        />
                      </div>
                      <div className="col-md-2">
                        <label for="validationServer02" className="form-label">
                          Select Gerder <span className="req">*</span>
                        </label>
                        <div className="d-flex justify-content-evenly align-items-center py-2">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                        <label className="form-check-label" for="gridRadios1">Boy </label>
                         </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                         <label className="form-check-label" for="gridRadios2">  Girl </label>
                        </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                      <label for="exampleFormControlTextarea1" className="form-label">Identification Marks (Please specify)</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                      </div>
                      <div className="col-md-6">
                      <div>
                        <label for="Religion" className="form-label">
                        Religion <span className="req">*</span>
                        </label>
                        <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                        <option>--Select Child--</option>
                        <option value="1">Hindu</option>
                        <option value="2">Muslim</option>
                        </Form.Select>
                          </Form.Group>
                      </div>
                      <div>
                        <label for="Nationality" className="form-label">
                        Nationality <span className="req">*</span>
                        </label>
                        <Form.Group className='frm-cell'>
                        <Form.Select aria-label="Default select example">
                        <option>--Select Child--</option>
                        <option value="1">Indian</option>
                        </Form.Select>
                          </Form.Group>
                      </div>
                      </div>
                      <div className="col-12 border-bottom pb-2">
                        <label className=" me-2">Please Provide Your Current School Information(If Applicabple)</label>
                      <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                       <label className="form-check-label" for="inlineRadio1">Yes</label>
                      </div>
                        <div className="form-check form-check-inline">
                       <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                        <label className="form-check-label" for="inlineRadio2">No</label>
                       </div>
                      </div>
                      <p className="Addresss_info">Please Provide your Address details <span>(Add Your complete address for easy communication)</span></p>
                      <div className="tab_btn border-bottom">
                      <ul className="nav nav-tabs my-3">
                       <li className="nav-item"><a href="#paperback" className="nav-link active" data-bs-toggle="tab">Residential</a></li>
                       <li className="nav-item"><a href="#ebook" className="nav-link" data-bs-toggle="tab">Correspondence</a></li>
                       </ul>
                       <div className="tab-content">
                      <div className="tab-pane active" id="paperback">
                      <form className="row g-3">
                      <div className="col-md-6">
                      <label for="House No" className="form-label">House No., Block No.</label>
                      <input type="text" className="form-control" id="validationCustom01" value="" placeholder="Enter text here"/>
                       </div>
                      <div className="col-md-6">
                      <label for="Area" className="form-label">Area or Locality</label>
                      <input type="text" className="form-control" id="validationCustom02" value="" placeholder="Enter text here"/>
                        </div>   
                        <div className="col-md-6">
                      <label for="Pincode" className="form-label">Pincode</label>
                      <input type="text" className="form-control" id="validationCustom01" value="" placeholder="Enter text here"/>
                       </div>
                      <div className="col-md-6">
                      <label for="City" className="form-label">City</label>
                      <input type="text" className="form-control" id="validationCustom02" value="" placeholder="Enter text here"/>
                        </div>
                        <div className="col-md-6">
                      <label for="State" className="form-label">State</label>
                      <input type="text" className="form-control" id="validationCustom01" value="" placeholder="Enter text here"/>
                       </div>
                      <div className="col-md-6">
                      <label for="Country" className="form-label">Country</label>
                      <input type="text" className="form-control" id="validationCustom02" value="" placeholder="Enter text here"/>
                        </div> 
                        <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="invalidCheck3"
                            aria-describedby="invalidCheck3Feedback"
                            required
                          />
                          <label className="form-check-label" for="invalidCheck3">
                          Correspondence Address is same as Residential Address?
                          </label>
                        </div>
                      </div>
                        </form>                 
                      </div>
                      <div className="tab-pane" id="ebook">
                      <h1>hello shiv</h1>
                      </div>
                       </div>
                       </div>
                       <div className="col-md-6">
                        <label for="validationServer02" className="form-label">
                        Does the student require Transport facility? <span className="req">*</span>
                        </label>
                        <div className="d-flex  align-items-center py-2">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                        <label className="form-check-label" for="gridRadios1">Yes </label>
                         </div>
                        <div className="form-check ms-2">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                         <label className="form-check-label" for="gridRadios2">No</label>
                        </div>
                          </div>
                      </div>
                      <div className="col-md-6">
                        <label for="validationServer02" className="form-label">
                        Does the student require Boarding facility? <span className="req">*</span>
                        </label>
                        <div className="d-flex  align-items-center py-2">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
                        <label className="form-check-label" for="gridRadios1">Yes</label>
                         </div>
                        <div className="form-check ms-2">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                         <label className="form-check-label" for="gridRadios2">No</label>
                        </div>
                          </div>
                      </div>
                      <div className="border-top"></div>
                      <Form.Group className="mb-3 button-wrap">
                          <Button variant="primary" className='cancel comn' onClick={() => history('/cart-items')}>Cancel</Button>
                          <Button variant="primary" className='save comn' onClick={() => history('/medicalform')}>Save &amp; Next</Button>
                      </Form.Group>
                   
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </Col>
        </Container>
      </section>
      <footer className="footer-main">
        <Container className="finner">
          <div className="fcol">
            <img src={FooterGraphic} alt="" />
          </div>
          <div className="fcol">
            <h2>Quick Links</h2>
            <ListGroup as="ul">
              <ListGroup.Item as="li">
                <Link href="">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">About Us</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">Schools</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">How it works</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">FAQ's</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="fcol">
            <h2>Contact Us @</h2>
            <ListGroup as="ul">
              <ListGroup.Item as="li">T: +44 (0) 1856 888 666</ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">E: info@edusmart.com</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">F: Follow us on Facebook</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">T: Follow us on Twitter</Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link href="">L: Follow us on Linkedin</Link>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="fcol btn-container">
            <Button className="faq-btn">
              <i className="icons questionmark-icon"></i> Frequesntly Asked
              Questions
            </Button>
            <Button className="contact-btn">
              <i className="icons contactloc-icon"></i>Contact Us
            </Button>
          </div>
        </Container>
        <Container className="copyright-row">
          <div className="copyright-col">
            &copy; 2022 EduSmart. | All rights reserved.
          </div>
          <div className="copyright-col">
            <Link>Terms of use</Link> <Link>Privacy policy</Link>
          </div>
        </Container>
      </footer>

      <Modal
        dialogClassName="signin-model add-child-model"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body dialogClassName="model-body">
          <div className="model-body-col">
            <h2>Add Child Information</h2>
            <h4>
              Join theEduSmart to find best featured schools, seats available,
              their benefits, pay school fees and fill admission form online.
            </h4>

            <Form className="model-frm">
              <Form.Group
                className="frm-cell mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <label>
                  Child’s Full Name<span className="req">*</span>
                </label>
                <div className="field-group-wrap">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    autoFocus
                  />
                  <Form.Control type="text" placeholder="Middle Name" />
                  <Form.Control type="text" placeholder="Last Name" />
                </div>
              </Form.Group>

              <Form.Group className="frm-cell date mb-3" controlId="">
                <label>
                  Date of Birth<span className="req">*</span>
                </label>
                <div className="field-group-wrap">
                  <Form.Control type="text" placeholder="Select Date" />
                </div>
                <div className="fld-inst">
                  Editing Date of Birth may remove schools from your shortlisted
                  schools list if age criteria doesn't meet with the applying
                  class
                </div>
              </Form.Group>

              <Form.Group className="frm-cell gender mb-3" controlId="">
                <label className="sel-gender-lbl">
                  Select Gender<span className="req">*</span>
                </label>
                <div className="field-group-wrap">
                  <Form.Check type="switch" id="custom-switch" label="Boy" />
                  <Form.Check
                    disabled
                    type="switch"
                    label="Girl"
                    id="disabled-custom-switch"
                  />
                </div>
              </Form.Group>
              <Form.Group className="frm-cell button-wrap mb-3">
                <Button className="cancel-btn" onClick={() => history("/")}>
                  Cancel
                </Button>
                <Button
                  className="save-btn"
                  onClick={() => history("/all-schools")}
                >
                  Save
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </Container>
    );
};
export default SchoolAdmission;