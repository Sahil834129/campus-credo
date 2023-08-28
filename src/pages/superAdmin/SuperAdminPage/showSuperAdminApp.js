import { useEffect, useState } from "react";
import TableComponent from "../../../common/TableComponent"
import moment from "moment";
import { PARENT_APPLICATION_STATUS, SCHOOL_APPLICATION_STATUS } from "../../../constants/app"
import { getStatusLabelForSchool } from "../../../utils/helper"
import eyeFill from "../../../assets/img/eye-fill.svg"
import ApplicationTimeline from "../../../components/userProfile/ApplicationTimeline";
import Col from "react-bootstrap/Col";
import { Accordion } from "react-bootstrap";
import GenericDialog from "../../../../src/dialogs/GenericDialog"


const ShowSuperAdminApp = ({rowsData, setActivePage, totalRows, activePage}) => {
  const [selectedRows, setSelectedRows] = useState({});
  const [showTimeLine, setShowTimeLIne] = useState(false)
  const [timeLineData, setTimeLineData] = useState({})

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
      accessor: 'applicationNumber',
      Header: 'Application ID',
    },
    {
      accessor: '',
      Header: 'Applicant Name',
      Cell: ((e) => {
        return (
          <div>
            <span style={{ color: '#41285F' }}>{`${e.row.original?.firstName} ${e.row.original?.lastName}`}</span>
          </div>
        );
      })
    },
    {
      accessor: 'mobileNumber',
      Header: 'Mobile Number',
    },
    {
      accessor: '',
      Header: 'Application Date',
      Cell: ((e) => {
        return <span>{moment(e.row.original.submissionDate).format('DD/MM/YYYY')}</span>;
      })
    },
    {
      accessor: 'schoolName',
      Header: 'School Name',
    },
    {
      accessor: 'className',
      Header: 'Class Name',
    },
    {
      accessor: 'admissionSession',
      Header: 'Admission Session',
    },
    {
      accessor: 'applicationStatus',
      Header: 'Application Status',
      Cell: ((e) => {
        const applicationStatus = e.row.original?.applicationStatus;
        return <span className={getClassName(applicationStatus)}>{getStatusLabelForSchool(applicationStatus)}</span>;
      })
    },
    {
      accessor: '',
      Header: 'TimeLine',
      Cell: ((e) => {
        const data = e.row.original
        return <button onClick={(e) => { e.preventDefault(); handleView(data) }}> <img src={eyeFill} /> </button>
      }),
    }
  ];

  const handleView = (data) => {
    setTimeLineData(data)
    setShowTimeLIne(!showTimeLine)
  }

 

  return (
    <>
      <div className='inner-content-wrap'>
        <div className='table-wrapper-outer'>
          <TableComponent
            columns={columns}
            data={rowsData}
            showSelectedAll={false}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            isPagination={true}
            setActivePage={setActivePage} 
            totalRows={totalRows} 
            activePage={activePage}
          />
          <GenericDialog className="review-admission-modal add-child-model"
            show={showTimeLine}
            handleClose={() => setShowTimeLIne(false)}
            modalHeader=""
          >
            <Accordion >
              <Accordion.Item>
                <Accordion.Body>
                  <Col className="right content">
                    <div className="row-items application-block">
                      <div className="application-row">
                        <ApplicationTimeline application={timeLineData} setApplications={setTimeLineData} setShowTimeline={showTimeLine} />
                      </div>
                    </div>
                  </Col>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </GenericDialog>
        </div>
      </div>

    </>
  )
}
export default ShowSuperAdminApp