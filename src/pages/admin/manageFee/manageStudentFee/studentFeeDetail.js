import Loader from "../../../../common/Loader";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { formatDateToDDMMYYYY } from "../../../../utils/DateUtil";
import FeeModalHeader from "./feeModalHeader";


export default function StudentFeeDetails({ show, handleClose, student, session, data, submissionFrequency }) {

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

    return (
        <GenericDialog
            show={show}
            handleClose={handleClose}
            modalHeader="Student fee Details"
            className="Student-fee-model"
        >
            <FeeModalHeader student={student} session={session} />
            <Loader />
            <div className="table-wrapper">
                <table className="table" style={{ width: '100%' }}>
                    <thead>
                        <tr valign="middle">
                            <th>Frequency</th>
                            <th>Status</th>
                            <th style={{ textAlign: "center" }}>Late Fee</th>
                            <th style={{ textAlign: "center" }}>Amount</th>
                            <th style={{ textAlign: "center" }}>Total Fee</th>
                            <th>Payment Mode</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissionFrequency.length > 0
                            ? submissionFrequency.map((val,key ) => {
                                return (<tr valign="middle" key={key}>
                                    <td>{val}</td>
                                    <td><div className={getCssClassName(val)}> {data[`${val}`].feeStatus}</div></td>
                                    <td style={{ textAlign: "center" }}>{data[`${val}`].lateFee}</td>
                                    <td style={{ textAlign: "center" }}>{data[`${val}`].feeStatus === 'Paid'? data[`${val}`].paymentAmount :data[`${val}`].totalFeeDue}</td>
                                    <td style={{ textAlign: "center" }}>{data[`${val}`].lateFee + (data[`${val}`].feeStatus === 'Paid'? data[`${val}`].paymentAmount :data[`${val}`].totalFeeDue)}</td>
                                    <td>{data[`${val}`].paymentMode}</td>
                                    <td>{formatDateToDDMMYYYY(data[`${val}`].paymentDate)}</td>
                                </tr>)
                            })
                            : <tr >
                                <td colSpan='7' style={{ textAlign: "center" }}>NO DATA FOUND</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </GenericDialog>
    )
}