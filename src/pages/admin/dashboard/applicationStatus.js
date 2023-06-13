import { ListGroup } from "react-bootstrap";
import { Barchart } from "../../../common/Chart";

export default function ApplicationStatus({totalApproved, labels,received, approved, declined, applicationStatus , totalApplication}) {
    return (
        <div className='chart-block ch1'>
            <div className='title-area'>
                <div className='left-col'>
                    <h2>Application Status</h2>
                </div>
                <div className='right-col'>
                    <ListGroup className='clist-group'>
                        <ListGroup.Item>
                            <span className='value'>{totalApplication || 0}</span>
                            <label>Received</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='value'>{totalApproved || 0}</span>
                            <label>Approved</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='value'>{applicationStatus?.declined || 0}</span>
                            <label>Declined</label>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
            <div className='chart-area'>
                <Barchart labelsdata={{
                    labels: labels, 
                    datasets: [
                        {
                            label: "Received",
                            data: received,
                            backgroundColor: "#41285F",
                            borderRadius: 4,
                            boxWidth: 12,

                        },
                        {
                            label: "Approved",
                            data: approved,
                            backgroundColor: "#59D04D",
                            borderRadius: 4,
                            boxWidth: 12,
                        },
                        {
                            label: "Declined",
                            data: declined,
                            backgroundColor: "#FF5767",
                            borderRadius: 4,
                            boxWidth: 12,
                        }
                    ]
                }} styling={{ height: '300px', width: '100%' }} />
            </div>
        </div>)
}