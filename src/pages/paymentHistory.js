import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import LeftMenuBar from "../common/LeftMenuBar";
import { hideLoader, showLoader } from "../common/Loader";
import OrderLineItems from "../dialogs/OrderLineItems";
import RestEndPoint from "../redux/constants/RestEndpoints";
import PageContent from "../resources/pageContent";
import { humanize } from "../utils/helper";
import RESTClient from "../utils/RestClient";

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
  const downloadInvoice=(id)=>
  {
    console.log(id);
  }
  const CountOrderLineItems =(order)=>
  {
    if(!order.orderLineItems) return "0"
    for(let i=0 ; i < order.orderLineItems.length ; i ++){
        return (i+1);
    }
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
                        <Row className='content-section profile-content-main'>
                            <Col className='left profile-sidebar'>
                                <LeftMenuBar menuItems={PageContent.USER_PROFILE_SIDEBAR_MENU_ITEMS} />
                            </Col>
                            <Col className='profile-content right'>
                                <div className='top-btn-wrap managechild-title'>
                                <h2>Complete Payment History</h2>
                                </div>
                                <div className='manage-child-tbl-outer'>
                                <Table striped bordered hover >
                                <thead>
                                              <tr>
                                                <th>Order Id</th>
                                                <th>Billing Name</th>
                                                 <th>Order Date</th>
                                                 <th>Order Status</th>
                                                <th>Order Type</th>
                                                <th>No of Orders</th>
                                                <th>Order Amount</th>
                                                <th>Fee</th>
                                                <th>GST</th>
                                                <th>Total Amount</th>
                                                <th>Download Invoice</th>
                                             </tr>
                        </thead>
      
                                     <tbody>
                                        {
                                            orders?.map((order, index) => {
                                                return <tr >
                                                    <td>{order.orderId}</td>
                                                    <td><Link onClick={handleShowLineItems}>{order.billingName}</Link></td>
                                                    <td>{order.orderDate}</td>
                                                    <td>{order? humanize(order.orderStatus) : ""}</td>
                                                    <td>{order? humanize(order.orderType) : ""}</td>
                                                    <td>{ CountOrderLineItems(order)}</td>
                                                    <td>{order.orderAmount}</td>
                                                    <td>{order.platformFee}</td>
                                                    <td> {order.tax}</td>
                                                    <td>{order.totalAmount}</td>
                                                   
                                                    <td>
                                                        <div className="btn-wrapper">
                                                            <Button className='edit' onClick={()=> downloadInvoice(order.Id)}>Download Invoice</Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Container>
                <OrderLineItems show={handleShowLineItems} handleClose={handleCloseLineItems}  orderLineItems={orderLineItems}/>
            </section>
        </Layout>
    
  );
}

export default PaymentHistory;