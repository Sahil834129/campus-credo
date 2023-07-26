import { toast } from "react-toastify"
import { confirmLinkParentStudent } from "../../utils/services"
import { Form } from "react-bootstrap"
import { Button } from "react-bootstrap";


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
        <div>
            <div style={{ borderTop: '1px solid lightGrey', margin: "0px 20px 0px 20px", borderBottom: '1px solid lightGrey' }}>
                <div style={{ margin: '20px 0px' }}>Provide following student information <span style={{ color: 'red' }}>*</span></div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div style={{ margin: '10px', width: '45%' }}>
                            <label>Student Name <span style={{ color: 'red' }}>*</span> </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={`${data.firstName} ${data.lastName}` || ''}
                                />
                            </div>
                        </div>
                        <div style={{ margin: '10px', width: '45%' }}>
                            <label>Stream</label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    defaultValue={data.stream || 'NA'}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Class </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.className}
                                />
                            </div>
                        </div>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Section </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.classSection}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Rigistration # </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.academicSession}
                                />
                            </div>
                        </div>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Date of Birth </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.dateOfBirth}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Contact Name <span style={{ color: 'red' }}>*</span> </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.emergencyContactName}
                                />
                            </div>
                        </div>
                        <div style={{ width: '45%', margin: '10px' }}>
                            <label>Contact No. <span style={{ color: 'red' }}>*</span> </label>
                            <div>
                                <Form.Control
                                    size='sm'
                                    disabled
                                    defaultValue={data.emergencyContactNumber}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: '10px', display: 'flex', justifyContent: 'end' }} >
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