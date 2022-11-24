import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Layout from './layout'

export const ManageUsers = () => {
  return (
    <Layout>
      <div className='content-area-inner inner-page-outer'>
        <div className='internal-page-wrapper'>
          <div className='inner-content-wrap padt8'>
            <div className='title-area'>
              <h2>Manage all user credentials</h2>
              <div className='btn-wrapper'>
                <Button className='reset-btn'>Reset</Button>
                <Button className='save-btn'>Save</Button>
              </div>
            </div>
            <div className='tbl-grid-wrapper'>
              <table className='user-tbl'>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Dashboard</th>
                    <th>Manage Profile</th>
                    <th>Manage Admission</th>
                    <th>Manage Fees</th>
                    <th>Manage Users</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Administrator</td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>RD</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>RW</Form.Label>
                      </div>
                    </td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>RD</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>RW</Form.Label>
                      </div>
                    </td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>RD</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>RW</Form.Label>
                      </div>
                    </td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>RD</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>RW</Form.Label>
                      </div>
                    </td>
                    <td>
                      <div className='switch-wrapper'>
                        <Form.Label className='no'>RD</Form.Label>
                        <Form.Check type='switch' id='custom-switch' label='' />
                        <Form.Label className='yes'>RW</Form.Label>
                      </div>
                    </td>
                    <td>
                      <div className='btn-wrapper'>
                        {' '}
                        <Button className='reset-btn'>Change Password</Button>
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
export default ManageUsers
