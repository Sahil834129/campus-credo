import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import logoHeader from "../assets/img/brand-logo-header.svg";
import { getSelectedLocation, setGeoLocation, setSelectedLocation } from "../redux/actions/locationAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import { checkIfCityExists, gotoHome, setLocalData } from "../utils/helper";
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
        setLocalData("cities", response.data.listOfCity);
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
    setLocalData("selectedLocation", location);
    dispatch(setSelectedLocation(location));
    navigate("/schools");
  }

  const catchLocationerror = () => {
    let resultCityAfterCheck = checkIfCityExists(cities);
    try {
      if (resultCityAfterCheck) {
        localStorage.removeItem("cityNotFoundPopup");
        dispatch(setSelectedLocation(resultCityAfterCheck));
        setLocalData("selectedLocation", resultCityAfterCheck);
      } else {
        dispatch(setSelectedLocation(cities[0]));
        setLocalData("selectedLocation", cities[0]);
      }
    } catch (error) {
      console.error("Error retrieving location:", error.message);
    }
  };
  async function handleGeoLocation() {
    catchLocationerror();
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
            setSearchItems(response.data.map((school, index) => ({name:school.schoolName, id: index})));
        } catch(e){};
    }
  return (
    
    <nav role="navigation">
        <div className="mob-logo-wrap">
            <Link to='/' onClick={''}><img src={logoHeader} alt="brand logo" /></Link>
        </div>
        <div id="menuToggle"> 
            <input name="toggle" type="checkbox" />
            <label className="toggle-lbl" for="toggle">
                <span>menu</span>
            
                <div></div>
                <div></div>
                <div></div>
            </label>

            <ul id="menu">
                {/* <li className="logo"><Link to='/' onClick={''}><img src={logoHeader} alt="brand logo" /></Link></li> */}
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
                <div className="loc-cartinfo-nav-wrapper">
                    <li className="locations"> 
                        <div className="region-dropdown-wrap">
                            <i className="loc-icon" title="Click to get current location" onClick={() => handleGeoLocation()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>
                            </i>
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
                        </div>
                    </li>
                    <li className="signin"><LoggedInUserDropDown/></li>            
                </div>
                <div className="page-link-wrap">
                    <li className="page-link">
                        <Link onClick={(e) =>
                                gotoHome(e, navigate) 
                            }>Home</Link>
                    </li>
                    <li className="page-link"><Link to="/aboutUs">About Us</Link></li>
                    <li className="page-link"><Link to="/schools">All Schools</Link></li>
                    <li className="page-link"><Link to="/faqs">FAQ's</Link></li>
                    <li className="page-link"><Link to="/contactUs">Contact Us</Link></li>
                </div>
                <div className="contact-info-wrap">
                    <li className="contact-info">+91-9903096754 / support@campuscredo.com</li>
                </div>
            </ul>
        </div>
    </nav>
  );
};
export default MenuBar;