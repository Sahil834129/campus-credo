import { useEffect } from "react";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import { useState } from "react";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader";
import { useDispatch } from "react-redux";
import FeeModalHeader from "./feeModalHeader";


export default function StudentFeeDetails({ show, handleClose, student }) {

    const [submissionFrequency, setSubmissionFrequency] = useState([])
    const [openAccord, setOpenAccord] = useState(false)
    const [data, setData] = useState({})
    const dispatch = useDispatch()


    const fetchFeeAndPaymentHistoryForStudent = () => {
        showLoader(dispatch)
        const session = "2023-2024"
        getFeeAndPaymentHistoryForStudent(session, student.classId, student.studentId)
            .then(response => {
                if (response.status === 200) {
                    const temp = response?.data
                    setSubmissionFrequency(Object.keys(temp))
                    setData(temp)
                    hideLoader(dispatch)
                }
            })
            .catch(error => {
                console.log(error);
                hideLoader(dispatch)
            });
    }


    useEffect(() => {
        fetchFeeAndPaymentHistoryForStudent()
    }, [])

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Student fee Details"
            className="review-admission-modal add-child-model"
        >
            <FeeModalHeader student={student}/>
            <Loader/>
            <div>
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr valign="middle">
                            <th>Frequency</th>
                            <th>Academic Year</th>
                            <th>Payment Date</th>
                            <th>Status</th>
                            <th>Late Fee</th>
                            <th>Total Fee</th>
                            <th>Payment Mode</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissionFrequency.length > 0
                            ? submissionFrequency.map((val) => {
                                return (<tr valign="middle">
                                    <td>{val}</td>
                                    <td>{data[`${val}`].paymentDate}</td>
                                    <td>{data[`${val}`].paymentDate}</td>
                                    <td>{data[`${val}`].feeStatus}</td>
                                    <td>{data[`${val}`].lateFee}</td>
                                    <td>{data[`${val}`].totalFeeDue}</td>
                                    <td>{data[`${val}`].paymentMode}</td>
                                </tr>)
                            })
                            : <tr>
                                <td colSpan='7'>NO DATA FOUND</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </GenericDialog>
    )
}