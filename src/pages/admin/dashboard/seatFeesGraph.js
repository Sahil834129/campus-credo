import { useState } from "react";
import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { DoughnutChart } from "../../../common/Chart";
import { getSchoolAdmissinFeeSummary } from "../../../utils/services";

export default function SeatsFeesGraph({ schoolSeatsSummary, applicationStatus, acceptedOffer }) {
    //dashboard/schoolAdmissionFeeSummary
    const [feesCollected, setFeesCollected] = useState(0);
    const [totalSeats, setTotalSeats] = useState(0);
    const [accepetedPercentsage, setAcceptedPercentage] = useState(0);
    const [totalFeesCollected, setTotalFeesCollected] = useState(0);
    // const accepetedPercentsage =;
    const fetchSchoolAdmissinFeesSummary = () => {
        getSchoolAdmissinFeeSummary().then(res => {
            const val = res?.data;
            if (val?.schoolAdmissionFeeSummary?.projectedFee === 0) {
                setTotalFeesCollected(0);
                setFeesCollected(0);
            } else {
                setTotalFeesCollected(val?.schoolAdmissionFeeSummary?.projectedFee);
                setFeesCollected(((parseInt(val?.schoolAdmissionFeeSummary?.collectedFee || 0) * 100) / parseInt(val?.schoolAdmissionFeeSummary?.projectedFee)));
            }
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        fetchSchoolAdmissinFeesSummary();
    }, []);

    useEffect(() => {
        setTotalSeats(schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant);
    }, [schoolSeatsSummary]);

    useEffect(() => {
        setTotalSeats(schoolSeatsSummary?.filled + schoolSeatsSummary?.vacant);
    }, [schoolSeatsSummary]);

    useEffect(() => {
        const percentageVal = (((parseInt(acceptedOffer?.accepted || 0)) * 100) / totalSeats);
        setAcceptedPercentage(isNaN(percentageVal) ? 0 : percentageVal);
    }, [acceptedOffer, totalSeats]);

    return (
        <div className='chart-block ch2'>
            <div className='title-area' style={{ paddingBottom: 0, marginBottom: 0 }}>
                <div className='right-col'>
                    <ListGroup className='clist-group'>
                        <ListGroup.Item>
                            <span className='value'>{(totalSeats) || 0}</span>
                            <label>Total Seats</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='value'>{applicationStatus?.received || 0}</span>
                            <label>Application Received</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span className='value'>₹{totalFeesCollected}</span>
                            <label>Fee Collected</label>
                        </ListGroup.Item>
                    </ListGroup>
                    <div style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '30px' }}>Application Status</div>
                </div>
            </div>
            <table className='chart-area' style={{ padding: 0 }}>
                <tbody>
                    <tr>
                        <td>
                            <DoughnutChart
                                data={{
                                    datasets: [
                                        {
                                            data: [accepetedPercentsage, 100 - accepetedPercentsage],
                                            backgroundColor: ["#41285F", "#EEF0F5"],
                                            borderRadius: 30,
                                            cutout: 90,
                                            radius: 80,
                                        }],
                                } || {}}
                                midNumberText={accepetedPercentsage}
                                midTextFirst={'Offer'}
                                midTextSecond={'Accepted'}
                                totalRemainng={`${totalSeats} Remaining Seats`}
                            />
                        </td>
                        <td>
                            <DoughnutChart
                                data={{
                                    datasets: [
                                        {
                                            data: [feesCollected, 100 - feesCollected],
                                            backgroundColor: ["#59D04D", "#EEF0F5"],
                                            borderRadius: 30,
                                            cutout: 90,
                                            radius: 80
                                        }],
                                } || {}}
                                midNumberText={feesCollected}
                                midTextFirst={'Fee'}
                                midTextSecond={'Collected'}
                                totalRemainng={`${totalFeesCollected} Projected Fee`}

                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
} 