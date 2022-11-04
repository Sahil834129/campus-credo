import { Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg"
import UserStatus from "./UserStatus";
const AppliedSchools = (props) => {
    const school = props.school;
    return (
        <Col className='right content'>
            <div className='row-items application-block'>
                <div className='col-item left'>
                    <div className='school-info-main'>
                        <div className='info-item school-logo-wrap'>
                            <Card.Img className='school-logo' src={schoolpic01} />
                        </div>
                        <div className='info-item school-info-exerpts'>
                            <div className='school-name'>
                                {school.schoolName}
                            </div>
                            <ListGroup className='school-type'>
                                <ListGroup.Item>{school.board}</ListGroup.Item>
                                <ListGroup.Item>{school.mediumOfInstruction}</ListGroup.Item>
                                <ListGroup.Item>{school.gender}</ListGroup.Item>
                            </ListGroup>
                           
                            <div className='moreinfo-block'>
                                <div className='col'>Applying to Class : <strong>{school.applyingtoClass}</strong></div>
                                <div className='col divider'>|</div>
                                <div className='col'>Admission Fee Paid : <strong>{school.admissionFeePaid}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserStatus />
            </div>
        </Col>
    )
}

export default AppliedSchools;