import { useEffect, useState } from 'react';
import { Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import Button from 'react-bootstrap/Button';
import TableComponent from '../../../common/TableComponent';
import ToggleSwitch from "../../../common/TriStateToggle";
import { MANAGE_USER_PERMISSION } from "../../../constants/app";
import { getCurrentModulePermission, getLocalData, getPresentableRoleName ,isEmpty } from '../../../utils/helper';
import { getManagePermissionModules, getManagePermissionRoles, getManagePermissions, updateUserModulePermissions } from '../../../utils/services';
import Layout from '../layout';
import { PasswordDialog } from './passwordChange';

export const ManageUsers = () => {
  const isWritePermission = getCurrentModulePermission("Manage User");
  const currentRole = getLocalData('roles').replace("ROLE_", "");
  const [managePermissionRole, setManagePermissionRole] = useState({});
  const [managePermissions, setManagePermissions] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [tableRowsData, setTableRowsData] = useState([]);
  const [manageModules, setManageModules] = useState([]);
  const [currentSelectedRole, setCurrentSelectedRole] = useState([]);
  const [passWordWindowOpen, setPasswordWindowOpen] = useState(false);

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
        setManageModules(response.data);
      })
      .catch(error => console.log(error));
  };

  const handleManagePermisssion = (rData, index, value, field) => {
    if (isWritePermission) {
      const data = rData.map((val, i) => {
        if (i === index) {
          val[field] = value;
        }
        return val;
      });
      setTableRowsData(data);
    }
  };

  const column = [
    {
      accessor: 'humanizedroleName',
      Header: 'User/Role Name',
    },
    {
      accessor: '',
      Header: 'Manage Admission',
      Cell: ((e) => {
        return (
          <div className='item-cell' style={{ justifyContent: "center", display: "flex" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageAdmission');
              }}
              inputName={"manageAdmission"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageAdmission}
              disabled={!isWritePermission || e.row.original?.roleName === currentRole}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage Application',
      Cell: ((e) => {
        console.log("manageeeeeappp", e)
        const values = e?.row?.original?.manageApplication?.split(',');
        console.log("values", values)
        return (
          <div className='item-cell' style={{ display: 'flex', justifyContent: 'center', padding: '0 10px' }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                const valJoin = [val, values[1]].join(',');
                handleManagePermisssion(tableRowsData, e.row.index, valJoin, 'manageApplication');
              }}
              inputName={"manageApplication"}
              values={MANAGE_USER_PERMISSION}
              selected={!isEmpty(values) ? values[0] : null}
              disabled={!isWritePermission || e.row.original?.roleName === currentRole}
            />
            <div style={{ marginLeft: "10px" }}>
              <Form.Check
                inline
                type="checkbox"
                name="loginWithOTP"
                checked={
                  !isEmpty(values) && values.length >= 2
                    ? values[1] === "APPROVE-Y"
                    : null
                }
                onChange={(ev) => {
                  console.log(ev.target.checked);
                  const valJoin = [values[0], ev.target.checked ? "APPROVE-Y" : "APPROVE-N"].join(',');
                  handleManagePermisssion(tableRowsData, e.row.index, valJoin, 'manageApplication');
                }}
              />
              <label className="lbl">Approve</label>
            </div>
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage User',
      Cell: ((e) => {
        return (
          <div className='item-cell' style={{ justifyContent: "center", display: "flex" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageUser');
              }}
              inputName={"manageUser"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageUser}
              disabled={!isWritePermission || e.row.original?.roleName === currentRole}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: 'Manage Fees',
      Cell: ((e) => {
        return (
          <div className='item-cell' style={{ display: "flex", textAlign: "center", justifyContent: "center", paddingLeft: "10px" }}>
            <ToggleSwitch
              onChangeHandler={(val) => {
                handleManagePermisssion(tableRowsData, e.row.index, val, 'manageFee');
              }}
              inputName={"manageFee"}
              values={MANAGE_USER_PERMISSION}
              selected={e.row.original.manageFee}
              disabled={!isWritePermission || e.row.original?.roleName === currentRole}
            />
          </div>
        );
      })
    },
    {
      accessor: '',
      Header: ' ',
      Cell: ((e) => {
        return (
          <div className='btn-wrapper manageuser-btn'>
            <Button
              type='button'
              disabled={!isWritePermission || (e.row.original?.roleUsers?.length || 0) === 0}
              style={{ backgroundColor: '#549b43' }}
              onClick={() => {
                setPasswordWindowOpen(true);
                setCurrentSelectedRole(e.row.original?.roleUsers || []);
              }}>Change Password</Button>
          </div>
        );
      })
    }
  ];

  const passWordWindowClose = () => {
    setPasswordWindowOpen(false);
  };

  const convertCamelCase = (moduleName) => {
    return `${moduleName.replace(" ", "").charAt(0).toLowerCase() + moduleName.replace(" ", "").slice(1)}`;
  };

  const saveModulePermissions = (tableData) => {
    let preparedSaveData = tableData.map(val => {
      const data = {
        roleId: val.roleId,
        roleName: val.roleName,
      };
      const modulePermissions = manageModules.map(value => {
        return {
          ...data,
          moduleName: value,
          permissionType: val[convertCamelCase(value)] || "NONE",
          id: val[convertCamelCase(value) + "Id"],
        };
      });
      return modulePermissions;
    });
    preparedSaveData = preparedSaveData.flat();
    updateUserModulePermissions(preparedSaveData)
      .then(response => {
        if (response.status === 200) {
          setManagePermissions(preparedSaveData);
          toast("All Roles Permissions are saved");
        }
      });
  };


  useEffect(() => {
    setIsloading(true);
    fetchManagePermissionModules();
    fetchManagePermissions();
    fetchManagePermissionRoles();
  }, []);

  useEffect(() => {
    const objKeys = Object.keys(managePermissionRole);
    if (objKeys.length > 0) {
      const row = objKeys.map((val) => {
        const id = +val;
        const data = {};
        managePermissions.map((value) => {
          if (value.roleId === id) {
            data.roleId = value.roleId;
            data.roleName = value.roleName;
            data.humanizedroleName = getPresentableRoleName(value.roleName);
            data.roleUsers = value.users;
            data.moduleName = value.moduleName;
            data.permissionType = value.permissionType;
            data[convertCamelCase(value.moduleName)] = value.permissionType;
            data[convertCamelCase(value.moduleName) + "Id"] = value.id;
          }
        });
        return data;
      });
      setRowsData(JSON.parse(JSON.stringify(row)));
      setTableRowsData(JSON.parse(JSON.stringify(row)));
      setIsloading(false);
    } else {
      setRowsData([]);
      setTableRowsData([]);
    }
  }, [managePermissionRole, managePermissions]);

  return (
    <>
      <Layout>
        <div className='content-area-inner inner-page-outer'>
          {!isLoading && <div className='internal-page-wrapper'>
            <div className='inner-content-wrap padt8'>
              <div className='title-area'>
                <h2>Manage all user credentials</h2>
                <div className='btn-wrapper'>
                  <Button
                    className='reset-btn'
                    disabled={!isWritePermission}
                    onClick={() => {
                      setTableRowsData(JSON.parse(JSON.stringify(rowsData)));
                    }}>
                    Reset
                  </Button>
                  <Button className='save-btn' disabled={!isWritePermission} onClick={() => saveModulePermissions(tableRowsData)}>Save</Button>
                </div>
              </div>
              <div className='table-wrapper' >
                <TableComponent
                  manageModules={manageModules}
                  columns={column}
                  data={tableRowsData}
                  showSelectedAll={false}
                  selectedRows={[]}
                  onSelectedRowsChange={null}
                />
              </div>
            </div>
          </div>}
          {isLoading && <div style={{ margin: '50px auto', width: '100%', textAlign: 'center' }}><Spinner animation="border" /></div>}
        </div>
      </Layout>
      <PasswordDialog
        show={passWordWindowOpen}
        handleClose={passWordWindowClose}
        usersData={currentSelectedRole}
      />
    </>
  );
};
export default ManageUsers;
