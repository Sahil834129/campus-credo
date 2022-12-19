import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Layout from './layout'
import { useEffect } from 'react'
import { useState } from 'react'
import {getClassAdmissionSummary, getSchoolClassesData } from '../../utils/services';

import { FilterApp } from './filterApp'

export const ManageApplication = () => {
  const schoolId = 1
  const [schoolClassesData, setSchoolClassesData] = useState([])
  const [admissionData, setAdmisiionData] = useState(null)
  const [classId, setClassId] = useState(null)

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
          <FilterApp 
          schoolClassesData={schoolClassesData}
          classId={classId}
          setClassId={setClassId}
          />
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
