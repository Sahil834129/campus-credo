import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { DoughnutChart } from "../../../common/Chart";
import { getSchoolAdmissinFeeSummary } from "../../../utils/services";

export default function SeatsFeesGraph({ sessionValue }) {
    const [feesSummary, setFeesSummary] = useState({});
    const [feesCollectedPercent, setFeesCollectedPercent] = useState(0);
    const [accepetedPercentsage, setAcceptedPercentage] = useState(0);

    const fetchSchoolAdmissinFeesSummary = (currentSession) => {
        getSchoolAdmissinFeeSummary(currentSession).then(res => {
            const val = res?.data;
            setFeesSummary(val?.schoolAdmissionFeeSummary);
        }).catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (sessionValue !== "") {
            fetchSchoolAdmissinFeesSummary(sessionValue);
        }
    }, [sessionValue]);

    useEffect(() => {
        const percentageVal = (((parseInt(feesSummary?.collectedApplicationFee || 0)) * 100) / feesSummary?.projectedApplicationFee);
        let fesCollectedPercent = 0;
        setAcceptedPercentage(isNaN(percentageVal) ? 0 : parseFloat(percentageVal).toFixed(2));
        if (feesSummary?.projectedRegistrationFee !== 0) {
            fesCollectedPercent = (parseFloat((parseInt(feesSummary?.collectedRegistrationFee || 0) * 100) / parseInt(feesSummary?.projectedRegistrationFee || 0)));
            fesCollectedPercent = isNaN(fesCollectedPercent) ? 0 : parseFloat(fesCollectedPercent).toFixed(2);
        }
        setFeesCollectedPercent(fesCollectedPercent);
    }, [feesSummary]);


    return (
        <div className='chart-block ch2'>
            <div className='title-area' style={{ paddingBottom: 0, marginBottom: 0 }}>
                <div className='right-col'>
                    <ListGroup className='clist-group'>
                        <ListGroup.Item>
                            <span>{feesSummary?.collectedApplicationFee}</span>
                            <label>Application Fees</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span>{feesSummary?.projectedApplicationFee}</span>
                            <label>Projected Application Fees</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span>{feesSummary?.collectedRegistrationFee}</span>
                            <label>Registration Fees</label>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span>{feesSummary?.projectedRegistrationFee}</span>
                            <label>Projected Registration Fees</label>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="" style={{ textAlign: 'center', paddingTop: '5px', paddingBottom: '0px' }}><h2>Fees Status</h2></div>
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
                                midNumberText={accepetedPercentsage + '%'}
                                midTextFirst={'Application'}
                                midTextSecond={'Fees'}
                                totalRemainngData={`${feesSummary?.projectedApplicationFee || 0}`}
                                totalRemainng="Projected Application Fees"
                            />
                        </td>
                        <td>
                            <DoughnutChart
                                data={{
                                    datasets: [
                                        {
                                            data: [feesCollectedPercent, 100 - feesCollectedPercent],
                                            backgroundColor: ["#59D04D", "#EEF0F5"],
                                            borderRadius: 30,
                                            cutout: 90,
                                            radius: 80
                                        }],
                                } || {}}
                                midNumberText={feesCollectedPercent + '%'}
                                midTextFirst={'Registration'}
                                midTextSecond={'Fees'}
                                totalRemainngData={`₹ ${(feesSummary?.projectedRegistrationFee || 0).toLocaleString('en-IN')}`}
                                totalRemainng="Projected Registration Fees"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
} 