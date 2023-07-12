import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { humanize } from "../../../../utils/helper";
import { getFeeForStudent } from "../../../../utils/services";
import OfflineFeeModal from "./OfflineFeeModal";
import ConfigureFeeModal from "./configureFeeModal";
import StudentFeeDetails from "./studentFeeDetail";



export const GetStudent = ({ student, index, module, session }) => {

    const [viewFeeModal, setViewFeeModal] = useState(false);
    const [configureFeeModal, setConfigureFeeModal] = useState(false);
    const [offlinePaymentModal, setOfflinePaymentModal] = useState(false)
    const [feesDetail, setFeesDetail] = useState([]);

    const fetchStudentFeesData = () => {
        getFeeForStudent(student.classId, student.studentId, session)
            .then(response => {
                if (response.status === 200) {
                    const result = response?.data.map(val => {
                        return {
                            ...val,
                            disabled: val?.studentFee?.mandatory,
                        };
                    });
                    setFeesDetail(result);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleClose = () => {
        setViewFeeModal(false);
        setConfigureFeeModal(false);
        setOfflinePaymentModal(false);
    };

    useEffect(() => {
        if (configureFeeModal) {
            fetchStudentFeesData();
        }
    }, [configureFeeModal]);
    return (<>
        <tr>
            <td style={{width:"86px", textAlign:"center", backgroundColor:"rgba(65, 40, 95, 0.02)", boxShadow:"0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset" }}>{index + 1}</td>
            <td>{`${humanize(student.firstName)} ${humanize(student.lastName)}`}</td>
            <td>{student.schoolStudentId}</td>
            <td>{student.studentId}</td>
            <td>{student.dateOfBirth}</td>
            <td>{student.classSection}</td>
            <td>{student.stream}</td>
            <td>
                {(module === 'configureStudentFee')
                    ? <div className="frm-cell btn-wrapper" style={{ width: 'auto' }}>
                        <Button
                            variant="primary"
                            className="confirm-btn"
                            style={{ backgroundColor: '#41285F' }}
                            onClick={() => setViewFeeModal(true)}
                        >
                            Payment History
                        </Button>
                        <Button
                            variant="primary"
                            className="confirm-btn"
                            style={{ backgroundColor: '#4AB900' }}
                            onClick={() => setConfigureFeeModal(true)}
                        >
                            Configure Fee
                        </Button>
                    </div>
                    : <div className="frm-cell btn-wrapper" style={{ width: 'auto' }}>
                        <Button
                            variant="primary"
                            className="confirm-btn"
                            style={{ backgroundColor: '#4AB900' }}
                            onClick={() => setOfflinePaymentModal(true)}
                        >
                            Offline Payment
                        </Button>

                    </div>}
            </td>
        </tr>
        {viewFeeModal && (
            <StudentFeeDetails
                show={viewFeeModal}
                handleClose={handleClose}
                student={student}
            />
        )}
        {configureFeeModal && (
            <ConfigureFeeModal
                configureFeeModal={configureFeeModal}
                handleClose={handleClose}
                student={student}
                fetchStudentFees={fetchStudentFeesData}
                feesDetail={feesDetail}
                session={session}
            />
        )}
        {offlinePaymentModal && (
            <OfflineFeeModal
                show={offlinePaymentModal}
                handleClose={handleClose}
                student={student}
            />
        )}
    </>
    );
};