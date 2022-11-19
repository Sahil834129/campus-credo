import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import schoolpic01 from "../../assets/img/school-picture/boarding-icon.jpg"

const AppliedSchools = ({application}) => {
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
                                {application.schoolName}
                            </div>
                            <ListGroup className='school-type'>
                                <ListGroup.Item>{application.board}</ListGroup.Item>
                                <ListGroup.Item>{application.mediumOfInstruction}</ListGroup.Item>
                                <ListGroup.Item>{application.gender}</ListGroup.Item>
                            </ListGroup>
                           
                            <div className='moreinfo-block'>
                                <div className='col'>Applying to Class : <strong>{application.className}</strong></div>
                                <div className='col divider'>|</div>
                                <div className='col'>Admission Fee Paid : <strong>{application.formFee}</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='col-item right'>
                    <div className='col'><label>Status</label></div>
                    <div className='col'><span className='badge accepted'>{application.applicationStatus}</span></div>
                    <div className='col'></div>
                </div>
                
            </div>
        </Col>
    )
}

export default AppliedSchools;