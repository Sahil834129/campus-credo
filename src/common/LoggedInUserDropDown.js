import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../assets/img/icons/cart-icon.png";
import LoginDialog from "../dialogs/loginDialog";
import { getItemsInCart } from "../redux/actions/cartAction";
import { getChildsList } from "../redux/actions/childAction";
import { setIsUserLoggedIn } from "../redux/actions/userAction";
import { ActionTypes } from "../redux/constants/action-types";
import { getLocalData, isLoggedIn, logout } from "../utils/helper";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const LoggedInUserDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const itemsInCart = useSelector((state) => state.cartData.itemsInCart);
  const isLoggedInUser = useSelector((state) => state.userData.isLoggedInUser);
  const [totalItemsInCart, setTotalItemsInCart] = useState(0);
  const childsList = useSelector((state) => state.childsData.childs);

  useEffect(() => {
    dispatch(setIsUserLoggedIn(isLoggedIn()));
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedInUser && isLoggedIn()) {
      dispatch(getItemsInCart());
      if (childsList.length === 0) dispatch(getChildsList());
    }
  }, [dispatch, isLoggedInUser]);
  useEffect(() => {
    let total = 0;
    itemsInCart.childCartItemsList != null &&
      itemsInCart.childCartItemsList.forEach((childCartItem, index) => {
        total += childCartItem.cartItems.length;
      });
    setTotalItemsInCart(total);
  }, [itemsInCart]);

  const handleShowLoginDialog = () => setShowLoginDialog(true);
  const handleCloseLoginDialog = () => {
    dispatch(setIsUserLoggedIn(isLoggedIn()));
    setShowLoginDialog(false);
  };

  const logoutUser = () => {
    logout();
    dispatch(setIsUserLoggedIn(isLoggedIn()));
    dispatch({ type: ActionTypes.LOGOUT });
    navigate("/");
  };

  return (
    <>
      {
        <div className="header-item cart-profile-wrap">
          {isLoggedInUser ? (
            <>
              <div className="cart-num-comp">
                <Link to="/selectedSchools">
                  <span className="cart-img">
                    <img src={CartIcon} alt="Selected Schools" />
                  </span>
                  <span className="num-badge">{totalItemsInCart}</span>{" "}
                </Link>
              </div>
              {/* <div className="cart-num-comp">
                                
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="success"><span className="cart-img"><img src={CartIcon} alt="Cart" /></span><span className="num-badge">9</span></Button>
                </OverlayTrigger>
                </div> */}

              <div className="user-profile">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-user-profile">
                    Hi <span className="user-name">{getLocalData("name")}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1" href="/userProfile">
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={logoutUser}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </>
          ) : (
            <div className="profile-login">
              <Link onClick={handleShowLoginDialog}>Sign In/Join Us</Link>
            </div>
          )}
        </div>
      }
      <LoginDialog
        show={showLoginDialog}
        handleClose={handleCloseLoginDialog}
      />
    </>
  );
};

export default LoggedInUserDropDown;
