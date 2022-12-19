import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import schoolpic01 from "../assets/img/school-picture/boarding-icon.jpg"

const SchoolCardHeader = (props) => {
    const school = props.school;
    return (
        <Card.Body className='school-info-main'>
            <Row className='info-item school-logo-wrap'>
                <Card.Img className='school-logo' variant="left" src={schoolpic01} />
                {/* <Card.Img className='school-logo' variant="left" src={school.schoolThumbnailImgLink} /> */}
            </Row>
            <Row className='info-item school-info-exerpts'>
                <div className='school-name'>
                    {school.schoolName}  
                    <div className="tutionfee-wrap"><label>Application Fee</label> <span className='fee-to'>{school.admissionInfo?.admissionFormFee}</span></div>
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