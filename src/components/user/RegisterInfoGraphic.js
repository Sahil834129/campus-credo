import React from "react";
import {Row, Col} from "react-bootstrap";
import { ReactComponent as SignupGraphic } from "../../assets/img/singup-graphic1.svg";

const RegisterInfoGraphic = () => {
    return(
        <Row className="infobox-pane">
            <SignupGraphic />
            <Col className="infobox-inner">
                <h2>Enquire and Apply to Top Schools in your locality</h2>
                <h6>Select the right school for your child and apply to multiple schools through a single form.</h6>
            </Col>
        </Row>
    );
};

export default RegisterInfoGraphic;