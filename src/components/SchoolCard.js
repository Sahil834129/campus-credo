import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import InfoDropDown from "./InfoDropDown";
import PageContent from "../resources/pageContent";
import SchoolCardHeader from "./SchoolCardHeader";

const SchoolCard = (props) => {
    const school = props.school;
    return (
        <Card className='school-card'>
            <SchoolCardHeader school={school}/>
            <ListGroup className="info-list-group">
                <ListGroup.Item>
                    <div className='left'>Avg. Monthly Tuition Fees</div>
                    <div className='right fee-wrap'><span className='fee-to'>₹{school.monthlyFeeMin}</span> to <span className='fee-from'>₹{school.monthlyFeeMax}</span></div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='left'>Classes</div>
                    <div className='right'>{school.classesFromUpto}</div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='left'>Admission Status:</div>
                    <div className='right session-wrap'>
                        {
                            school.admissionInfo != null ?
                                <>
                                <span className='session-title'>{school.admissionInfo.admissionStatus} for {school.admissionInfo.admissionSession} </span>
                                <InfoDropDown header={school.admissionInfo.admissionStatus + " for " + school.admissionInfo.admissionSession} options={school.admissionInfo.admissionOpenForClasses.split(",")}/>
                                </>
                            : 'Closed'}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='left'>Seats Available:</div>
                    <div className='right seats'>{school.admissionInfo?.seatsAvailable}</div>
                </ListGroup.Item>
            </ListGroup>
            <Card.Body className='button-wrap'>
                <Card.Link href={"/school/"+school.name+"?id="+school.schoolId} className='view'>View Details</Card.Link>
                <Card.Link className='add' onClick={()=> {props.handleAddToCart(school.schoolId)}}>Add to Cart</Card.Link>
            </Card.Body>
            <Col className='salient-features'>
                <Row className='partner-wrap'>
                    <div className='partner-item icon'><i className='icons partner-icon'></i></div>
                    <div className='partner-item lbl'><label>Application Partner</label></div>
                </Row>
                <ListGroup className="feature-list-group">
                {
                    school.facilities.map((item, index) => {
                        let fIcon = PageContent.FACILITY_ICON_MAP.hasOwnProperty(item.facilityName) ? PageContent.FACILITY_ICON_MAP[item.facilityName] : null;
                        if (index < 4) {
                            return (
                                <ListGroup.Item key={item.facilityMasterId}><i className={'icons ' + (fIcon !== null ? fIcon : 'boarding-icon')}></i></ListGroup.Item>
                            )
                        }
                    })
                }
                    <ListGroup className="info-list-group">
                        <ListGroup.Item>
                            {
                                    school.facilities.length > 4 ?
                                        <>
                                            <span className='session-title'></span>
                                            <InfoDropDown icon={school.facilities.length - 4}
                                                options={school.facilities.map((it) => (it.facilityName))} />
                                        </>
                                        : 'Closed'}
                            
                        </ListGroup.Item>
                    </ListGroup>

                </ListGroup>
            </Col>
        </Card>
    );
};

export default SchoolCard;