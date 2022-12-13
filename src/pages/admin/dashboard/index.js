import { useState } from "react";
import { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getSchoolAdmissinSummary, getApplicationChartStatus } from "../../../utils/services";

import Layout from '../layout';
import { Barchart, DoughnutChart } from '../../../common/Chart';
import ApplicationProcessing from "./applicationProcessing";
import SeatsDetail from "./seatsDetail";
import ApprovedAcceptedGraph from "./approvedAcceptedGraph";
import ApplicationStatus from "./applicationStatus";
import SeatsFeesGraph from "./seatFeesGraph";


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
        setSchoolSeatsSummary(res?.schoolSeatsSummary || {})
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
      // approved.push(val.approved);
      // accepted.push(val.accepted);
      // declined.push(val.declined);
      // received.push(val.received);
      approved.push(Math.floor(Math.random() * 11) + 1);
      accepted.push(Math.floor(Math.random() * 11) + 1);
      declined.push(Math.floor(Math.random() * 11) + 1);
      received.push(Math.floor(Math.random() * 11) + 1);

    });
    setReceivedOffer(received);
    setDeclinedOffer(declined)
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
      <div className='content-area-inner'>
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
          <SeatsFeesGraph schoolSeatsSummary={schoolSeatsSummary} applicationStatus={dashBoardData?.applicationStatus} acceptedOffer={dashBoardData?.upperSchoolAdmissionSummary}/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
