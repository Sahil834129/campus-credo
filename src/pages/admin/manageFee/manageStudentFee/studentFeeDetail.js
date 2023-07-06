import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import FeeModalHeader from "./feeModalHeader";
import { humanize } from "../../../../utils/helper";
import { SESSION } from "../../../../constants/app";
import { formatDateToDDMMYYYY } from "../../../../utils/DateUtil";


export default function StudentFeeDetails({ show, handleClose, student }) {

    const [submissionFrequency, setSubmissionFrequency] = useState([])
    const [openAccord, setOpenAccord] = useState(false)
    const [data, setData] = useState({})
    const dispatch = useDispatch()
    const session = SESSION


    const fetchFeeAndPaymentHistoryForStudent = () => {
        showLoader(dispatch)
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

    // "status paid"

    const getCssClassName = (curVal) => {
        switch (data[`${curVal}`].feeStatus) {
            case "Paid":
                if (data[`${curVal}`].lateFee > 0){
                    return "status late-paid"
                }else{
                    return "status paid"
                }
                ;
            case "Due":
                return "status due";
            case "Overdue":
                return "status not-paid";
            default:
                return "status late-paid";
                ;
        }
    }

    useEffect(() => {
        fetchFeeAndPaymentHistoryForStudent()
    }, [])

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Student fee Details"
            className="Student-fee-model "
        >
            <FeeModalHeader student={student} session={session} />
            <Loader />
            <div className="table-wrapper">
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr valign="middle">
                            <th>Frequency</th>
                            <th>Status</th>
                            <th>Late Fee</th>
                            <th>Total Fee</th>
                            <th>Payment Mode</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissionFrequency.length > 0
                            ? submissionFrequency.map((val) => {
                                return (<tr valign="middle">
                                    <td>{val}</td>
                                    <td><div className={getCssClassName(val)}> {data[`${val}`].feeStatus}</div></td>
                                    <td>{data[`${val}`].lateFee}</td>
                                    <td>{data[`${val}`].totalFeeDue}</td>
                                    <td>{data[`${val}`].paymentMode}</td>
                                    <td>{formatDateToDDMMYYYY(data[`${val}`].paymentDate)}</td>
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