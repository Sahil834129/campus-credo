import { Button } from "react-bootstrap";
import { humanize } from "../../../../utils/helper";
import { useEffect, useState } from "react";
import { getFeeForStudent } from "../../../../utils/services";
import ConfigureFeeModal from "./configureFeeModal";
import StudentFeeDetails from "./studentFeeDetail";



export const GetStudent = ({ student, index, classes }) => {

    const [viewFeeModal, setViewFeeModal] = useState(false);
    const [configureFeeModal, setConfigureFeeModal] = useState(false);
    const [feesDetail, setFeesDetail] = useState([]);

    const fetchStudentFeesData = () => {
        getFeeForStudent(student.classId, student.studentId)
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
    };

    useEffect(() => {
        if (configureFeeModal) {
            fetchStudentFeesData();
        }
    }, [configureFeeModal]);
    return (<>
        <tr>
            <td>{index + 1}</td>
            <td>{`${humanize(student.firstName)} ${humanize(student.lastName)}`}</td>
            <td>{student.schoolStudentId}</td>
            <td>{student.studentId}</td>
            <td>{student.dateOfBirth}</td>
            <td>{student.classSection}</td>
            <td>{student.stream}</td>
            <td>
                <div className="frm-cell btn-wrapper mt-3" style={{ width: 'auto' }}>

                    <Button
                        variant="primary"
                        className="confirm-btn"
                        style={{ backgroundColor: 'orange' }}
                        onClick={() => setViewFeeModal(true)}
                    >
                        View fee
                    </Button>
                    <Button
                        variant="primary"
                        className="confirm-btn"
                        style={{ backgroundColor: 'green' }}
                        onClick={() => setConfigureFeeModal(true)}
                    >
                        Configure Fee
                    </Button>
                </div>
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
                setFeesDetail={setFeesDetail}
                feesDetail={feesDetail}
            />
        )}
    </>
    );
};