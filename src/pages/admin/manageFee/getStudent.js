import { Button } from "react-bootstrap"
import { humanize } from "../../../utils/helper"
import { useState } from "react"
import GenericDialog from "../../../dialogs/GenericDialog"



export const GetStudent = ({ student, index }) => {

    const [viewFeeModal, setViewFeeModal] = useState(false)
    const [configureFeeModal, setConfigureFeeModal] = useState(false)


    console.log('student', student)

    const handleClose = () => {
        setViewFeeModal(false)
        setConfigureFeeModal(false)
    }

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
        {viewFeeModal && <GenericDialog
            show={viewFeeModal}
            handleClose={handleClose}
            modalHeader='Student fee Details'
        >
            <div className='title-area'>{`${humanize(student.firstName)} ${humanize(student.lastName)} (${student.schoolStudentId})`}</div>

        </GenericDialog>}
        {configureFeeModal && <GenericDialog
            show={configureFeeModal}
            handleClose={handleClose}
            modalHeader='Configure fee'
        >
            <div className='title-area'>{`${humanize(student.firstName)} ${humanize(student.lastName)} (${student.schoolStudentId})`}</div>

        </GenericDialog>}
    </>
    )
}