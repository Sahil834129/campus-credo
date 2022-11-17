import React, { useState } from "react";
import AlertDialog from "../common/AlertDialog";
import ApplyToSchoolDialog from "../dialogs/applyToSchoolDialog";
import PageContent from "../resources/pageContent";
import { isLoggedIn } from "../utils/helper";
import SchoolCard from "./SchoolCard";
import NoRecordsFound from "../common/NoRecordsFound";
import { useSelector } from 'react-redux'

const SchoolCardGrid = (props) => {
    const [selectedSchoolToApply, setSelectedSchoolToApply] = useState('');
    const [showApplyToSchoolDialog, setShowApplyToSchoolDialog] = useState(false);
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const selectedLocation = useSelector(
        state => state.locationData.selectedLocation
      )
    const handleAddToCart = (schoolId) => {
        console.log("is logged n : " + isLoggedIn())
        if (!isLoggedIn()) {
            setShowAlertDialog(true);
            return;
        }
        setSelectedSchoolToApply(schoolId);
        setShowApplyToSchoolDialog(true);
    }

    const handleAddToCartDialogClose = () => {
        setShowApplyToSchoolDialog(false);
    }

    const handleAlertDialogClose = () => {
        setShowAlertDialog(false);
    }

    return (
        <>
        <div className='title-area'><h2>Schools in {selectedLocation}</h2></div>
        <div className='school-list-container'>
            {
                props.schools.length ?
                props.schools.map((school, index) => (
                    <SchoolCard school={school} key={"school_" + index} handleAddToCart={handleAddToCart}/>
                ))
                : <NoRecordsFound message={"No schools found on selected criteria."} />
            }
        </div>
        <ApplyToSchoolDialog show={showApplyToSchoolDialog} schoolId={selectedSchoolToApply} handleClose={handleAddToCartDialogClose}/>
        <AlertDialog show={showAlertDialog} message={PageContent.MUST_BE_LOGGED_IN_MSG} handleClose={handleAlertDialogClose}/>
        </>
    );
};

export default SchoolCardGrid;