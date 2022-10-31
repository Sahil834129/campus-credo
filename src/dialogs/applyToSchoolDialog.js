import React , {useState, useEffect} from "react";
import RESTClient from "../utils/RestClient";
import RestEndPoint from "../redux/constants/RestEndpoints";
import ApplyToSchool from "../components/schoolDetails/ApplyToSchool";
import Modal from 'react-bootstrap/Modal';
import "../assets/scss/custom-styles.scss";

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
        <Modal dialogClassName="signin-model readytoapply-model" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>Ready to Apply?</Modal.Header>
            <Modal.Body dialogClassName="model-body" >
                <ApplyToSchool schoolId={schoolId} schoolDetails={schoolDetails} handleClose={props.handleClose}/>
            </Modal.Body>
        </Modal>
    )
}

export default ApplyToSchoolDialog;