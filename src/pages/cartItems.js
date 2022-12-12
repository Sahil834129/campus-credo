import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../common/layout';
import { useSelector, useDispatch } from "react-redux";
import { getItemsInCart } from '../redux/actions/cartAction';
import Breadcrumbs from '../common/Breadcrumbs';
import CartItemsGrid from '../components/CartItemsGrid';
import PaymentCard from '../components/PaymentCard';
import RESTClient from '../utils/RestClient';
import RestEndPoint from '../redux/constants/RestEndpoints';
import SchoolCard from '../components/SchoolCard';
import { getChildsList } from '../redux/actions/childAction';
import { isLoggedIn } from '../utils/helper';
import EmptyCart from '../components/EmptyCart';

const ApplicationCart = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cartData.itemsInCart);
  const [selectedChild, setSelectedChild] = useState({id:'', cartItems:[]});
  const childs = useSelector((state) => state.childsData.childs);
  const [similarSchools, setSimilarSchools] = useState([]);
  const selectedLocation = useSelector((state) => state.locationData.selectedLocation)
  const [cartItemsGroupByChild, setCartItemsGroupByChild] = useState({})
  
  useEffect(() => { 
    if (isLoggedIn())
      dispatch(getChildsList());
  }, [dispatch]);

  useEffect(()=> {
    childs.length && handleChildSelection(childs[0].childId);
  }, [childs]);
  
  useEffect(() => { 
    if (isLoggedIn())
      dispatch(getItemsInCart());
    }, [dispatch]);
    
  useEffect(() => {
    let cartItemGrouped = {}
    itemsInCart.childCartItemsList != null && itemsInCart.childCartItemsList.forEach((childCartItem, index) => {
      if (childCartItem.childId === selectedChild.id) {
        setSelectedChild({id: childCartItem.childId, cartItems: childCartItem.cartItems})
      }
      cartItemGrouped[childCartItem.childId] = childCartItem.cartItems
    });
    
    setCartItemsGroupByChild(cartItemGrouped)
  }, [itemsInCart]);

  useEffect(() => { getSimilarSchools() }, []);

  const handleChildSelection = (childId) => {
    if (!itemsInCart.childCartItemsList)
      return
    for (let i=0; i < itemsInCart.childCartItemsList.length; i++) {
      let childCartItem = itemsInCart.childCartItemsList[i];
      if (childCartItem.childId === parseInt(childId)) {
        setSelectedChild({id: childCartItem.childId, cartItems: childCartItem.cartItems});
        return false;
      }
    }
  }

  const getSimilarSchools = async() => {
    try {
      let payload = {filters:[{field:"city",operator:"EQUALS", value:selectedLocation}], offset:1, limit: 2};
      const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, payload) ;
      setSimilarSchools(response.data);
    } catch (e) {}
  }

  
  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner inner-page-container cart-page-wrapper">
          <Row className='content-section bc-section'>
            <Breadcrumbs />
            <Col className='page-container'>
              
              <div className='cart-content-row'>
                <Col className='cell cart-content-area left'>
                <div className='row-wrapper'>
                <label>Select Child<span className='req'>*</span></label>
                <Form.Group className='item-list-container'>
                  {
                    childs.map((c, i) => {
                        return <Form.Check type="radio" 
                          key={"cartChildSelect_"+ i}
                          name="selectChild"
                          value={c.childId}
                          checked={c.childId === selectedChild.id}
                          onChange={e=>handleChildSelection(e.target.value)} 
                          label={c.firstName + " " + c.lastName 
                          + (cartItemsGroupByChild.hasOwnProperty(c.childId) &&  cartItemsGroupByChild[c.childId].length>0 ? ' (' + cartItemsGroupByChild[c.childId].length +')' : '' )}/>
                    })
                  }
                </Form.Group>
              </div>
                  {
                    selectedChild.id !== '' 
                    ? <CartItemsGrid selectedChild={selectedChild} handleChildSelection={handleChildSelection}/>
                    : <EmptyCart/>
                  }
                </Col>
                <Col className='cell right'>
                  <PaymentCard selectedChild={selectedChild}/>
                </Col>
              </div>

              <div className='cart-content-row nearby-title'>
                <h2>You can also apply to following popular school in the same region</h2>
              </div>
              <div className='cart-content-row nearby'>
                <div className='school-list-container'>
                  {
                    similarSchools.length && similarSchools.map((school, index) => (
                      <SchoolCard school={school} key={"similarSchool_" + index} />
                    ))
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}

export default ApplicationCart;