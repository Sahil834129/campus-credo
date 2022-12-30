import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import RESTClient from "../../utils/RestClient";

const ApplicationTimeline = ({ application }) => {
  async function rejectApplication() {
    try {
      await RESTClient.post(RestEndPoint.UPDATE_APPLICATION_STATUS, {
        applicationId: application.applicationId,
        childId: application.childId,
        applicationStatus: "DENIED",
      });
      toast.success('Application status updated successfully.')
    } catch (error) {
      toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }

  return (
    <div className="row-items timeline-wrapper">
      <div className="title-wrap">
        <div className="col">
          <h2>Application Status Timeline</h2>
        </div>
        <div className="col right">
          <Link>
            View your form details <i className="icons arrowright-icon"></i>
          </Link>
        </div>
      </div>
      <div className="timeline-list">
        <ul className="timeline-info-panel">
          {/* <li>
            <div className="date">04 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                Application <span className="status submitted">Submitted</span>
              </div>
            </div>
          </li>
          <li>
            <div className="date">04 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                <strong>Under process</strong>{" "}
                <span className="status submitted">Validation and review</span>
              </div>
            </div>
          </li>
          <li>
            <div className="date">06 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                Sent for final validation to Principle’s office
              </div>
            </div>
          </li>
          <li>
            <div className="date">06 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                Congratulation!!!{" "}
                <span className="status submitted">
                  Application Accepted for Interview
                </span>
              </div>
              <div className="instruction">
                Please contact school admin for interview schedule and admission
                procedures
              </div>
            </div>
          </li>
          <li>
            <div className="date">06 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">Interview Scheduled </div>
              <div className="instruction inst-block">
                <div className="items">
                  <div className="item">Interview Date</div>
                  <div className="item">
                    <div className="inner-section">
                      21 October 2022{" "}
                      <span className="time">10:00 AM - 6:00 PM</span>{" "}
                    </div>
                  </div>
                </div>
                <div className="items">
                  <div className="item">Contact Person</div>
                  <div className="item">
                    <div className="inner-section">Mr. Aritro Mondal </div>
                    <div className="inner-section">
                      P: +91 9456736675 E: admission@orchid.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="date">06 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                Congratulation!!!{" "}
                <span className="status submitted">
                  Application Accepted for Interview
                </span>
              </div>
              <div className="instruction">
                Please contact school admin for interview schedule and admission
                procedures
              </div>
            </div>
          </li> */}
          <li>
            <div className="date">06 Oct 2022</div>
            <div className="indicator">
              <span className="indiShape circle"></span>
            </div>
            <div className="particulars-status">
              <div className="update-info">
                Congratulation!!!{" "}
                <span className="status submitted">
                  Your Application is Approved
                </span>
              </div>
              <div className="instruction">
                Do you want to proceed with Admission?
                <div className="btn-wrapper">
                  <Button
                    type="button"
                    className="accept-btn btn btn-primary"
                    //onClick={() => navigate("/userProfile")}
                  >
                    ACCEPT
                  </Button>
                  <Button
                    type="button"
                    className="decline-btn btn btn-primary"
                    onClick={() => {
                      rejectApplication();
                    }}
                  >
                    REJECT
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApplicationTimeline;
