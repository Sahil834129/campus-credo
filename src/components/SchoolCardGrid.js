import React, { useEffect } from "react";

import { useSelector } from 'react-redux';
import NoRecordsFound from "../common/NoRecordsFound";
import { getLocalData, isEmpty, isLoggedIn } from "../utils/helper";
import SchoolCard from "./SchoolCard";

const SchoolCardGrid = (props) => {
    const defaultLocation = useSelector(
        state => state.locationData.selectedLocation
    )
    const selectedLocation = isLoggedIn() && !isEmpty(getLocalData("selectedLocation")) ? getLocalData("selectedLocation") : defaultLocation;

    useEffect(() => {
    }, [selectedLocation])
    
    return (
        <>
            {/* <div className='title-area'><h2>Schools in {getLocalData("selectedLocation")}</h2></div> */}
            <div className='title-area'><h2>Schools in {selectedLocation}</h2></div>

            <div className='school-list-container'>
                {
                    props.schools.length ?
                        props.schools.map((school, index) => (
                            <SchoolCard school={school} key={"school_" + index}  distanceFilter={props.distanceFilter}/>
                        ))
                        : <NoRecordsFound message={ props.isLoading ? "Loading please wait..." : "No schools found on selected criteria."} />
                }
            </div>

        </>
    );
};

export default SchoolCardGrid;