
// import { response } from 'express';
import { getByDisplayValue } from '@testing-library/dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFlexLayout } from 'react-table';
import TableComponent from '../../common/TableComponent';
import GenericDialog from '../../dialogs/GenericDialog';
import { humanize } from '../../utils/helper';
import { getManagePermissions, getManagePermissionRoles, getManagePermissionModules } from '../../utils/services';
import Layout from './layout';
import { PasswordDialog } from './PasswordDialog';

export const ManageUsers = () => {
  const [managePermissionRole, setManagePermissionRole] = useState({})
  const [managePermissions, setManagePermissions] = useState([])
  const [managePermissionModules, setManagePermissionModules] = useState([])
  const [check, setCheck] = useState(false)
  const [passWordWindowOpen, setPasswordWindowOpen] = useState(false)
  const [userId, setUserId] = useState(null)

  const fetchManagePermissionRoles = () => {
    getManagePermissionRoles()
      .then(response => {
        if (response.status === 200) {
          setManagePermissionRole(response.data)
        }
      })
      .catch(error => console.log(error))
  }

  const fetchManagePermissions = () => {
    getManagePermissions()
      .then(response => {
        if (response.status === 200) {
          setManagePermissions(response.data)
        }
      })
      .catch(error => console.log(error))
  }

  const fetchManagePermissionModules = () => {
    getManagePermissionModules()
      .then(response => {
        setManagePermissionModules(response.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchManagePermissionModules()
  }, [])

  useEffect(() => {
    fetchManagePermissions()
  }, [])

  useEffect(() => {
    fetchManagePermissionRoles()
  }, [])


  const roleind = Object.keys(managePermissionRole)
  const row = roleind.map((val) => {
    const id = val
    const data = {}
    managePermissions.map((value) => {
      if (`${value.roleId}` === `${id}`) {
        data['id']= value.roleId
        data['roleName'] = humanize(value.roleName);
        data['roleUsers'] = (value.users);
        //  string.charAt(0).toLowerCase() + string.slice(1)
        data[`${value.moduleName.replace(" ", "").charAt(0).toLowerCase() + value.moduleName.replace(" ", "").slice(1)}`] = value.permissionType
      }
    })
    return data
  })
 
  const column = [
    {
      accessor: 'roleName',
      Header: 'User/Role Name',
    },
    {
      accessor: '',
      Header: 'Manage Admission',
      Cell: ((e) => {
        
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }} >
            <Form.Label className='no'>RD</Form.Label>
            <Form.Check
              type='switch'
              checked={(e.row.original.manageAdmission === 'WRITE') ? true : false}
              onChange={(data) => {
                console.log(data)
              }}
            />
            <Form.Label className='yes'>RW</Form.Label>
          </div>
        )
      })
    },
    {
      accessor: '',
      Header: 'Manage Application',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <Form.Label className='no'>RD</Form.Label>
            <Form.Check 
              type='switch' 
              onChange={(data) => {
                console.log(data)
              }}
              checked={(e.row.original.manageApplication === 'WRITE') ? true : false} />
            <Form.Label className='yes'>RW</Form.Label>
          </div>
        )
      })
    },
    {
      accessor: '',
      Header: 'Manage User',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <Form.Label className='no'>RD</Form.Label>
            <Form.Check 
              type='switch'
              onChange={(data) => {
                console.log(data)
              }}
              checked={(e.row.original.manageUser === 'WRITE') ? true : false} />
            <Form.Label className='yes'>RW</Form.Label>
          </div>
        )
      })
    },
    {
      accessor: '',
      Header: 'Manage Fee',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <Form.Label className='no'>RD</Form.Label>
            <Form.Check 
              type='switch' 
              onChange={(data) => {
                console.log(data)
              }}
              checked={(e.row.original.manageFee === 'WRITE') ? true : false} />
            <Form.Label className='yes'>RW</Form.Label>
          </div>
        )
      })
    },
    {
      accessor: '',
      Header: ' ',
      Cell: ((e) => {
        return (
          <div>
            <Button 
              type='button' 
              onClick={() => { 
                setPasswordWindowOpen(true) 
                setUserId(e.row.original.id)

              }}>Change Password</Button>
          </div>
        )
      })
    }
  ]

  const passWordWindowClose = () => {
    setPasswordWindowOpen(false)
  }


  return (
    <>
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
              <div className='table-wrapper' >
                <TableComponent
                  columns={column}
                  data={row}
                  showSelectedAll={false}
                  selectedRows={[]}
                  onSelectedRowsChange={null}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <PasswordDialog
        show={passWordWindowOpen}
        handleClose={passWordWindowClose}
        usersData={row}
        userId={userId}

      />
    </>
  );
};
export default ManageUsers;
