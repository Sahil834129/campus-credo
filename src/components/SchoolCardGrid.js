import React from "react";

import SchoolCard from "./SchoolCard";
import NoRecordsFound from "../common/NoRecordsFound";
import { useSelector } from 'react-redux'

const SchoolCardGrid = (props) => {
    const selectedLocation = useSelector(
        state => state.locationData.selectedLocation
    )
    return (
        <>
            <div className='title-area'><h2>Schools in {selectedLocation}</h2></div>
            <div className='school-list-container'>
                {
                    props.schools.length ?
                        props.schools.map((school, index) => (
                            <SchoolCard school={school} key={"school_" + index} />
                        ))
                        : <NoRecordsFound message={"No schools found on selected criteria."} />
                }
            </div>

        </>
    );
};

export default SchoolCardGrid;