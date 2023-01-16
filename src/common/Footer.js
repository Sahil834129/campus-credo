import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import FooterGraphic from "../assets/img/footer-graphic.png";
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
        <div className="fcol">
          <img src={FooterGraphic} alt="" />
        </div>
        <div className="fcol">
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
        <div className="fcol">
          <h2>Contact Us @</h2>
          <ListGroup as="ul">
            <ListGroup.Item as="li">T: {PageContent.PHONE}</ListGroup.Item>
            <div>
              <Link
                onClick={() =>
                  (window.location = "mailto:support@campuscredo.com")
                }
              >
                E: {PageContent.ENQUIRY_EMAIL}
              </Link>
            </div>
            <ListGroup.Item as="li">
              <a href="https://www.facebook.com" style={{visibility:'hidden'}}>F: Follow us on Facebook</a>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              <a href="https://www.twitter.com" style={{visibility:'hidden'}}>T: Follow us on Twitter</a>
            </ListGroup.Item>
            {/* <ListGroup.Item as="li">
              <a href="https://www.linkedin.com" >L: Follow us on Linkedin</a>
            </ListGroup.Item> */}
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
          &copy; 2022 CampusCredo. | All Rights Reserved.
        </div>
        <div className="copyright-col">
          <Link to={"/terms"}>Terms Of Use</Link>{" "}
          <Link to={"/privacyPolicy"}>Privacy Policy</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;