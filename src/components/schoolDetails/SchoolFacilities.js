import React, {useState, useEffect} from "react";
import Accordion from 'react-bootstrap/Accordion';

const SchoolFacilities = (props) => {
    return (
        <>
        <h2>Facilities</h2>
        <Accordion defaultActiveKey="0" flush>
        {
            Object.entries(props.schoolCategoryFacilitiesMap).map(([key,values],index)=>{
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
        </Accordion>
        </>
    )
}

export default SchoolFacilities;