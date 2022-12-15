import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Layout from './layout'
import { useEffect } from 'react'
import { useState } from 'react'
import {getClassAdmissionSummary, getSchoolClassesData } from '../../utils/services';


export const ManageApplication = () => {
  const schoolId = 1
  const [admissionData, setAdmisiionData] = useState(null)
  const [schoolClassesData, setSchoolClassesData] = useState([])
  const [classId, setClassId] = useState(null)

  const fetchClassAdmissionSummary =(classId)=>{
    getClassAdmissionSummary(classId)
    .then(response =>{
      if (response.status === 200){
      setAdmisiionData(response.data)
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  
  const fetchSchoolClassesData = (schoolId) => {
    getSchoolClassesData(schoolId )
    .then(response=>{
      if (response.status === 200){
        setSchoolClassesData(response?.data)
        setClassId(response?.data[0]?.classId)
        }
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(()=> {
    if (classId !== null){
    fetchClassAdmissionSummary(classId)
    }}, [classId])

  useEffect(()=> {
    fetchSchoolClassesData(schoolId)
  }, [schoolId])

  return (
    <Layout admissionSummary={admissionData?.upperSchoolAdmissionSummary}>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <div className='filterpanel'>
            <div className='filter-head'>
              <span className='filter-title'>
                <i className='icons filter-icon'></i>
                <label>Filters</label>
              </span>
              <Link href=''>Clear All</Link>
            </div>
            <div className='filter-form-area'>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Select Class</Form.Label>
                <Form.Select 
                    value={classId} 
                    onChange={(e) => {
                      setClassId(e.target.value);
                          }}> 
                    {schoolClassesData.map((val) => (
                            <option value={val.classId} >
                              {val.className}
                            </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Age</Form.Label>
                <Form.Select aria-label='Default select example'>
                  <option>Select Age</option>
                  <option value='1'>UKG</option>
                  <option value='2'>LKG</option>
                  <option value='3'>Nursery</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Family Income</Form.Label>
                <div className='inner-container'>
                  <div className='slider-block'>
                    <Form.Range />
                  </div>
                  <div className='input-val-wrapper'>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='0' />
                    </div>
                    <div className='value-cell'>
                      <Form.Label className=''>Max</Form.Label>
                      <Form.Control type='text' placeholder='20L' />
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Marks/Grades/GPA</Form.Label>
                <div className='inner-container'>
                  <div className='options-wrap'>
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      checked
                      label='Marks'
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      label='GPA'
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={e => console.log(e)}
                      label='Grade'
                    />
                  </div>
                  <div className='slider-block'>
                    <Form.Label className='form-label'>Add Marks</Form.Label>
                    <Form.Range />
                  </div>
                  <div className='input-val-wrapper'>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='100' />
                    </div>
                    <div className='value-cell'>
                      <Form.Label className=''>Min</Form.Label>
                      <Form.Control type='text' placeholder='10.0' />
                    </div>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Transport</Form.Label>
                  <div className='radio-choice'>
                    <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Boarding</Form.Label>
                  <div className='radio-choice'>
                    <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' />
                  </div>
                </div>
              </Form.Group>
            </div>
          </div>
          <div className='inner-content-wrap'>
            <div className='table-wrapper'>
              <Table responsive='sm'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
              <Table responsive='md'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
              <Table responsive='lg'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
              <Table responsive='xl'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className='btn-wrapper'>
              <Button className='approval-btn'>
                Send for <strong>FINAL</strong> Approval
              </Button>
              <Button className='decline-btn'>Decline Wtih Remarks</Button>
              <Button className='accept-btn'>Accept</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ManageApplication
