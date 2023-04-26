import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import FooterGraphic from "../assets/img/footer-graphic.png";
import { ReactComponent as Mail } from "../assets/img/icons/email.svg";
import { ReactComponent as Facebook } from "../assets/img/icons/facebook.svg";
import { ReactComponent as Instagram } from "../assets/img/icons/instagram.svg";
import { ReactComponent as Linkedin } from "../assets/img/icons/linkedIn.svg";
import { ReactComponent as Pinterest } from "../assets/img/icons/pinterest.svg";
import { ReactComponent as Telephone } from "../assets/img/icons/telephone.svg";
import { ReactComponent as Twitter } from "../assets/img/icons/twitter.svg";
import PageContent from "../resources/pageContent";

const Footer = () => {
  const navigate = useNavigate();

  function handleClick(path) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  function navigateToRef(ref) {
    window.scrollTo(0, 0);
    navigate(ref);
  }

  return (
    <footer className="footer-main">
      <Container className="finner">
        <div className="fcol fbrandlogo">
          <img src={FooterGraphic} alt="" />
        </div>
        <div className="fcol contactus">
          <h2>Follow Us</h2>
          <ListGroup as="ul">
          <ListGroup.Item as="li">
              <a href="https://www.facebook.com/CampusCredo/"><Facebook /> <span className="nav-lbl">Facebook</span></a>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href="https://twitter.com/CampusCredo"><Twitter /> <span className="nav-lbl">Twitter</span></a>
            </ListGroup.Item>
            
            <ListGroup.Item as="li">
              <a href="https://www.instagram.com/campus_credo/"><Instagram />  <span className="nav-lbl">Instagram</span></a>
            </ListGroup.Item>
            
            <ListGroup.Item as="li">
              <a href="https://www.linkedin.com/company/campuscredo/"><Linkedin />  <span className="nav-lbl">Linkedin</span></a>
            </ListGroup.Item>
            
            <ListGroup.Item as="li">
              <a href="https://in.pinterest.com/campus_credo"><Pinterest />  <span className="nav-lbl">Pinterest</span></a>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="fcol contactus">
          <h2>Contact Us @</h2>
          <ListGroup as="ul">
            <ListGroup.Item as="li"><Telephone /> <span className="nav-lbl">{PageContent.PHONE}</span></ListGroup.Item>
            <ListGroup.Item as="li">
              <a
                style={{cursor: 'pointer'}}
                onClick={(e) => {
                  (window.location = "mailto:support@campuscredo.com")
                  e.stopPropagation();
                }}
              >
                <Mail /> <span className="nav-lbl">{PageContent.ENQUIRY_EMAIL}</span>
              </a>
            </ListGroup.Item>
          </ListGroup>
        </div>
        <div className="fcol quicklinks">
          <h2>Quick Links</h2>
          <ListGroup as="ul">
            {PageContent.FOOTER_MENU_ITEMS.map((fMenuItem, index) => (
              <ListGroup.Item as="li" key={"footer_" + index}>
                <Link
                  href="javascript:void(0);"
                  to={fMenuItem.ref}
                  onClick={(e) => navigateToRef(fMenuItem.ref)}
                >
                  {fMenuItem.title}
                </Link>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="fcol btn-container">
          <Button className="faq-btn" onClick={() => handleClick("/faqs")}>
            <i className="icons questionmark-icon"></i> Frequently Asked
            Questions
          </Button>
          <Button
            className="contact-btn"
            onClick={() => handleClick("/contactUs")}
          >
            <i className="icons contactloc-icon"></i>Contact Us
          </Button>
        </div>
      </Container>
      <Container className="copyright-row">
        <div className="copyright-col">
          &copy; 2023 CampusCredo. | All Rights Reserved.
        </div>
        <div className="copyright-col">
          <Link to={"/termsOfService"}>Terms of Service</Link>{" "}
          <Link to={"/privacyPolicy"}>Privacy Policy</Link>
          <Link to={"/disclaimerPolicy"}>Disclaimer Policy</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;