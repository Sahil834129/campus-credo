import React , {useState, useEffect} from "react";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import ApplyToSchool from "../components/schoolDetails/ApplyToSchool";
import "../assets/scss/custom-styles.scss";
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
        <GenericDialog className='signin-model readytoapply-model' show={props.show} handleClose={props.handleClose} modalHeader='Ready to Apply?'>
            <ApplyToSchool schoolId={schoolId} schoolDetails={schoolDetails} handleClose={props.handleClose}/>
        </GenericDialog>
    )
}

export default ApplyToSchoolDialog;