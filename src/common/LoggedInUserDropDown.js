import React, { useState, useEffect, Button } from "react";
import { getLocalData, isLoggedIn, logout } from "../utils/helper";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";
import LoginDialog from "../dialogs/loginDialog";
import CartIcon from "../assets/img/icons/cart-icon.png";
import { useSelector, useDispatch } from "react-redux";
import { getItemsInCart } from "../redux/actions/cartAction";
import emptycartpic from "../assets/img/empty-cart-icon.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}>
        {children}
        &#x25bc;
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) => !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);
// const popover = (
//     <Popover id="popover-cart-list" className='popover cart-list-popover'>
//       <Popover.Header className=''>
//         <div className='left selected-school'>
//           <h2>Selected Schools</h2>
//           <label className='child-name-lbl'>View Child Details</label>
//         </div>
//         <div className='right view-link'><Link>View All</Link></div>

//       </Popover.Header>
//       <Popover.Body>
//         <div className='empty-cart-wrapper'>
//           <div className='pic-frame'><img className='school-logo' variant="left" src={emptycartpic} /></div>
//           <h2>No item added yet!</h2>
//           <h3>You have not seleted any school</h3>
//           <h6>Please check out all available schools to <br/>know details and apply for admission.</h6>

          
//         </div>
      

//         <div className='admission-button'>
//           <Button className='proceed' href="/school-admission">View Schools</Button>
//         </div>
//         <div className='disc-info-block'>
//           <div className="disc-item">Enjoy Discount with code <span className='disc-code'>MYFIRSTADMISSION</span></div>
//         </div>
//       </Popover.Body>
{/* <Popover.Header className=''>
        <div className='left selected-school'>
          <h2>Selected Schools</h2>
          <label className='child-name-lbl'>View Child Details</label>
        </div>
        <div className='right view-link'><Link>View All</Link></div>
      
      <Popover.Body>
        <div className='cart-items-list'>
          <div className='cart-item'>
              <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
              <div className='info-item item-details'>
                  <h2>Maxfort School Cambridge</h2>
                  <h4>Rohini, North West Delhi</h4>
                  <div className='price'>?125</div>
              </div>
              <div className='info-item delete-cart-item'>
                  <Link href=''>
                    <i className='icons cross-icon'></i>
                  </Link>
                </div>  
              
          </div>
          <div className='cart-item'>
              <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
              <div className='info-item'>
                <h2>Maxfort School Cambridge</h2>
                <h4>Rohini, North West Delhi</h4>
                <div className='price'>?125</div>
              </div>
              <div className='info-item delete-cart-item'>
                  <Link href=''>
                    <i className='icons cross-icon'></i>
                  </Link>
                </div>  
          </div>
        </div>
        <div className='item-qprice'>
          <div className='col quantity'>Subtotal <span className='item-num'>(2 Items)</span> </div>
          <div className='col price'>?150.00</div>
        </div>

        <div className='admission-button'>
          <Button className='proceed' href="/school-admission">Proceed For Admission</Button>
        </div>
        <div className='disc-info-block'>
          <div className="disc-item">Enjoy Discount with code <span className='disc-code'>MYFIRSTADMISSION</span></div>
        </div>
      </Popover.Body> */}
//     </Popover>
//   );

// const popover = (
//     <Popover id="popover-cart-list" className='popover cart-list-popover'>
//       <Popover.Header className=''>
//         <div className='left selected-school'>
//           <h2>Selected Schools</h2>
//           <label className='child-name-lbl'>View Child Details</label>
//         </div>
//         <div className='right view-link'><Link>View All</Link></div>
//       </Popover.Header>
//       <Popover.Body>
//         <div className='cart-items-list'>
//           <div className='cart-item'>
//               <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
//               <div className='info-item item-details'>
//                   <h2>Maxfort School Cambridge</h2>
//                   <h4>Rohini, North West Delhi</h4>
//                   <div className='price'>?125</div>
//               </div>
//               <div className='info-item delete-cart-item'>
//                   <Link href=''>
//                     <i className='icons cross-icon'></i>
//                   </Link>
//                 </div>  
              
//           </div>
//           <div className='cart-item'>
//               <div className='info-item school-logo-wrap'><img className='school-logo' variant="left" src={schoolpic01} /> </div>
//               <div className='info-item'>
//                 <h2>Maxfort School Cambridge</h2>
//                 <h4>Rohini, North West Delhi</h4>
//                 <div className='price'>?125</div>
//               </div>
//               <div className='info-item delete-cart-item'>
//                   <Link href=''>
//                     <i className='icons cross-icon'></i>
//                   </Link>
//                 </div>  
//           </div>
//         </div>
//         <div className='item-qprice'>
//           <div className='col quantity'>Subtotal <span className='item-num'>(2 Items)</span> </div>
//           <div className='col price'>?150.00</div>
//         </div>

//         <div className='admission-button'>
//           <Button className='proceed' href="/school-admission">Proceed For Admission</Button>
//         </div>
//         <div className='disc-info-block'>
//           <div className="disc-item">Enjoy Discount with code <span className='disc-code'>MYFIRSTADMISSION</span></div>
//         </div>
//       </Popover.Body>

//     </Popover>
//   );

const LoggedInUserDropDown = () => {
    const dispatch = useDispatch();
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [isLoggedInUser, setIsLoggedInUser] = useState(isLoggedIn());
    const itemsInCart = useSelector((state) => state.cartData.itemsInCart);
    const [totalItemsInCart, setTotalItemsInCart] = useState(0);
    
    useEffect(() => { 
        if (isLoggedInUser)
            dispatch(getItemsInCart());
    }, [dispatch]);
    useEffect(() => {
        let total = 0;
        itemsInCart.childCartItemsList != null && itemsInCart.childCartItemsList.forEach((childCartItem, index) => {
            total += childCartItem.cartItems.length;
        });
        setTotalItemsInCart(total);
    }, [itemsInCart]);

    const handleShowLoginDialog = () => setShowLoginDialog(true);
    const handleCloseLoginDialog = () => {
        setIsLoggedInUser(isLoggedIn());
        setShowLoginDialog(false);
    }

    const logoutUser = () => {
        logout();
        setIsLoggedInUser(isLoggedIn());
        window.location.reload();
    }
    
    return (
        <>
        {
            <div className="header-item cart-profile-wrap">
            { isLoggedInUser ?
                <>
                <div className="cart-num-comp"><Link to="/cart"><span className="cart-img"><img src={CartIcon} alt="Cart" /></span><span className="num-badge">{totalItemsInCart}</span> </Link></div>
                {/* <div className="cart-num-comp">
                                
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="success"><span className="cart-img"><img src={CartIcon} alt="Cart" /></span><span className="num-badge">9</span></Button>
                </OverlayTrigger>
                </div> */}

                    <div className="user-profile">
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-user-profile">Hi <span className='user-name'>{getLocalData("name")}</span></Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    <Dropdown.Item eventKey="1" href="/userProfile">User Profile</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={logoutUser}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div></> 
                : <div className="profile-login"><Link onClick={handleShowLoginDialog}>Sign in/Join us</Link></div>
            }
            </div>
        }
        <LoginDialog show={showLoginDialog} handleClose={handleCloseLoginDialog}/>
        </>
    )
}

export default LoggedInUserDropDown;