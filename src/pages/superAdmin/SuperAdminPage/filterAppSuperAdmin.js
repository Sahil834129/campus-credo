import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
// import { superAdminValidation } from '../../../data/validationSchema';
import { toast } from "react-toastify";
import { OPERATORS } from "../../../constants/app"
import ReactDatePicker from 'react-datepicker';
import { formatDateToDDMMYYYY } from '../../../utils/DateUtil';

const SuperAdminFilterApp = ({ fetchRowData }) => {
    const intialValue = {
        applicationDataId: '',
        firstName: '',
        lastName: '',
        dateRange: [null, null],
    };

    const [applicationDataId, setApplicationDataId] = useState(intialValue.applicationDataId)
    const [firstName, setFirstName] = useState(intialValue.firstName)
    const [lastName, setLastName] = useState(intialValue.lastName)
    const [dateRange, setDateRange] = useState(intialValue.dateRange);
    const [startDate, endDate] = dateRange;

    const ClearForm = (e) => {
        setApplicationDataId(intialValue.applicationDataId)
        setFirstName(intialValue.firstName)
        setLastName(intialValue.lastName)
        setDateRange(intialValue.dateRange)
        fetchRowData()
    };


    const handleApply = async (e) => {
        e.preventDefault()
        const filterPyaload = {};
        const filter = []
        if (applicationDataId !== null && applicationDataId !== '') {
            filter.push({
                field: 'applicationNumber',
                operator: OPERATORS.LIKE,
                value: applicationDataId
            });
        }
        if (firstName !== null && firstName !== '') {
            filter.push({
                field: 'firstName',
                operator: OPERATORS.LIKE,
                value: firstName
            });
        }
        if (lastName !== null && lastName !== '') {
            filter.push({
                field: 'lastName',
                operator: OPERATORS.LIKE,
                value: lastName
            });
        }
        if (startDate !== null && startDate !== '' && endDate !== null && endDate !== '') {
            filter.push({
                field: 'submissionDate',
                operator: OPERATORS.BETWEEN,
                values: [formatDateToDDMMYYYY(startDate), formatDateToDDMMYYYY(endDate)]
            });
        }
        fetchRowData(filter)
    }

    return (
        <div className='filterpanel'>
            <div className='filter-head'>
                <span className='filter-title'>
                    <i className='icons filter-icon'></i>
                    <label>Filters</label>
                </span>
                <Link href='' onClick={ClearForm}>Clear All</Link>
            </div>
            <div className='filter-form-area'>
                <Form>
                    <Form.Group className='form-element-group' controlId=''>
                        <Form.Label className='form-label'>Application Number</Form.Label>
                        <Form.Control type='text' className='inner-container' value={applicationDataId} onChange={(e) => setApplicationDataId(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='form-element-group' controlId=''>
                        <Form.Label className='form-label'>First Name</Form.Label>
                        <input type='text' className='inner-container' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='form-element-group' controlId=''>
                        <Form.Label className='form-label'>Last Name</Form.Label>
                        <input type='text' className='inner-container' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className='form-element-group' controlId=''>
                        <Form.Label className='form-label'>Application Date</Form.Label>
                        <ReactDatePicker
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            placeholderText={startDate ? `${formatDateToDDMMYYYY(startDate)}- ${formatDateToDDMMYYYY(endDate)}` : ''}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            isClearable={true}
                            onFocus={e => e.target.blur()}
                            dateFormat={"dd/MM/yyyy"}
                            customInput={
                                <Form.Control
                                    size='sm'
                                    type='text'
                                />
                            }
                        />
                    </Form.Group>
                    <Form.Group className='filter-item btn-wrap'>
                        <div className=''>
                            <button onClick={handleApply} className="btn applyFilter">
                                Apply Filter
                            </button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
};

export default SuperAdminFilterApp;