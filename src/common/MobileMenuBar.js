import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoHeader from "../assets/img/brand-logo-header.svg";


const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = "/" + location.pathname.split("/")[1];

  return (
    
    <nav role="navigation">
                    <div id="menuToggle"> 
                        <input name="toggle" type="checkbox" />
                        <label for="toggle">
                            <span>menu</span>
                        
                            <div></div>
                            <div></div>
                            <div></div>
                        </label>

                        <ul id="menu">
                            <li className="logo"><Link to='/' onClick={''}><img src={logoHeader} alt="brand logo" /></Link></li>
                            <li className="search">Search Field</li>
                            <li className="locations">Loction drop down</li>
                            <li className="signin"><a href="">Sign In/Join In</a></li>
                            
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">All Schools</a></li>
                            <li><a href="#">FAQ's</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li className="contact-info">+91-9903096754 / support@campuscredo.com</li>
                        </ul>
                    </div>
                </nav>
  );
};
export default MenuBar;