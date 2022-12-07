import { useState } from "react";
import { useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getSchoolAdmissinSummary, getApplicationChartStatus } from "../../utils/services";

import Layout from './layout';
import { Barchart, DoughnutChart } from '../../common/Chart';


export const Dashboard = () => {

  const [dashBoardData, setDashBoardData] = useState({});
  const [applicationStatusChartData, setApplicationStatusChartData] = useState({});
  const [barData, setBarData] = useState({ labels: [], datasets: [] });
  const [appAppVsOffAcc, setAppAppVsOffAcc] = useState({ labels: [], datasets: [] });
  const [chartOptionsValue, setChartOptionsValue] = useState({});


  const fetchSchoolAdmissinSummary = () => {
    getSchoolAdmissinSummary()
      .then((response) => {
        setDashBoardData(response.data);
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
    setBarData({
      labels: labels, datasets: [
        {
          label: "Received",
          data: received,
          backgroundColor: "#41285F",
          borderRadius: 4,
          boxWidth: 12,

        },
        {
          label: "Approved",
          data: approved,
          backgroundColor: "#59D04D",
          borderRadius: 4,
          boxWidth: 12,
        },
        {
          label: "Declined",
          data: declined,
          backgroundColor: "#FF5767",
          borderRadius: 4,
          boxWidth: 12,
        }
      ]
    });
    setAppAppVsOffAcc({
      labels: labels,
      datasets: [
        {
          label: "Application Approved",
          data: approved,
          backgroundColor: "#F7C32E",
          boxWidth: 14,

        },
        {
          label: "Offers Accepted",
          data: accepted,
          backgroundColor: "#4AB900",
          boxWidth: 14,
        },
      ]
    });
    setChartOptionsValue({
      plugins: {
        legend: {
          position: "top",

        },
        title: {
          display: false,
          text: "Class",

        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          title: {
            display: false,
            text: "x axis",
            color: "000000",
          }
        },
        y: {
          grid: {
            display: false
          },
          title: {
            display: false,
            text: "y axis",
            color: "000000",
          }
        }
      }
    }
    );


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
          <div className='metrics-block mb1'>
            <div className='title-area'>
              <h2>Application Processing </h2>
              <div className='value'>{dashBoardData?.applicationProcessing?.totalApplicationProcessing || 0}</div>
            </div>
            <ListGroup className='mlist-group'>
              <ListGroup.Item>
                <div className='mitem-wrap'>
                  <label className='lbl'>Application Approved</label>{' '}
                  <span className='value'>{dashBoardData?.applicationProcessing?.approved || 0}</span>
                </div>
                <div className='mitem-wrap'>
                  <label className='lbl'>Under Review</label>{' '}
                  <span className='value'>{dashBoardData?.applicationProcessing?.underReview || 0}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='mitem-wrap'>
                  <label className='lbl'>AT/PI</label>{' '}
                  <span className='value'>{dashBoardData?.applicationProcessing?.atPi || 0}</span>
                </div>
                <div className='mitem-wrap'>
                  <label className='lbl'>Under Final Review</label>{' '}
                  <span className='value'>{dashBoardData?.applicationProcessing?.underFinalReview || 0}</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='metrics-block mb2'>
            <div className='title-area'>
              <h2>All Seats</h2>
              <div className='value'>{(dashBoardData?.schoolSeatsSummary?.filled + dashBoardData?.schoolSeatsSummary?.vacant) || 0}</div>
            </div>
            <ListGroup className='mlist-group'>
              <ListGroup.Item>
                <div className='info'>
                  <label>Opening:</label>
                  <span className='value'>{dashBoardData?.schoolSeatsSummary?.openingSeats || 0}</span>
                </div>
                <ProgressBar variant='success' now={40} />
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='info'>
                  <label>Filled:</label>
                  <span className='value'>{dashBoardData?.schoolSeatsSummary?.filled || 0}</span>
                </div>
                <ProgressBar variant='warning' now={60} />
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='info'>
                  <label>Vacant:</label>
                  <span className='value'>{dashBoardData?.schoolSeatsSummary?.vacant || 0}</span>
                </div>
                <ProgressBar variant='danger' now={80} />
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='metrics-block mb3'>
            <div className='title-area'>
              <h2>Application Approved Vs Offers Accepted</h2>
            </div>
            <div className='chart-area'>
              <Barchart option={chartOptionsValue} labelsdata={appAppVsOffAcc || []} styling={{ height: '120px', width: '100%' }} />
            </div>
          </div>
        </div>
        <div className='chart-wrap'>
          <div className='chart-block ch1'>
            <div className='title-area'>
              <div className='left-col'>
                <h2>Application Status</h2>
              </div>
              <div className='right-col'>
                <ListGroup className='clist-group'>
                  <ListGroup.Item>
                    <span className='value'>{dashBoardData?.applicationStatus?.received || 0}</span>
                    <label>Received</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>{dashBoardData?.applicationStatus?.approved || 0}</span>
                    <label>Approved</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>{dashBoardData?.applicationStatus?.declined || 0}</span>
                    <label>Declined</label>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className='chart-area'>
              <Barchart labelsdata={barData || []} styling={{ height: '300px', width: '100%' }} />
            </div>
          </div>
          <div className='chart-block ch2'>
            <div className='title-area'>
              <div className='right-col'>
                <ListGroup className='clist-group'>
                  <ListGroup.Item>
                    <span className='value'>200</span>
                    <label>Total Seats</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>1200</span>
                    <label>Application Received</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>₹8500</span>
                    <label>Fee Collected</label>
                  </ListGroup.Item>
                </ListGroup>
                <div style={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '30px' }}>Application Status</div>
              </div>
            </div>
            <table className='chart-area' style={{ padding: 0 }}>
              <tr>
                <td>
                  <DoughnutChart data={{}} />
                </td>
                <td>
                  <DoughnutChart data={{
                    datasets: [
                      {
                        data: [85, 15],
                        backgroundColor: ["#59D04D", "#EEF0F5"],
                        borderRadius: 30,
                        cutout: 90,
                        radius: 80
                      }],
                  } || {}} />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
