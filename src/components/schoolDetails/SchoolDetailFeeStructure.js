import React from "react";
import Form from 'react-bootstrap/Form';

const SchoolDetailFeeStructure = () => {
    return (
        <>
        <div className='titlebar'>
            <div className='cell left'><h2>Fee Structure</h2></div>
            <Form.Group className='cell right'>
                {/* <label>Select Class</label> */}
                <Form.Select aria-label="Default select example">
                    <option>--Select Class--</option>
                    <option value="1">Child-one</option>
                    <option value="2">Child-two</option>
                    <option value="3">Child-three</option>
                </Form.Select>
            </Form.Group>
        </div>
        <div className='fee-breakup-list'>
            <div className='cell'>
                <div className='left'>Other Fees (Onetime)</div>
                <div className='right'>₹ 275</div>
            </div>
            <div className='cell'>
                <div className='left'>Development Fees (Monthly) </div>
                <div className='right'>₹ 589</div>
            </div>
            <div className='cell'>
                <div className='left'>Annual Fees (Annually)</div>
                <div className='right'>₹ 17000</div>
            </div>
            <div className='cell'>
                <div className='left'>Security Fees (Onetime)</div>
                <div className='right'>₹ 500</div>
            </div>
            <div className='cell'>
                <div className='left'>Tution Fees (Monthly)</div>
                <div className='right'>₹ 4600</div>
            </div>
            <div className='cell'>
                <div className='left'>Admission Fees (Annually)</div>
                <div className='right'>₹ 200</div>
            </div>
            <div className='cell'>
                <div className='left'>Registration Fees (Annually)</div>
                <div className='right'>₹ 25</div>
            </div>
            <div className='cell single-cell'>
                <span className='asterisk redtext'>* </span>
                <span className='disclaimer'>The fees provided above is to the best of our knowledge. Current year's fees might vary, you can get in touch with the school to get more details.</span>
            </div>

        </div>
        </>
    )
}

export default SchoolDetailFeeStructure;