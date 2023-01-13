import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import schoolpic01 from "../assets/img/school-picture/boarding-icon.jpg";
import { baseURL } from "../utils/RestClient";

const SchoolCardHeader = (props) => {
    const school = props.school;
    return (
        <Card.Body className='school-info-main'>
            <Row className='info-item school-logo-wrap'>
                <Card.Img className='school-logo' variant="left" alt={school.schoolName} src={school.schoolImgLink ? (baseURL + school.schoolImgLink) : schoolpic01} />
            </Row>
            <Row className='info-item school-info-exerpts'>
                <div className='school-name'>
                    {school.schoolName}  
                    <div className="tutionfee-wrap">{school.admissionInfo?.admissionFormFee? <><label>Application Fee </label><span className='fee-to'>₹{school.admissionInfo.admissionFormFee}*</span></> : ''}</div>
                </div>
                <ListGroup className='school-type'>
                    <ListGroup.Item>{school.board}</ListGroup.Item>
                    <ListGroup.Item>{school.mediumOfInstruction}</ListGroup.Item>
                    <ListGroup.Item>{school.gender}</ListGroup.Item>
                </ListGroup>
                <div className='location-block'>
                    <i className='icons location-icon'></i>
                    <div className='loc-items'>
                        <div className='loc-item'>
                            <span className='region'>{school.addressLine1},</span><span className='city'>{school.city}</span>
                        </div>
                        <span className='loc-item distance'>({school.distance} km away)</span>
                    </div>
                </div>
            </Row>
        </Card.Body>
    )
}

export default SchoolCardHeader;