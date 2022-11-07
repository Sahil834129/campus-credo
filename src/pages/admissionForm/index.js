import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../../common/layout';
import Breadcrumbs from '../../common/Breadcrumbs';
import LeftMenuBar from '../../common/LeftMenuBar';
import PageContent from '../../resources/pageContent';
//import { Formik, Form } from 'formik';
import InputField from '../../components/form/InputField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {getChildsList} from '../../redux/actions/childAction';
import Form from 'react-bootstrap/Form';
import RestEndPoint from '../../redux/constants/RestEndpoints';
import RESTClient from '../../utils/RestClient';
import { toast } from 'react-toastify';
import TextField from '../../components/form/TextField';
import SelectField from '../../components/form/SelectField';
import RadioButton from '../../components/form/RadioButton';

export const SchoolAdmission = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [classOptions, setClassOptions] = useState([{"value":"","text":"Select Class"}]);
	const [childListOptions, setChildListOptions] = useState([{value:'', text: "Select Child"}]);
	const genderOptions = [{value: "Male", text: "Male"}, {value: "Female", text: "Female"}];
	const religionOptions = [{value: "Hindu", text: "Hindu"}, {value: "Muslim", text: "Muslim"}];
	const nationalityOptions = [{value: "Indian", text: "Indian"}];
	const categoryOptions = [{value: "General", text: "General"}, {value: "OBC", text: "OBC"}, {value: "SC", text: "SC"}, {value: "ST", text: "ST"}]
	const [submitting, setSubmitting] = useState(false);
	const [selectedChild, setSelectedChild] = useState({ childId: '', className:'', firstName: '', lastName: '', dateOfBirth: '', gender: 'Male', category: 'General',identificationMarks: '', religion: 'Hindu', 
	nationality: 'Indian', addressLine1: '', addressLine2: '', pincode:'', city: '', state: '', transportFacility: false, boardingFacility: false });
  	
	const childsList = useSelector((state) => state.childsData.childs);
	useEffect(() => { dispatch(getChildsList());}, [dispatch]);
	useEffect(() => { populateChildListOptions();}, [childsList]);
	useEffect(() => { popularSchoolClasses();}, []);

	const handleChildSelection = (childId) => {
		console.log("childId ::: " + childId)
		const selectedChildObj = childsList.filter(it => it.childId === parseInt(childId)).map(it => ({childId: it.childId, firstName: it.firstName, middleName: it.middleName, lastName: it.lastName, dateOfBirth: it.dateOfBirth}))
		if (!selectedChildObj.length)
			return;
	
		let childobj = selectedChildObj[0];
		console.log("child obj : " +JSON.stringify(childobj))
		setSelectedChild({
			...selectedChild,
			childId: childobj.childId,
			firstName: childobj.firstName,
			lastName: childobj.lastName,
			dateOfBirth: childobj.dateOfBirth
		});
		console.log("seected child : " + JSON.stringify(selectedChild))
	}
	const saveStudentDetails = async() => {
		console.log("Values are :::::::::: " + JSON.stringify(selectedChild));
		const postData = {...selectedChild};
		delete postData["firstName"]
		delete postData["lastName"]
		delete postData["gender"]
		delete postData["dateOfBirth"]
		try {
			const response = await RESTClient.post(RestEndPoint.CREATE_STUDENT_PROFILE, postData);
			toast.success("Student details saved successfully.");
			navigate("/userProfile/MedicalForm");
		} catch (error) {
			toast.error(RESTClient.getAPIErrorMessage(error));
		}
	}

	const setFieldValue = (fieldName, fieldValue) => {
		setSelectedChild({
			...selectedChild,
			[fieldName]: fieldValue
		})
	}

	const popularSchoolClasses = async() => {
        try {
            const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_CLASSES);
            setClassOptions([{"value":"","text":"Select Class"}].concat(response.data.classes.map(it => ({value: it, text: it}))));
        } catch(e) {
            console.log("Error while getting classes list" + e);
        }
    }

	const populateChildListOptions = () => {
		setChildListOptions([{value:'', text:'Select Child'}].concat(childsList.map((child)=>({value:child.childId, text: child.firstName + ' ' + child.lastName}))));
	}
    
	return (
		<Layout>
			<section className="content-area">
				<Container className="content-area-inner pt-n16 admmission-sequence-wrap">
					<Col className="inner-page-content">
						<Row className="content-section">
							<Breadcrumbs />
							<div className="page-container border-bottom">
								<div className="row-wrapper ">
									<span className="selectbox">
										<SelectField fieldName="selectedChildId" label="Select Child" value={selectedChild.childId} onChange={e=> {handleChildSelection(e.target.value)}} required selectOptions={childListOptions} />
									</span>
									{/* <Button variant="primary" onClick={() => history('/')}>Add Child</Button> */}
									<span className="selectbox">
										<SelectField fieldName="selectedClass" label="Select Class" value={selectedChild.class} onChange={e=> {setFieldValue("className",e.target.value)}} required selectOptions={classOptions} />
									</span>
								</div>
							</div>
							<div className="content-area-inner internal-page-wrapper">
								<LeftMenuBar menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS} parentPage="userProfile" />
								<div className="inner-page-content right">
									<div className="inner-page-right-container">
										<h6 className="student-heading">Student Details</h6>
										<p className="Stud-info">
											Please provide accurate details of the student applying for admission. This information is used to help the school best cater for the educational needs of the student.
										</p>
										<Form className="row g-3">
											<div className="col-md-6">
												<TextField fieldName="firstName" disabled value={selectedChild.firstName} label="First Name" required placeholder="First Name" />
											</div>
											<div className="col-md-6">
												<TextField fieldName="lastName" disabled value={selectedChild.lastName} label="Last Name" required placeholder="Last Name" />
											</div>
											<div className="col-md-6">
												<TextField fieldName="dateOfBirth" disabled value={selectedChild.dateOfBirth} label="Date of Birth" required />
											</div>
											<div className="col-md-6">
												<SelectField fieldName="gender" label="Select Gender" value={selectedChild.gender} onChange={e=> {setFieldValue("gender",e.target.value)}} required selectOptions={genderOptions} />
											</div>
											<div className="col-md-6">
												<label for="exampleFormControlTextarea1" className="form-label">Identification Marks (Please specify)</label>
												<textarea className="form-control" name="identificationMarks" rows="4" value={selectedChild.identificationMarks} onChange={e=> {setFieldValue("identificationMarks",e.target.value)}}></textarea>
											</div>
											<div className="col-md-6">
												<div>
													<SelectField fieldName="religion" label="Select Religion" required selectOptions={religionOptions} value={selectedChild.religion} onChange={e=> {setFieldValue("religion",e.target.value)}}/>
												</div>
												<div>
													<SelectField fieldName="nationality" label="Nationality" required selectOptions={nationalityOptions} value={selectedChild.nationality} onChange={e=> {setFieldValue("nationality",e.target.value)}}/>
												</div>
											</div>
											<div className="col-md-6">
												<SelectField fieldName="category" label="Select Category" required selectOptions={categoryOptions} value={selectedChild.category} onChange={e=> {setFieldValue("category",e.target.value)}}/>
											</div>
											<div className="col-12 border-bottom pb-2">
												<label className=" me-2">Please Provide Your Current School Information(If Applicabple)</label>
												<div className="form-check form-check-inline">
													<RadioButton label=" Yes" fieldName="isProvidingCurrentSchoolInfo" value={true} />
												</div>
												<div className="form-check form-check-inline">
													<RadioButton label=" No" fieldName="isProvidingCurrentSchoolInfo" value={false} />
												</div>
											</div>
											<p className="Addresss_info">Please Provide your Address details <span>(Add Your complete address for easy communication)</span></p>
											<div className="tab_btn border-bottom">
												<div className="row g-3">
													<div className="col-md-6">
														<TextField fieldName="addressLine1" label="House No., Block No." value={selectedChild.addressLine1} onChange={e=> {setFieldValue("addressLine1",e.target.value)}}/>
													</div>
													<div className="col-md-6">
														<TextField fieldName="addressLine2" label="Area or Locality" value={selectedChild.addressLine2} onChange={e=> {setFieldValue("addressLine2",e.target.value)}}/>
													</div>
													<div className="col-md-6">
														<TextField fieldName="pincode" label="Pincode" value={selectedChild.pincode} onChange={e=> {setFieldValue("pincode",e.target.value)}}/>
													</div>
													<div className="col-md-6">
														<TextField fieldName="city" label="City" value={selectedChild.city} onChange={e=> {setFieldValue("city",e.target.value)}}/>
													</div>
													<div className="col-md-6">
														<TextField fieldName="state" label="State" value={selectedChild.state} onChange={e=> {setFieldValue("state",e.target.value)}}/>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<label for="validationServer02" className="form-label">Does the student require Transport facility? <span className="req">*</span></label>
												<div className="d-flex align-items-center py-2">
													<div className="form-check">
														<RadioButton label=" Yes" fieldName="transportFacility" value={selectedChild.transportFacility} onChange={e=> {setFieldValue("transportFacility",e.target.value)}} />
													</div>
													<div className="form-check ms-2">
														<RadioButton label=" No" fieldName="transportFacility" value={!selectedChild.transportFacility} onChange={e=> {setFieldValue("transportFacility",e.target.value)}}/>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<label for="validationServer02" className="form-label">Does the student require Boarding facility? <span className="req">*</span></label>
												<div className="d-flex align-items-center py-2">
													<div className="form-check">
														<RadioButton label=" Yes" fieldName="boardingFacility" value={true} onChange={e=> {setFieldValue("boardingFacility",e.target.value)}} />
													</div>
													<div className="form-check ms-2">
														<RadioButton label=" No" fieldName="boardingFacility" value={false} defaultChecked  onChange={e=> {setFieldValue("boardingFacility",e.target.value)}} />
													</div>
												</div>
											</div>
											<div className="form-group mb-3 button-wrap">
												<button type="button" className='cancel comn' onClick={() => navigate("/userProfile")}>{submitting ? "Please wait..." : "Cancel"}</button>
												<button type="button" className='save comn' onClick={()=>{saveStudentDetails();}} disabled={submitting}>{submitting ? "Please wait..." : "Save & Next"}</button>
											</div>
										</Form>
									</div>
								</div>
							</div>
						</Row>
					</Col>
				</Container>
			</section>
		</Layout>
);
};
export default SchoolAdmission;