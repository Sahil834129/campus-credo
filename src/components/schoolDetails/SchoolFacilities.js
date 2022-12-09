import React, {useState, useEffect} from "react";
import Accordion from 'react-bootstrap/Accordion';
import PageContent from "../../resources/pageContent";

const SchoolFacilities = ({schoolCategoryFacilitiesMap}) => {
    return (
        <>
        <h2>Facilities</h2>
        
        {
            Object.entries(schoolCategoryFacilitiesMap).map(([key,values],index)=>{
                return (
                    <div className="facility-row" key={"featureHeader_"+index}>
                        <h2>{key}</h2>
                        <ul>
                            {
                               values.map((value, i) => {
                                    let fIcon = PageContent.FACILITY_ICON_MAP.hasOwnProperty(value) ? PageContent.FACILITY_ICON_MAP[value] : null;
                                    return <li key={"featureName_"+i}><i className={'icons ' + (fIcon !== null ? fIcon : 'boarding-icon')}></i><label>{value}</label></li>
                               })
                            }
                        </ul>
                    </div>
                )
            })
        }
        {/* <Accordion defaultActiveKey="0" flush>
        {
            Object.entries(schoolCategoryFacilitiesMap).map(([key,values],index)=>{
                return (
                <Accordion.Item eventKey={index} key={"feature_"+index}>
                    <Accordion.Header key={"featureHeader_"+index}>{key}</Accordion.Header>
                    <Accordion.Body>
                        <div className='horizontal-list'>
                        {
                            values.map((value,i) => {
                                return (<div className='cell' key={"featureName_"+i}><i className='icons check-icon'></i> <label>{value}</label></div>)
                            })
                            
                        }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                )
            })
        }
        </Accordion> */}
        </>
    )
}

export default SchoolFacilities;