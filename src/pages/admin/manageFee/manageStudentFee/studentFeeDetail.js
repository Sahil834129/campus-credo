import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader, { hideLoader, showLoader } from "../../../../common/Loader";
import GenericDialog from "../../../../dialogs/GenericDialog";
import { getFeeAndPaymentHistoryForStudent } from "../../../../utils/services";
import FeeModalHeader from "./feeModalHeader";
import { humanize } from "../../../../utils/helper";
import { SESSION } from "../../../../constants/app";
import { formatDateToDDMMYYYY } from "../../../../utils/DateUtil";


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
                            ? submissionFrequency.map((val,key ) => {
                                return (<tr valign="middle" key={key}>
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