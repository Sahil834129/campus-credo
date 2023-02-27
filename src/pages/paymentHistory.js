import * as moment from 'moment';
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as DownloadIcon } from "../assets/img/icons/download.svg";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import LeftMenuBar from "../common/LeftMenuBar";
import { hideLoader, showLoader } from "../common/Loader";
import OrderLineItems from "../dialogs/OrderLineItems";
import RestEndPoint from "../redux/constants/RestEndpoints";
import PageContent from "../resources/pageContent";
import { humanize } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import { downloadInvoice } from "../utils/services";

const PaymentHistory=() =>{
   const [orders, setOrders] = useState([{}])
   const [orderLineItems , setOrderLineItems] = useState([{}]);
   const [showLineItems, setShowLineItems] = useState(false);

   const  handleShowLineItems=()=>{ setShowLineItems(true)};
   const  handleCloseLineItems=()=>{ setShowLineItems(false)};


   const dispatch = useDispatch();

   async function getOrdersDetails() {
    try {
        showLoader(dispatch)
      const response = await RESTClient.get(RestEndPoint.GET_PAYMENT_HISTORY);
    setOrders(response.data);
   
    hideLoader(dispatch);
    } catch (error) {}
  }
  async function downloadInvoicePdf(applicationId) {
    downloadInvoice(applicationId);
  }
  const CountOrderLineItems =(order)=>
  {
    if(!order.orderLineItems) return "0"
   return (order.orderLineItems.length);
  }
  useEffect(() => {
    getOrdersDetails();
  }, [])
  
  return (
    <Layout>
            <section className='content-area'>
                <Container className='content-area-inner profile-page-wrap'>
                    <Col className='inner-page-content'>
                        <Row className='content-section profile-bc-section'>
                            <Col className='bc-col'>
                                <Breadcrumbs />
                            </Col>
                        </Row>
                        <div className='content-section profile-content-main'>
                            <Col className='left profile-sidebar'>
                                <Accordion className="sidebar-collapsible" defaultActiveKey={['0']} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Main Categories</Accordion.Header>
                                        <Accordion.Body>
                                            <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Col>
                            <Col className='profile-content right'>
                                <div className='top-btn-wrap managechild-title'>
                                <h2>Complete Payment History</h2>
                                </div>
                                <div className='payment-history-tbl'>
                                <Table striped bordered hover >
                                <thead>
                                              <tr>
                                                <th>Order Id</th>
                                                <th>Payee Name</th>
                                                 <th>Order Date</th>
                                                 <th>Order Status</th>
                                                <th>Order Type</th>
                                                <th>Total Amount</th>
                                                <th>Download Invoice</th>
                                             </tr>
                        </thead>
                             {orders ? (
                                     <tbody>
                                        { 
                                           ( orders?.map((order, index) => {
                                                return <tr >
                                                    <td>{order.orderId}</td>
                                                    <td className='payeename'>
                                                        <Link className="payee" onClick={()=>{
                                                        setOrderLineItems(order.orderLineItems);
                                                        handleShowLineItems();
                                                    }}>
                                                    {order.billingName}
                                                    </Link>
                                                    </td>
                                                    <td>{moment(order.orderDate).format("DD/MM/YYYY")}</td>
                                                    <td>{order? humanize(order.orderStatus) : ""}</td>
                                                    <td>{order? humanize(order.orderType) : ""}</td>
                                                    <td>{order.totalAmount.toLocaleString('en-IN', 
                                                        {   maximumFractionDigits: 2,
                                                            style: 'currency',
                                                            currency: 'INR'
                                                        })
                                                    }</td>
                                                    <td className='download-invoice'>
                                                        <div className="btn-wrap">
                                                        <DownloadIcon className='' style={{marginLeft:"auto",marginRight:"auto"}} onClick={() => downloadInvoicePdf(order.orderId)}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })) 
                                        }
                                    </tbody>) : <tbody className="text-danger col-12 " style={{ textAlign: "center" }}>
                                            No Record Found.
                                          </tbody>}
                                    </Table>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Container>
                <OrderLineItems show={showLineItems} handleClose={handleCloseLineItems}  orderLineItems={orderLineItems}/>
            </section>
        </Layout>
    
  );
}

export default PaymentHistory;