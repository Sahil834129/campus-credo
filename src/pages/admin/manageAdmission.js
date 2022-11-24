import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Layout from './layout'

export const ManageAdmission = () => {
  return (
    <Layout>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper'>
          <div className='inner-content-wrap padt8'>
            <div className='title-area'>
              <h2>
                Activate and modify admission status for different classes
              </h2>
              <div className='btn-wrapper'>
                <Button className='reset-btn'>Reset</Button>
                <Button className='save-btn'>Save</Button>
              </div>
            </div>
            <div className='tbl-grid-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Admisssion Open</th>
                    <th>Allocate Seats</th>
                    <th>Application(Start Date - End Date)</th>
                    <th>Parent Interview</th>
                    <th>Candidate Screening Test</th>
                    <th>Application Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lower Kindergarten</td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>No</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>Yes</Form.Label>
                      </div>
                    </td>
                    <td>
                      <Form.Control size='sm' type='text' placeholder='22' />
                    </td>
                    <td>
                      <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Select Date Range'
                      />
                    </td>
                    <td>
                      <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Select Date Range'
                      />
                    </td>
                    <td>
                      <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Select Date Range'
                      />
                    </td>
                    <td>
                      <Form.Control size='sm' type='text' placeholder='₹200' />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default ManageAdmission
