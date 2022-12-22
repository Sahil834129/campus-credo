import Button from 'react-bootstrap/Button';
import { useState, useEffect, forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import moment from "moment";

import TableComponent from "../../../common/TableComponent";
import { FAILED_STATUS, PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS, STATE_TRANSITION, SUCCESS_STATUS } from "../../../constants/app";
import Action from "../../../assets/img/actions.png";
import { humanize } from "../../../utils/helper";
import { getDefaultDateFormat } from "../../../utils/DateUtil";


export default function ShowApplications({ setApplicationStatus, applicationId, setApplicationId, setOpenModal, rowsData, handleBulkStatusUpdate, selectedRows, setSelectedRows, setIsbulkOperation, setShowApplication, setSelectedApplicationId }) {

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <img
      src={Action}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{ cursor: 'pointer' }}
    />
  ));

  const handleDropdownAction = (actionName, appId) => {
    setApplicationStatus(actionName);
    setApplicationId(appId);
    setOpenModal(true);
    setIsbulkOperation(false);
  };

  const columns = [
    {
      accessor: 'applicationId',
      Header: 'Application Id',
    },
    {
      accessor: '',
      Header: 'Applicant’s Name',
      Cell: ((e) => {
        return (
          <a
            href="#"
            onClick={() => {
              setShowApplication(false);
              setSelectedApplicationId(e.row.original?.applicationId);
            }}>
            {`${e.row.original?.firstName} ${e.row.original?.lastName}`}
          </a>
        );
      })
    },
    {
      accessor: 'obtainMarks',
      Header: 'Marks'
    },
    {
      accessor: 'grade',
      Header: 'Grade/GPA'
    },
    {
      accessor: 'mobileNumber',
      Header: 'Mobile Number'
    },
    {
      accessor: 'submissionDate',
      Header: 'Application Date',
      Cell: ((e) => {
        return moment(e.row.original?.submissionDate).format(getDefaultDateFormat());
      })
    },
    {
      accessor: 'applicationStatus',
      Header: 'Application Status',
      Cell: ((e) => {
        const applicationStatus = e.row.original?.applicationStatus;
        if (SUCCESS_STATUS.includes(applicationStatus.toUpperCase())) {
          return <span className="text-success">{humanize(e.row.original?.applicationStatus)}</span>;
        } else if (FAILED_STATUS.includes(applicationStatus.toUpperCase())) {
          return <span className="text-danger">{humanize(e.row.original?.applicationStatus)}</span>;
        } else {
          return <span className="text-info">{humanize(e.row.original?.applicationStatus)}</span>;
        }
      })
    },
    {
      accessor: 'childId',
      Header: '',
      Cell: ((e) => {
        const applicationStatus = e.row.original?.applicationStatus;
        const applicationId = e.row.original?.applicationId;
        const stateTransiton = STATE_TRANSITION[applicationStatus.toUpperCase()];
        return (
          <>
            {stateTransiton.length > 0 && <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                Dropdown Button
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {stateTransiton.map((val, index) => {
                  return (
                    <Dropdown.Item
                      key={`school${index}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDropdownAction(SCHOOL_APPLICATION_STATUS[val], applicationId);
                      }}
                    >
                      {(SUCCESS_STATUS.includes(SCHOOL_APPLICATION_STATUS[val])) && <span className="text-success">{humanize(SCHOOL_APPLICATION_STATUS[val])}</span>}
                      {(FAILED_STATUS.includes(SCHOOL_APPLICATION_STATUS[val])) && <span className="text-danger">{humanize(SCHOOL_APPLICATION_STATUS[val])}</span>}
                      {(!((SUCCESS_STATUS.includes(SCHOOL_APPLICATION_STATUS[val])) || (FAILED_STATUS.includes(SCHOOL_APPLICATION_STATUS[val])))) && <span className="text-info">{humanize(SCHOOL_APPLICATION_STATUS[val])}</span>}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>}
          </>
        );
      })
    }
  ];

  return (
    <div className='inner-content-wrap'>
      <div className='table-wrapper'>
        <TableComponent
          data={rowsData}
          showSelectedAll={true}
          columns={columns}
          selectedRows={selectedRows}
          onSelectedRowsChange={setSelectedRows}
        />
      </div>
      {rowsData.length > 0 && (
        <div className='btn-wrapper'>
          <Button
            className='approval-btn'
            disabled={selectedRows && Object.keys(selectedRows).length === 0}
            onClick={() => {
              handleBulkStatusUpdate(SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW, selectedRows, rowsData);
            }}>
            Send for <strong>FINAL</strong> Approval
          </Button>
          <Button
            className='decline-btn'
            disabled={selectedRows && Object.keys(selectedRows).length === 0}
            onClick={() => {
              handleBulkStatusUpdate(PARENT_APPLICATION_STATUS.DECLINED, selectedRows, rowsData);
            }}>
            Decline Wtih Remarks
          </Button>
          <Button
            className='accept-btn'
            disabled={selectedRows && Object.keys(selectedRows).length === 0}
            onClick={() => {
              handleBulkStatusUpdate(SCHOOL_APPLICATION_STATUS.APPROVED, selectedRows, rowsData);
            }}>
            Approved
          </Button>
        </div>)}
    </div>
  );
}