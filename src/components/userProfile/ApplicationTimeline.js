import { SCHOOL_APPLICATION_STATUS } from "../../constants/app";
import { APPLICATION_STATUS_MESSAGE } from "../../constants/formContanst";
import { formatDateToDDMMYYYY } from "../../utils/DateUtil";
import { humanize } from "../../utils/helper";
import ApprovedMessage from "./ApprovalMessage";

const ApplicationTimeline = ({
  application,
}) => {

  function getApplicationStatusMessage(history, index) {
    const status = history.applicationStatus;
    let message = APPLICATION_STATUS_MESSAGE[status]
      ? APPLICATION_STATUS_MESSAGE[status]
      : humanize(status);
    if (status.toUpperCase() === SCHOOL_APPLICATION_STATUS.AT_PI) {
      message = message.replace(
        "<AT/PI timeslot>",
        history.applicantATPITimeSlot
      );
    }
    if (application.applicationStatus === SCHOOL_APPLICATION_STATUS.APPROVED
      && history?.applicationStatus?.toUpperCase() === SCHOOL_APPLICATION_STATUS.APPROVED
      && index === application.applicationDataHistory.length - 1) {
      return <ApprovedMessage />;
    }
    return message;
  }

  return (
    <>
      <div className="row-items timeline-wrapper">
        <div className="title-wrap">
          <div className="col">
            <h2>Application Status Timeline</h2>
          </div>
        </div>
        {application.applicationDataHistory?.length ? (
          <div className="timeline-list">
            <div className="timeline-info-panel">
              {application.applicationDataHistory.map((history, index) => {
                return (
                  <div className="timeline-row" key={"timeline_" + index}>
                    <div className="date">
                      {formatDateToDDMMYYYY(new Date(history.updatedDate))}
                    </div>
                    <div className="indicator">
                      <span className="indiShape circle"></span>
                    </div>
                    <div>{getApplicationStatusMessage(history, index)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ margin: "15px", textAlign: "center" }}>
            No Record Found.
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicationTimeline;
