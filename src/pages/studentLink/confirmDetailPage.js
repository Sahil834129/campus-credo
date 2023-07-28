import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { confirmLinkParentStudent } from "../../utils/services";


const ConfirmDetailPage = ({ data, userId, setShowForm, setUpdateTable, handleClose }) => {

    const confirmLink = () => {
        const payload = {
            "studentId": data.studentId,
            "parentId": userId
        }
        confirmLinkParentStudent(payload)
            .then(res => {
                const temp = res.status
                if (temp === 200) {
                    setShowForm(false)
                    setUpdateTable(val => !val)
                    handleClose()
                }
            })
            .catch(err =>
                toast.error(err?.response?.data?.apierror?.message || "Something went wrong"))
    }

    return (
        <div className="student-detals-wrap">
            <div className="item-block"
            //  style={{ borderTop: '1px solid lightGrey', margin: "0px 20px 0px 20px", borderBottom: '1px solid lightGrey' }}
             >
                <div className="frm-title" 
                    style={{ margin: '20px 0px' }}
                >
                    <h2>Search Registered student by following <span className='red-star'>*</span></h2>
                </div>
                <div className="frm-wrapper">
                    <div className="frm-row">
                        <div className="cell-item">
                            <label>Student Name <span style={{ color: 'red' }}>*</span> </label>  
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={`${data.firstName || ''} ${data.lastName || ''}`}
                                />
                            </div>  
                        </div>
                        <div className="cell-item">
                            <label>Stream</label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    defaultValue={data.stream || ''}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="frm-row">
                        <div className="cell-item">
                            <label>Class </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.className || ''}
                                />
                            </div>
                        </div>
                        <div className="cell-item">
                            <label>Section </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.classSection || ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="frm-row">
                        <div className="cell-item">
                            <label>Registration # </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.schoolStudentId || ''}
                                />
                            </div>
                        </div>
                        <div className="cell-item">
                            <label>Date of Birth </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.dateOfBirth || ''}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="frm-row">
                        <div className="cell-item">
                            <label>Contact Name <span style={{ color: 'red' }}>*</span> </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.emergencyContactName || ''}
                                />
                            </div>
                        </div>
                        <div className="cell-item">
                            <label>Contact No. <span style={{ color: 'red' }}>*</span> </label>
                            <div className="fld-wrap">
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.emergencyContactNumber || ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="btn-wrapper">
                <Button
                    style={{ marginRight: '10px', border: '1px solid red', color: 'red', backgroundColor: 'white' }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    style={{ border: '1px solid rgb(65,40,95)', backgroundColor: 'rgb(65,40,95)' }}
                    onClick={confirmLink}
                >
                    Confirm
                </Button>

            </div>
        </div>
    )
}

export default ConfirmDetailPage;