
// import { response } from 'express';
import { getByDisplayValue } from '@testing-library/dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFlexLayout } from 'react-table';
import TableComponent from '../../../common/TableComponent';
import ToggleSwitch from "../../../common/TriStateToggle";
import { MANAGE_USER_PERMISSION } from "../../../constants/app";
import { humanize } from '../../../utils/helper';
import { getManagePermissions, getManagePermissionRoles, getManagePermissionModules } from '../../../utils/services';
import Layout from '../layout';
import { PasswordDialog } from './passwordDialog';

export const ManageUsers = () => {
  const [managePermissionRole, setManagePermissionRole] = useState({});
  const [managePermissions, setManagePermissions] = useState([]);
  const [rowsData, setRowsData] = useState([]);
  const [tableRowsData, setTableRowsData] = useState([]);
  const [managePermissionModules, setManagePermissionModules] = useState([]);
  const [currentSelectedRole, setCurrentSelectedRole] = useState([]);
  const [check, setCheck] = useState(false);
  const [passWordWindowOpen, setPasswordWindowOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const fetchManagePermissionRoles = () => {
    getManagePermissionRoles()
      .then(response => {
        if (response.status === 200) {
          setManagePermissionRole(response.data);
        }
      })
      .catch(error => console.log(error));
  };

  const fetchManagePermissions = () => {
    getManagePermissions()
      .then(response => {
        if (response.status === 200) {
          setManagePermissions(response.data);
        }
      })
      .catch(error => console.log(error));
  };

  const fetchManagePermissionModules = () => {
    getManagePermissionModules()
      .then(response => {
        setManagePermissionModules(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleManagePermisssion = (rData, index, value, field) => {
    const data = rData.map((val, i) => {
      if (i === index) {
        val[field] = value;
      }
      return val;
    });
    setTableRowsData(data);
  };

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
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageAdmission');
              }}
              inputName={"manageAdmission"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageAdmission}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage Application',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageApplication');
              }}
              inputName={"manageApplication"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageApplication}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage User',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageUser');
              }}
              inputName={"manageUser"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageUser}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage Fee',
      Cell: ((e) => {
        return (
          <div style={{ display: "flex", textAlign: "center", paddingLeft: "10px" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageFee');
              }}
              inputName={"manageFee"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageFee}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: ' ',
      Cell: ((e) => {
        console.log(e.row.original);
        return (
          <div>
            <Button
              type='button'
              disabled={(e.row.original?.roleUsers?.length || 0) === 0}
              onClick={() => {
                setPasswordWindowOpen(true);
                setCurrentSelectedRole(e.row.original?.roleUsers || []);
                setUserId(e.row.original.id);

              }}>Change Password</Button>
          </div>
        );
      })
    }
  ];

  const passWordWindowClose = () => {
    setPasswordWindowOpen(false);
  };

  useEffect(() => {
    fetchManagePermissionModules();
    fetchManagePermissions();
    fetchManagePermissionRoles();
  }, []);

  useEffect(() => {
    const objKeys = Object.keys(managePermissionRole);
    if (objKeys.length > 0) {
      const row = objKeys.map((val) => {
        const id = val;
        const data = {};
        managePermissions.map((value) => {
          if (`${value.roleId}` === `${id}`) {
            data['id'] = value.roleId;
            data['roleName'] = humanize(value.roleName);
            data['roleUsers'] = (value.users);
            //  string.charAt(0).toLowerCase() + string.slice(1)
            data[`${value.moduleName.replace(" ", "").charAt(0).toLowerCase() + value.moduleName.replace(" ", "").slice(1)}`] = value.permissionType;
          }
        });
        return data;
      });
      setRowsData(JSON.parse(JSON.stringify(row)));
      setTableRowsData(JSON.parse(JSON.stringify(row)));
    }
  }, [managePermissionRole, managePermissions]);

  return (
    <>
      <Layout>
        <div className='content-area-inner inner-page-outer'>
          <div className='internal-page-wrapper'>
            <div className='inner-content-wrap padt8'>
              <div className='title-area'>
                <h2>Manage all user credentials</h2>
                <div className='btn-wrapper'>
                  <Button
                    className='reset-btn'
                    onClick={() => {
                      setTableRowsData(JSON.parse(JSON.stringify(rowsData)));
                    }}>
                    Reset
                  </Button>
                  <Button className='save-btn' onClick={() => {
                    console.log(tableRowsData);
                  }}>Save</Button>
                </div>
              </div>
              <div className='table-wrapper' >
                <TableComponent
                  columns={column}
                  data={tableRowsData}
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
        usersData={currentSelectedRole}
        userId={userId}

      />
    </>
  );
};
export default ManageUsers;
