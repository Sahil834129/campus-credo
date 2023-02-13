import { ListGroup } from "react-bootstrap";

export default function ApplicationProcessing({applicationProcessing }) {
    return (
        <div className='metrics-block mb1'>
            <div className='title-area'>
                <h2>Application Processing </h2>
                <div className='value'>{applicationProcessing?.totalApplicationProcessing || 0}</div>
            </div>
            <ListGroup className='mlist-group'>
                <ListGroup.Item>
                    <div className='mitem-wrap'>
                        <label className='lbl'>Application Approved</label>{' '}
                        <span className='value'>{applicationProcessing?.approved || 0}</span>
                    </div>
                    <div className='mitem-wrap'>
                        <label className='lbl'>Under Review</label>{' '}
                        <span className='value'>{applicationProcessing?.underReview || 0}</span>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='mitem-wrap'>
                        <label className='lbl'>AT/PI</label>{' '}
                        <span className='value'>{applicationProcessing?.atPi || 0}</span>
                    </div>
                    <div className='mitem-wrap'>
                        <label className='lbl'>Under Final Review</label>{' '}
                        <span className='value'>{applicationProcessing?.underFinalReview || 0}</span>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}