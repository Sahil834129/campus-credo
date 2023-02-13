import { ListGroup } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function SeatsDetail({ schoolSeatsSummary }) {
    return (
        <div className='metrics-block mb2'>
            <div className='title-area'>
                <h2>All Seats</h2>
                <div className='value'>{(schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant) || 0}</div>
            </div>
            <ListGroup className='mlist-group'>
                <ListGroup.Item>
                    <div className='info'>
                        <label>Opening:</label>
                        <span className='value'>{schoolSeatsSummary?.openingSeats || 0}</span>
                    </div>
                    <ProgressBar variant='success' now={(parseInt(schoolSeatsSummary?.openingSeats) * 100) / (schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant)} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='info'>
                        <label>Filled:</label>
                        <span className='value'>{schoolSeatsSummary?.filled || 0}</span>
                    </div>
                    <ProgressBar variant='warning' now={(parseInt(schoolSeatsSummary?.filled) * 100) / (schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant)} />
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='info'>
                        <label>Vacant:</label>
                        <span className='value'>{schoolSeatsSummary?.vacant || 0}</span>
                    </div>
                    <ProgressBar variant='danger' now={(parseInt(schoolSeatsSummary?.vacant) * 100) / (schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant)} />
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}