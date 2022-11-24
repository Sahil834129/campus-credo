import ListGroup from 'react-bootstrap/ListGroup'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Layout from './layout'

export const Dashboard = () => {
  return (
    <Layout>
      <div className='content-area-inner'>
        <div className='metrics-wrap'>
          <div className='metrics-block mb1'>
            <div className='title-area'>
              <h2>Application Processing </h2>
              <div className='value'>90</div>
            </div>
            <ListGroup className='mlist-group'>
              <ListGroup.Item>
                <div className='mitem-wrap'>
                  <label className='lbl'>Application Approved</label>{' '}
                  <span className='value'>70</span>
                </div>
                <div className='mitem-wrap'>
                  <label className='lbl'>Under Review</label>{' '}
                  <span className='value'>4</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='mitem-wrap'>
                  <label className='lbl'>AT/PI</label>{' '}
                  <span className='value'>10</span>
                </div>
                <div className='mitem-wrap'>
                  <label className='lbl'>Under Final Review</label>{' '}
                  <span className='value'>6</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='metrics-block mb2'>
            <div className='title-area'>
              <h2>All Seats</h2>
              <div className='value'>200</div>
            </div>
            <ListGroup className='mlist-group'>
              <ListGroup.Item>
                <div className='info'>
                  <label>Opening:</label>
                  <span className='value'>200</span>
                </div>
                <ProgressBar variant='success' now={40} />
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='info'>
                  <label>Filled:</label>
                  <span className='value'>80</span>
                </div>
                <ProgressBar variant='warning' now={60} />
              </ListGroup.Item>
              <ListGroup.Item>
                <div className='info'>
                  <label>Vacant:</label>
                  <span className='value'>120</span>
                </div>
                <ProgressBar variant='danger' now={80} />
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className='metrics-block mb3'>
            <div className='title-area'>
              <h2>Application Approved Vs Offers Accepted</h2>
            </div>
            <div className='chart-area'>sdsdsds</div>
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
                    <span className='value'>1200</span>
                    <label>Received</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>180</span>
                    <label>Approved</label>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className='value'>20</span>
                    <label>Declined</label>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
            <div className='chart-area'>dsdsdsd</div>
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
              </div>
            </div>
            <div className='chart-area'>dsdsdsd</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Dashboard
