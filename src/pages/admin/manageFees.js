import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import { getCurrentModulePermission } from '../../utils/helper'
import Layout from './layout'

export const ManageFees = () => {
  const isWritePermission = getCurrentModulePermission("Manage Admission");

  return (
    <Layout>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper two-columns'>
          <div className='filterpanel sidenav'>
            <Nav defaultActiveKey='default' className='flex-column'>
              <Nav.Link eventKey='default'>Tuition Fees</Nav.Link>
              <Nav.Link eventKey='link-1'>Other Fees</Nav.Link>
              <Nav.Link eventKey='link-2'>Offline Payments</Nav.Link>
              <Nav.Link eventKey='link-3'>Reports</Nav.Link>
              {/* <Nav.Link eventKey="link-3" disabled>Reports</Nav.Link> */}
            </Nav>
          </div>
          <div className='inner-content-wrap'>
            <div className='title-area'>
              <h2>Configure Tuition Fees Payment</h2>
              <div className='btn-wrapper'>
                <Button className='reset-btn'   disabled={!isWritePermission}>Reset</Button>
                <Button className='save-btn'>Save</Button>
              </div>
            </div>
            <div className='tbl-grid-wrapper'>
              <table className='user-tbl'>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Tuition Fees(₹)</th>
                    <th>Payment Frequency</th>
                    <th>Last Date of Payment</th>
                    <th>Late Fine Per day(₹)</th>
                    <th>Late Fees Final Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Form.Control
                        type='text'
                        disabled
                        placeholder='Toddler'
                      />
                    </td>
                    <td>
                      <Form.Control type='num' disabled={!isWritePermission} placeholder='₹1000' />
                    </td>
                    <td>
                      <Form.Control type='num' disabled={!isWritePermission} placeholder='₹1000' />
                    </td>
                    <td>
                      <Form.Control type='num' disabled={!isWritePermission} placeholder='₹1000' />
                    </td>
                    <td>
                      <Form.Control type='num'disabled={!isWritePermission} placeholder='₹1000' />
                    </td>
                    <td>
                      <Form.Control type='num' disabled={!isWritePermission} placeholder='₹1000' />
                    </td>
                    <td>
                      <div className='btn-wrapper'>
                        {' '}
                        <Button className='add-btn'>
                          <i className='icons addnew-icon'></i>
                        </Button>
                        <Button className='del-btn'>
                          <i className='icons delete-icon'></i>
                        </Button>
                      </div>
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
export default ManageFees
