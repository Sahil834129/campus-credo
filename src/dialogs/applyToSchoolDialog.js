import React, { useEffect, useState } from "react";
import "../assets/scss/custom-styles.scss";
import ApplyToSchool from "../components/schoolDetails/ApplyToSchool";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";
import GenericDialog from "./GenericDialog";

const ApplyToSchoolDialog = (props) => {
    const schoolId = props.schoolId;
    const [schoolDetails, setSchoolDetails] = useState({});
    useEffect(() => { loadSchoolDetails(schoolId); }, [schoolId]);
    
    const loadSchoolDetails = async() => {
        if (!schoolId)
            return;
        try {
            const response = await RESTClient.get(RestEndPoint.SCHOOL_BY_ID + "/" + schoolId);
            setSchoolDetails(response.data);
        } catch(e){
            console.log("loadSchoolDetails error : " + e)
        }
    }
	
    return (
        <GenericDialog className='signin-model readytoapply-model' show={props.show} handleClose={props.handleClose} modalHeader='Ready To Apply?'>
            <ApplyToSchool schoolId={schoolId} schoolDetails={schoolDetails} handleClose={props.handleClose}/>
        </GenericDialog>
    )
}

export default ApplyToSchoolDialog;