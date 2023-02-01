import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import logoHeader from "../assets/img/brand-logo-header.svg";
import { getSelectedLocation, setSelectedLocation } from "../redux/actions/locationAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import { gotoHome } from "../utils/helper";
import RESTClient from "../utils/RestClient";
import LoggedInUserDropDown from "./LoggedInUserDropDown";


const MenuBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedLocation = useSelector((state) => state.locationData.selectedLocation);

  const pageRef = "/" + location.pathname.split("/")[1];
  
  const [searchItems, setSearchItems] = useState([]);
  const [cities, setCities] = useState([]);

  const handleOnSelect = (item) => {
    navigate("/schools?name="+item.name);
}
const getCities = async() => {
    try {
        const response = await RESTClient.get(RestEndPoint.GET_CITIES);
        setCities(response.data.listOfCity);
    } catch (e) {}
}
const handleOnSearch = (item) => {
    if (item === '')
        navigate("/schools");
}
const LocationDropDownMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');
        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);
const LocationDropDownToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
       <label className="location-lbl">{children}</label>
        {/* &#x25bc; */}
        <i className="icons arrowdown-icon">&nbsp;</i>
    </Link>
));

function handleSelectCity(location) {
    dispatch(setSelectedLocation(location));
    navigate("/schools");
}

    useEffect(()=>{getSchoolData()},[]);
    useEffect(()=>{getCities()},[]);
    useEffect(()=>{dispatch(getSelectedLocation())}, [dispatch]);

    const getSchoolData = async() => {
        let filters = []
        filters.push({
            field: 'city',
            operator: 'EQUALS',
            value: selectedLocation
        })
        try {
            const response = await RESTClient.post(RestEndPoint.FIND_SCHOOLS, {filters:filters});
            setSearchItems(response.data.map(school => ({name:school.schoolName})));
        } catch(e){};
    }
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
                            <li className="search">
                            <div className="search-wrapper">
                        <div className="search-inner">
                            <ReactSearchAutocomplete
                                items={searchItems}
                                onSelect={handleOnSelect}
                                onSearch={handleOnSearch}
                                // styling={{ zIndex: 4 }}
                                placeholder='Search Schools'
                                onFocus={handleOnSearch}
                            />
                        </div>
                    </div>
                                 </li>
                            <li className="locations"> 
                            <Dropdown>
                            <Dropdown.Toggle as={LocationDropDownToggle} id="dropdown-custom-components">
                                {selectedLocation ? selectedLocation : "Select"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={LocationDropDownMenu}>
                                {
                                    cities.map((city, index) => {
                                        return <Dropdown.Item key={"city_"+index} eventKey={"city_e_" + index} onClick={ e => handleSelectCity(city)}>{city ? city : ''}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        </li>
                            <li className="signin"><LoggedInUserDropDown/></li>
                            
                            <li>
                                <Link  onClick={(e) =>
                                        gotoHome(e, navigate) 
                                  }>Home</Link>
                  </li>

                            <li><a href="/aboutUs">About Us</a></li>
                            <li><a href="/schools">All Schools</a></li>
                            <li><a href="/faqs">FAQ's</a></li>
                            <li><a href="/contactUs">Contact Us</a></li>
                            <li className="contact-info">+91-9903096754 / support@campuscredo.com</li>
                        </ul>
                    </div>
                </nav>
  );
};
export default MenuBar;