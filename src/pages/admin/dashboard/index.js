import { useEffect, useState } from "react";
import { getApplicationChartStatus, getSchoolAdmissinSummary } from "../../../utils/services";

import Layout from '../layout';
import ApplicationProcessing from "./applicationProcessing";
import ApplicationStatus from "./applicationStatus";
import ApprovedAcceptedGraph from "./approvedAcceptedGraph";
import SeatsFeesGraph from "./seatFeesGraph";
import SeatsDetail from "./seatsDetail";


export const Dashboard = () => {

  const [dashBoardData, setDashBoardData] = useState({});
  const [schoolSeatsSummary, setSchoolSeatsSummary] = useState({});
  const [applicationStatusChartData, setApplicationStatusChartData] = useState({});
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [labels, setLabels] = useState([]);

  const [acceptedOffer, setAcceptedOffer] = useState([]);
  const [receivedOffer, setReceivedOffer] = useState([]);
  const [declinedOffer, setDeclinedOffer] = useState([]);

  const [applicationApproved, setApplicationApproved] = useState([]);


  const fetchSchoolAdmissinSummary = () => {
    getSchoolAdmissinSummary()
      .then((response) => {
        const res = response.data;
        setDashBoardData(res);
        setSchoolSeatsSummary(res?.schoolSeatsSummary || {});
      })
      .catch((err) => {
        console.log(err);
      });

  };

  const fetchApplicationChartStatus = () => {
    getApplicationChartStatus()
      .then(response => {
        setApplicationStatusChartData(response.data);
      });

  };

  const getBarDataValues = (tempData) => {
    const labels = Object.keys(tempData);
    const approved = [];
    const accepted = [];
    const declined = [];
    const received = [];
    labels.map(val => {
      approved.push(tempData[val]?.approved);
      accepted.push(tempData[val]?.accepted);
      declined.push(tempData[val]?.declined);
      received.push(tempData[val]?.received);
    });
    setReceivedOffer(received);
    setDeclinedOffer(declined);
    setLabels(labels);
    setAcceptedOffer(accepted);
    setApplicationApproved(approved);
  };

  useEffect(() => {
    if (applicationStatusChartData?.applicationReceivedAcceptedApprovedDeclined) {
      const tempData = applicationStatusChartData?.applicationReceivedAcceptedApprovedDeclined;
      getBarDataValues(tempData);
    }
  }, [applicationStatusChartData?.applicationReceivedAcceptedApprovedDeclined]);

  useEffect(() => {
    fetchApplicationChartStatus();
  }, []);

  useEffect(() => {
    fetchSchoolAdmissinSummary();
  }, []);


  return (
    <Layout admissionSummary={dashBoardData?.upperSchoolAdmissionSummary}>
      <div className='content-area-inner dashboard-wrapper'>
        <div className='metrics-wrap'>
          <ApplicationProcessing applicationProcessing={dashBoardData?.applicationProcessing} />
          <SeatsDetail schoolSeatsSummary={schoolSeatsSummary} />
          <ApprovedAcceptedGraph acceptedOffer={acceptedOffer} applicationApproved={applicationApproved} labels={labels} />
        </div>
        <div className='chart-wrap'>
          <ApplicationStatus
            labels={labels}
            received={receivedOffer}
            approved={applicationApproved}
            declined={declinedOffer}
            applicationStatus={dashBoardData?.applicationStatus}
          />
          <SeatsFeesGraph schoolSeatsSummary={schoolSeatsSummary} applicationStatus={dashBoardData?.applicationStatus} acceptedOffer={dashBoardData?.upperSchoolAdmissionSummary} />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
