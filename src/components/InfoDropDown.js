import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import PageContent from "../resources/pageContent";

const InfoDropDown = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <span className='session-dd'>
            <Dropdown className='session-dropdown' onMouseLeave={() => setShowDropdown(false)} onMouseOver={() => setShowDropdown(true)}>
                <Dropdown.Toggle id="session">
                    {props.icon ? "+ " + props.icon : <i className='icons info-icon'></i>}
                </Dropdown.Toggle>
                <Dropdown.Menu className='session-dd' show={showDropdown}>
                    <Dropdown.Item className='header-dd' key="ddHeader">{props.header}</Dropdown.Item>
                    {
                        props.options.map((option, index) => {
                            let fIcon = PageContent.FACILITY_ICON_MAP.hasOwnProperty(option) ? PageContent.FACILITY_ICON_MAP[option] : null;
                            return <Dropdown.Item href="#/action-1" key={"ddOption_" + index}>
                                    {props.icon ? <i className={'icons ' + (fIcon !== null ? fIcon : 'boarding-icon')}></i> :''}
                                    {" " + option}
                                </Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </span>
    );
};

export default InfoDropDown;