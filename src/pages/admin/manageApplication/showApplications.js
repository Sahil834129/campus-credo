import moment from "moment";
import { forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";

import Action from "../../../assets/img/actions.png";
import TableComponent from "../../../common/TableComponent";
import { PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS, STATE_TRANSITION } from "../../../constants/app";
import { humanize, userCanNotApprove } from "../../../utils/helper";


export default function ShowApplications({ setApplicationStatus, isAtPiData, setApplicationId, setOpenModal, rowsData, handleBulkStatusUpdate, selectedRows, setSelectedRows, setIsbulkOperation, setShowApplication, setSelectedApplicationId, isWritePermission }) {
  const canNotApprove = userCanNotApprove();
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

  const getClassName = (status) => {
    switch (status) {
      case SCHOOL_APPLICATION_STATUS.AT_PI:
        return "violet-label";
      case SCHOOL_APPLICATION_STATUS.RECEIVED:
        return "blue-label";
      case SCHOOL_APPLICATION_STATUS.DECLINED:
      case PARENT_APPLICATION_STATUS.REJECTED:
      case SCHOOL_APPLICATION_STATUS.REVOKED:
      case SCHOOL_APPLICATION_STATUS.DENIED:
        return "red-label";
      case SCHOOL_APPLICATION_STATUS.APPROVED:
      case PARENT_APPLICATION_STATUS.ACCEPTED:
        return "green-label";
      case SCHOOL_APPLICATION_STATUS.UNDER_REVIEW:
      case SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW:
        return "orange-label";
      default:
        return "black-label";
    }
  };

  const columns = [
    {
      accessor: 'applicationId',
      Header: 'Application ID',
    },
    {
      accessor: '',
      Header: 'Applicant Name',
      Cell: ((e) => {
        return (
          <a
            href="#"
            onClick={() => {
              setShowApplication(true);
              setSelectedApplicationId(e.row.original?.applicationId);
            }}>
            <span style={{ color: '#41285F' }}>{`${e.row.original?.firstName} ${e.row.original?.lastName}`}</span>
          </a>
        );
      })
    },
    {
      accessor: '',
      Header: 'Age',
      Cell: ((e) => {
        var years = moment().diff(e.row.original.dateOfBirth, 'years');
        return (
          <span>{years}</span>
        );
      })
    },
    {
      accessor: 'annualFamilyIncome',
      Header: 'Family Income'
    },
    {
      accessor: 'marksInPercentage',
      Header: 'Marks In %'
    },
    {
      accessor: '',
      Header: 'Marks/Grade',
      Cell: ((e) => {
        let marksUnit = e.row.original.marksUnit?.toUpperCase();
        return (
          <span>{marksUnit === 'GRADES' ? e.row.original.grade : e.row.original.obtainMarks}</span>
        );
      })
    },
    {
      accessor: '',
      Header: 'Submission Date',
      Cell: ((e) => {
        return <span>{moment(e.row.original.submissionDate).format('DD/MM/YYYY')}</span>;
      })
    },
    {
      accessor: '',
      Header: 'Notes',
      Cell: ((e) => {
        let notes = [];
        if (e.row.original.anyBackgroundCheck)
          notes.push('backgroundCheckNegative');
        if (e.row.original.anyMedicalDetails)
          notes.push('medicalConditions');
        if (e.row.original.anyExtracurriculars)
          notes.push('extracurricular');
        return (
          <div className="legend-block">
            {
              notes.length ?
                notes.map((note, index) => {
                  return <span className={note} key={'notes_' + index}
                    title={note === 'backgroundCheckNegative' ? 'Has background history' : note === 'medicalConditions' ? 'Has medical condition/disability' : note === 'extracurricular' ? 'Participated state/national/international extracurricular' : ''}
                  >{note.substring(0, 1)}</span>;
                })
                : <span className="none-found">NA</span>
            }
          </div>
        );
      })
    },
    {
      accessor: 'applicationStatus',
      Header: 'Application Status',
      Cell: ((e) => {
        const applicationStatus = e.row.original?.applicationStatus;
        return <span className={getClassName(applicationStatus)}>{humanize(applicationStatus, true)}</span>;
      })
    },
    {
      accessor: 'childId',
      Header: '',
      Cell: ((e) => {
        const applicationStatus = e.row.original?.applicationStatus;
        const applicationId = e.row.original?.applicationId;
        const stateTransiton = STATE_TRANSITION[applicationStatus.toUpperCase()].filter(val => {
          return val !== SCHOOL_APPLICATION_STATUS.AT_PI || isAtPiData;
        });
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

                        if (SCHOOL_APPLICATION_STATUS[val] === SCHOOL_APPLICATION_STATUS.VIEW_APPLICANT_DETAILS) {
                          setShowApplication(true);
                          setSelectedApplicationId(applicationId);
                        } else if (isWritePermission) {
                          e.preventDefault();
                          handleDropdownAction(SCHOOL_APPLICATION_STATUS[val], applicationId);
                        } else {
                          toast.error("Dont have Write Permission");
                        }
                      }}
                    >
                      {<span className={getClassName(SCHOOL_APPLICATION_STATUS[val])}>{humanize(SCHOOL_APPLICATION_STATUS[val], true)}</span>}
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
      <div className='table-wrapper-outer'>
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
            disabled={!isWritePermission || (selectedRows && Object.keys(selectedRows).length !== rowsData.length)}
            onClick={() => {
              handleBulkStatusUpdate(SCHOOL_APPLICATION_STATUS.UNDER_FINAL_REVIEW, selectedRows, rowsData);
            }}>
            Send for Final Approval
          </Button>
          <Button
            className='decline-btn'
            disabled={!isWritePermission || (selectedRows && Object.keys(selectedRows).length === 0)}
            onClick={() => {
              handleBulkStatusUpdate(PARENT_APPLICATION_STATUS.DECLINED, selectedRows, rowsData);
            }}>
            Decline Wtih Remarks
          </Button>
          {canNotApprove && <Button
            className='accept-btn'
            disabled={!isWritePermission || (selectedRows && Object.keys(selectedRows).length === 0)}
            onClick={() => {
              handleBulkStatusUpdate(SCHOOL_APPLICATION_STATUS.APPROVED, selectedRows, rowsData);
            }}>
            Approve
          </Button>}
        </div>)}
    </div>
  );
}