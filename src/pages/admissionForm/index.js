import React, { useState, useEffect } from 'react';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../../common/layout';
import Breadcrumbs from '../../common/Breadcrumbs';
import LeftMenuBar from '../../common/LeftMenuBar';
import PageContent from '../../resources/pageContent';
import { Formik, Form } from 'formik';
import InputField from '../../components/form/InputField';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {getChildsList} from '../../redux/actions/childAction';
import BootStrapForm from 'react-bootstrap/Form';
import RestEndPoint from '../../redux/constants/RestEndpoints';
import RESTClient from '../../utils/RestClient';
import { toast } from 'react-toastify';

export const SchoolAdmission = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const genderOptions = [{value: "Male", text: "Male"}, {value: "Female", text: "Female"}];
	const religionOptions = [{value: "Hindu", text: "Hindu"}, {value: "Muslim", text: "Muslim"}];
	const nationalityOptions = [{value: "Indian", text: "Indian"}];
	const categoryOptions = [{value: "General", text: "General"}, {value: "OBC", text: "OBC"}, {value: "SC", text: "SC"}, {value: "ST", text: "ST"}]
	const [submitting, setSubmitting] = useState(false);
	const [selectedChild, setSelectedChild] = useState({ childId: '', firstName: '', middleName: '', lastName: '', dateOfBirth: '', gender: 'Male', category: 'General',identificationMarks: '', religious: 'Hindu', 
	nationality: 'Indian', addressLine1: '', addressLine2: '', pincode:'', city: '', state: '', tranportFacility: "false", boardingFacility: "true" });
  	
	const childsList = useSelector((state) => state.childsData.childs);
	useEffect(() => { dispatch(getChildsList());}, [dispatch]);

	const handleChildSelection = (childId) => {
		const selectedChildObj = childsList.filter(it => it.childId === parseInt(childId)).map(it => ({firstName: it.firstName, middleName: it.middleName, lastName: it.lastName, dateOfBirth: it.dateOfBirth}))
		if (selectedChildObj.length){
			let childobj = selectedChildObj[0];
			let selectedChildCopy = JSON.parse(JSON.stringify(selectedChild));
			selectedChildCopy.childId = childId;
			selectedChildCopy.firstName = childobj.firstName;
			selectedChildCopy.middleName = childobj.middleName;
			selectedChildCopy.lastName = childobj.lastName;
			selectedChildCopy.dateOfBirth = childobj.dateOfBirth;
			setSelectedChild(selectedChildCopy);
		}
	}
	const saveStudentDetails = async(postData) => {
		console.log("Values are :::::::::: " + JSON.stringify(postData));
		try {
			const response = await RESTClient.post(RestEndPoint.CREATE_STUDENT_PROFILE, postData);
			toast.success("Student details saved successfully.");
			navigate("/userProfile/MedicalForm");
		} catch (error) {
			toast.error(RESTClient.getAPIErrorMessage(error));
		}
	}
    
	return(
      <Layout>
      <section className="content-area">
        <Container className="content-area-inner pt-n16 admmission-sequence-wrap">
          <Col className="inner-page-content">
            <Row className="content-section">
              <Breadcrumbs/>
              <div className="page-container border-bottom">
            	<div className="row-wrapper ">
					<span className="selectbox">
						<label>
							Select Child <span className="req">*</span>
						</label>
						<div className="frm-cell">
							<BootStrapForm.Group className='frm-cell'>
								<BootStrapForm.Select name="selectedChildId" onChange={(e)=> {handleChildSelection(e.target.value)}}>
									<option value="" key="child_select">--Select Child--</option>
									{
										childsList.length && childsList.map((child, i) => {
											return <option key={"child_" + i} value={child.childId} >{child.firstName + " " + child.lastName}</option>
										})
									}
								</BootStrapForm.Select>
							</BootStrapForm.Group>
						</div>
					</span>
				</div>
			  </div>
              <div className="content-area-inner internal-page-wrapper">
                <LeftMenuBar menuItems={PageContent.ADMISSION_FORM_SIDEBAR_MENU_ITEMS} parentPage="userProfile"/>
                <div className="inner-page-content right">
                  <div className="inner-page-right-container">
                    <h6 className="student-heading">Student Details</h6>
                    <p className="Stud-info">
                      Please provide accurate details of the student applying for admission. This information is used to help the school best cater for the educational needs of the student.
                    </p>
					<Formik initialValues={selectedChild}
						//validationSchema={SignUpSchema} validateOnBlur 
						enableReinitialize={true}
						onSubmit={values => { saveStudentDetails(values) }}
						>
						{({ values, setFieldValue, errors, touched }) => (
						<Form className="row g-3">
							<div className="col-md-6">
								<InputField fieldName="firstName" value={values.firstName} disabled label="First name" required fieldType="text" placeholder="First Name" errors={errors} touched={touched}/> 
							</div>
							<div className="col-md-6">
								<InputField fieldName="middleName" value={values.middleName} disabled label="Middle name" fieldType="text" placeholder="Middle Name" errors={errors} touched={touched}/> 
							</div>
							<div className="col-md-6">
								<InputField fieldName="lastName" value={values.lastName} disabled label="Last name" fieldType="text" placeholder="Last Name" errors={errors} touched={touched}/> 
							</div>
							<div className="col-md-6">
								<InputField fieldName="lastName" value={values.dateOfBirth} disabled label="Date of Birth" fieldType="text" placeholder="Last Name" errors={errors} touched={touched}/> 
                        		{/* <label for="validationServer02" className="form-label">
                          		Date of Birth <span className="req">*</span>
                        		</label> */}
								{/* <DatePicker dateFormat="dd/MM/yyyy" selected={values.dateOfBirth} className="form-control" name="dateOfBirth" onChange={date => setFieldValue('dateOfBirth', date)}/> */}
							</div>
							<div className="col-md-6">
								<InputField fieldName="gender" label="Select Gender" required fieldType="select" placeholder="" selectOptions={genderOptions} errors={errors} touched={touched} />
							</div>
							<div className="col-md-6">
								<InputField fieldName="category" label="Select Category" required fieldType="select" placeholder="" selectOptions={categoryOptions} errors={errors} touched={touched} />
							</div>
							<div className="col-md-6">
								<label for="exampleFormControlTextarea1" className="form-label">Identification Marks (Please specify)</label>
								<textarea className="form-control" name="identificationMarks" id="exampleFormControlTextarea1" rows="3" onChange={e=>{setFieldValue("identificationMarks", e.target.value)}}></textarea>
							</div>
							<div className="col-md-6">
								<div>
									<InputField fieldName="religious" label="Religion" required fieldType="select" placeholder="" selectOptions={religionOptions} errors={errors} touched={touched} />
								</div>
								<div>
									<InputField fieldName="nationality" label="Nationality" required fieldType="select" placeholder="" selectOptions={nationalityOptions} errors={errors} touched={touched} />
								</div>
							</div>
							<div className="col-12 border-bottom pb-2">
								<label className=" me-2">Please Provide Your Current School Information(If Applicabple)</label>
								<div className="form-check form-check-inline">
									<InputField className="form-check-input" label=" Yes" fieldName="isProvidingCurrentSchoolInfo" fieldType="radio" errors={errors} touched={touched}/>
								</div>
								<div className="form-check form-check-inline">
                       				<InputField className="form-check-input" label=" No" fieldName="isProvidingCurrentSchoolInfo" fieldType="radio" errors={errors} touched={touched}/>
								</div>
							</div>
							<p className="Addresss_info">Please Provide your Address details <span>(Add Your complete address for easy communication)</span></p>
                      		<div className="tab_btn border-bottom">
                      			<div className="row g-3">
									<div className="col-md-6">
										<InputField fieldName="addressLine1" label="House No., Block No." fieldType="text" errors={errors} touched={touched} />
									</div>
									<div className="col-md-6">
										<InputField fieldName="addressLine2" label="Area or Locality" fieldType="text" errors={errors} touched={touched} />
									</div>
									<div className="col-md-6">
										<InputField fieldName="pincode" label="Pincode" fieldType="text" errors={errors} touched={touched} />
									</div>
									<div className="col-md-6">
										<InputField fieldName="city" label="City" fieldType="text" errors={errors} touched={touched} />
									</div>
									<div className="col-md-6">
										<InputField fieldName="state" label="State" fieldType="text" errors={errors} touched={touched} />
									</div>
									{/* <div className="col-md-6">
										<InputField fieldName="country" label="Country" fieldType="text" errors={errors} touched={touched} />
									</div> */}
								</div>
							</div>
							<div className="col-md-6">
                        		<label for="validationServer02" className="form-label">Does the student require Transport facility? <span className="req">*</span></label>
                        		<div className="d-flex align-items-center py-2">
                        			<div className="form-check">
                        				<InputField className="form-check-input" label=" Yes" value="true" fieldName="tranportFacility" {...values.tranportFacility ==="true" ? 'checked' : ''} fieldType="radio" errors={errors} touched={touched}/>
                         			</div>
									<div className="form-check ms-2">
										<InputField className="form-check-input" label=" No" value="false" fieldName="tranportFacility" {...values.tranportFacility === "true" ? '' : 'checked'} fieldType="radio" errors={errors} touched={touched}/>
									</div>
                          		</div>
                      		</div>
							<div className="col-md-6">
                        		<label for="validationServer02" className="form-label">Does the student require Boarding facility? <span className="req">*</span></label>
                        		<div className="d-flex align-items-center py-2">
                        			<div className="form-check">
                        				<InputField className="form-check-input" label=" Yes" value="true" fieldName="boardingFacility" fieldType="radio" errors={errors} touched={touched}/>
                         			</div>
									<div className="form-check ms-2">
										<InputField className="form-check-input" label=" No" value="false" fieldName="boardingFacility" fieldType="radio" errors={errors} touched={touched}/>
									</div>
                          		</div>
                      		</div>
							<div className="form-group mb-3 button-wrap">
            					<button type="button" className='cancel comn' onClick={() => navigate("/userProfile")}>{submitting ? "Please wait..." : "Cancel"}</button>
								<button type="submit" className='save comn' disabled={submitting}>{submitting ? "Please wait..." : "Save & Next"}</button>
        					</div>
						</Form>
					)}
					</Formik>
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