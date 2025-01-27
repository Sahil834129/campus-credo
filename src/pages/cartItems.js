import React, { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../common/Breadcrumbs";
import Layout from "../common/layout";
import CartItemsGrid from "../components/CartItemsGrid";
import EmptyCart from "../components/EmptyCart";
import PaymentCard from "../components/PaymentCard";
import SchoolCard from "../components/SchoolCard";
import { getItemsInCart } from "../redux/actions/cartAction";
import { getChildsList } from "../redux/actions/childAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { getLocalData, isEmpty, isLoggedIn } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import UserLocationNotSavedDialog from "../dialogs/userLocationNotSavedDialog";

const ApplicationCart = () => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cartData.itemsInCart);
  const [selectedChild, setSelectedChild] = useState({ id: "", cartItems: [] });
  const childs = useSelector((state) => state.childsData.childs);
  const [similarSchools, setSimilarSchools] = useState([]);
  const selectedLocation = useSelector(
    (state) => state.locationData.selectedLocation
  );
  const [cartItemsGroupByChild, setCartItemsGroupByChild] = useState({});

  useEffect(() => {
    if (isLoggedIn()) dispatch(getChildsList());
  }, [dispatch]);

  useEffect(() => {
    if(childs.length){
      if(selectedChild && selectedChild.id)
        return
      handleChildSelection(childs[0].childId);
    }
  }, [childs]);

  useEffect(() => {
    if (isLoggedIn()) dispatch(getItemsInCart());
  }, [dispatch]);

  useEffect(() => {
    let cartItemGrouped = {};
    let childCartItemUpdate = false;
      itemsInCart.childCartItemsList != null &&
        itemsInCart.childCartItemsList.forEach((childCartItem, index) => {
          if (!childCartItemUpdate && (childCartItem.childId === selectedChild.id || (selectedChild.cartItems.length === 0 && childCartItem.cartItems.length > 0))) {
            setSelectedChild({
              id: childCartItem.childId,
              cartItems: childCartItem.cartItems,
            });
            childCartItemUpdate=true;
            handleChildSelection(childCartItem.childId);
          }
          cartItemGrouped[childCartItem.childId] = childCartItem.cartItems;
        });
    setCartItemsGroupByChild(cartItemGrouped);
  }, [itemsInCart]);

  useEffect(() => {
    getPopularSchool();
  }, []);

  const handleChildSelection = (childId) => {
    if (!itemsInCart.childCartItemsList) return;
    for (let i = 0; i < itemsInCart.childCartItemsList.length; i++) {
      let childCartItem = itemsInCart.childCartItemsList[i];
      if (childCartItem.childId === parseInt(childId)) {
          setSelectedChild({
          id: childCartItem.childId,
          cartItems: childCartItem.cartItems,
        });
        return false;
      }
    }
  };

  const getPopularSchool = useCallback(async childId => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.POPULAR_SCHOOL + `/${selectedLocation}`
      )
      if(response.data!==""){
        setSimilarSchools(response.data.slice(1,4));
      }
    } catch (error) {
      // toast.error(RESTClient.getAPIErrorMessage(error))
    }
  }, [])

  return (
    <Layout>
      <section className="content-area">
        <Container className="content-area-inner inner-page-container cart-page-wrapper">
          <Col className="inner-page-content">  
            <Row className="content-section profile-bc-section">
              <Col className="bc-col">
                <Breadcrumbs />
              </Col>
            </Row>
            <div className="content-section cart-content-main">
           
              <Col className="page-container">
                <div className="cart-content-row">
                  <Col className="cell cart-content-area left">
                    <div className="row-wrapper select-child-wrapper">
                      <label>
                        Select Child<span className="req">*</span>
                      </label>
                      
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => handleChildSelection(e.target.value)}
                        value={selectedChild.id}
                      >
                        {!isEmpty(childs) ? (childs.map((c, i) => (
                          <option
                            key={"cartChildSelect_" + i}
                            name="selectChild"
                            value={c.childId}
                          >
                            {c.firstName +
                              " " +
                              c.lastName +
                              (cartItemsGroupByChild.hasOwnProperty(c.childId) &&
                              cartItemsGroupByChild[c.childId].length > 0
                                ? " (" +
                                  cartItemsGroupByChild[c.childId].length +
                                  ")"
                                : "")}
                          </option>
                        ))):<option>--Select Child--</option>}
                      </Form.Select>
                    </div>
                    {selectedChild.id !== "" ? (
                      <CartItemsGrid
                        selectedChild={selectedChild}
                        handleChildSelection={handleChildSelection}
                      />
                    ) : (
                      <EmptyCart />
                    )}
                  </Col>
                  <Col className="cell right">
                    <PaymentCard selectedChild={selectedChild} />
                  </Col>
                </div>
                <div className="cart-content-row nearby-title">
                  <h2>
                    You can also apply to following popular school in the same
                    region
                  </h2>
                </div>
                <div className="cart-content-row nearby">
                  <div className="school-list-container">
                    {similarSchools.length &&
                      similarSchools.map((school, index) => (
                        <SchoolCard
                          school={school}
                          key={"similarSchool_" + index}
                        />
                      ))}
                  </div>
                </div>
              </Col>

            </div>

          </Col>
        </Container>
        {isLoggedIn && isEmpty(getLocalData("userLocation"))  &&  <UserLocationNotSavedDialog />}
      </section>
    </Layout>
  );
};

export default ApplicationCart;