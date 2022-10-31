import React, { useState, useEffect } from "react";
import { getLocalData, isLoggedIn, logout } from "../utils/helper";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from "react-router-dom";
import LoginDialog from "../dialogs/loginDialog";
import CartIcon from "../assets/img/icons/cart-icon.png";
import { useSelector, useDispatch } from "react-redux";
import { getItemsInCart } from "../redux/actions/cartAction";

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
    }
    
    return (
        <>
        {
            <div className="header-item cart-profile-wrap">
            { isLoggedInUser ?
                <><div className="cart-num-comp"><Link to="/cart"><span className="cart-img"><img src={CartIcon} alt="Cart" /></span><span className="num-badge">{totalItemsInCart}</span> </Link></div><div className="user-profile">
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="dropdown-user-profile">Hi <span className='user-name'>{getLocalData("name")}</span></Dropdown.Toggle>
                                <Dropdown.Menu as={CustomMenu}>
                                    <Dropdown.Item eventKey="1"><Link to="/userProfile">User Profile</Link></Dropdown.Item>
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