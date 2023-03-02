import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AlertDialog from "../../common/AlertDialog";
import AddChildDialog from "../../dialogs/addChild";
import { getItemsInCart } from "../../redux/actions/cartAction";
import { getChildsList } from '../../redux/actions/childAction';
import RestEndPoint from "../../redux/constants/RestEndpoints";
import { getClassBasedOnAge, getStudentAge, isEmpty } from "../../utils/helper";
import RESTClient from "../../utils/RestClient";
import { getAgeClassMap, getApplications } from "../../utils/services";

const ApplyToSchool = (props) => {
    const dispatch = useDispatch();
    const childsList = useSelector((state) => state.childsData.childs);
	const itemsInCart = useSelector((state) => state.cartData.itemsInCart);
    const [showAddChildDialog, setShowAddChildDialog] = useState(false);
    const [classOptions, setClassOptions] = useState([]);
    const [classFeeMap, setClassFeeMap] = useState({});
    const [sessionOptions, setSessionOptions] = useState([]);
	const [sessionOptionsMap, setSessionOptionsMap] = useState([]);

    const [rows, setRows] = useState([
		{
			childId:'', 
			classId:'', 
			session:  "" ,
		}
	]);
    const [classMapWithAge, setClassMapWithAge] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
	const [showAlertDialog, setShowAlertDialog] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
    const schoolId = props.schoolId;
    
	useEffect(() => { dispatch(getChildsList());}, [dispatch]);
	useEffect(()=>{populateClassesWithAge()},[])
    useEffect(()=> {
		popularSchoolClasses(props)},
							 [ props.schoolDetails]);
    useEffect(()=>{populateSessionOptions(props)}, [props.schoolDetails]);
    
    const handleAddRow = () => {
        const item = { childId: '', classId: '', session: "" };
        setRows([...rows, item]);
    }
   const appliedSchools=[];
    const handleRemoveSpecificRow = (idx) => {
        const tempRows = [...rows];
        if (tempRows.length === 1) {
            return;
        }
        tempRows.splice(idx, 1);
        setRows(tempRows);
    }

	const popularSchoolClasses = (props) => {
		try {
			let feeMap = {};
			if (props.schoolDetails && props.schoolDetails.classes) {
				setClassOptions(
					props.schoolDetails.classes.filter(it=> it.admissionStatus === 'Admission Open').map((it) => ({
						value: it.classId,
						text: it.className,
						session : it.admissionSession
					})),
				);
				let sessionOptionsMap = {};
				classOptions.map((classList) => {
					if (!sessionOptionsMap.hasOwnProperty(classList.session))
					  sessionOptionsMap[classList.session] = [];
					sessionOptionsMap[classList.session].push(classList.text);
				  });
				 
				  const sessionArray = Object.entries(sessionOptionsMap).map(([session, classes]) => ({
					session,
					classes
				  }));
				  setSessionOptionsMap(sessionArray);
				props.schoolDetails.classes.filter(it=> it.admissionStatus === 'Admission Open').forEach((element) => {
					feeMap[element.classId+ ":" + element.admissionSession] = element.formFee;
				});
			}
			setClassFeeMap(feeMap);
		} catch (e) {
			console.log("Error while getting classes list" + e);
		}
	};
    const populateSessionOptions = (props) => {
      let sessionOptions = [];
      if (props.schoolDetails.hasOwnProperty("admissionInfo")) {
        let session = props.schoolDetails.admissionInfo;
		session.map((sessionList)=>
		{
			sessionOptions.push({ value: sessionList.admissionSession, text: sessionList.admissionSession });
		})
      }
      setSessionOptions(sessionOptions);
    };

    const populateClassesWithAge = async() => {
        setClassMapWithAge(await getAgeClassMap())
	}

    function openAddChildDialog() {
        setShowAddChildDialog(true);
    }

	function isSchoolAlreadyInApplyList(childId , session , classId) {
		const childCartItemsGroupedOnChild = itemsInCart.childCartItemsList.filter(it=> it.childId === parseInt(childId))
		const childCartItems = childCartItemsGroupedOnChild.filter(it => it.childId === parseInt(childId))
		return (childCartItems.length && childCartItems[0].cartItems.filter(it => it.schoolId === parseInt(schoolId) &&
		 it.admissionSession === session && it.className === classId ).length > 0 )
	}

	const isApplicationAlreadySubmittedForSchool = async(childId, schoolId , session, classId) => {
		const response = await getApplications(childId);
		if (response && response.data) {
			 response.data.map((application) => { appliedSchools.push({ schoolId: application.schoolId, admissionSession: application.admissionSession })});
			return(appliedSchools && 
				appliedSchools.filter((it)=> it.schoolId === parseInt(schoolId) && it.admissionSession === session && it.className === classId).length>0
			)
		}
	}

    const handleChildSelection = async(index, field, childId , session , classId) => {
		if (isSchoolAlreadyInApplyList(childId ,session , classId)) {
			setAlertMessage('Schools is already in applied list for the selected child.')
			setShowAlertDialog(true)
			setRowFieldValue(index, field, '')
			setRowFieldValue(index, "classId", '')
			return
		}
		const isApplicationAlreadySubmitted = await isApplicationAlreadySubmittedForSchool(childId, schoolId , session , classId)
		if (isApplicationAlreadySubmitted) {
			setAlertMessage('Application is already submitted to this school for the selected child.')
			setShowAlertDialog(true)
			setRowFieldValue(index, field, '')
			setRowFieldValue(index, "classId", '')
			return
		}
		let studentProfile
		//let isProfileCompleted = false
		console.log(childId,"child id");
		try {
			const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PROFILE + `/${childId}`)
			studentProfile = response.data
			//isProfileCompleted = studentProfile.profileCompleted ? true : false
		} catch (error) {}
		// if (!isProfileCompleted) {
		// 	setAlertMessage('Cannot be added to the apply list because the student profile for the selected child is incomplete.')
		// 	setShowAlertDialog(true)
		// 	setRowFieldValue(index, field, '')
		// 	return
		// }

		const selectedChild = childsList.find(it => it.childId === parseInt(childId))
		let childAge = getStudentAge(selectedChild?.dateOfBirth)
		let optionText = getClassBasedOnAge(classMapWithAge, classOptions, childAge)
		const selectedClass = classOptions.find((it) => it.text.toLowerCase() === optionText?.toLowerCase());
		setRowFieldValue(index, field, childId)
        setRowFieldValue(index, 'class', selectedClass ? selectedClass.childId.toString() : "")
    }


	const setRowFieldValue = (index, field, value) => {
        let tempRows = [...rows];
        if (!(index < tempRows.length))
            return;

        let row = tempRows[index];
        if (!row.hasOwnProperty(field))
            return;

        row[field] = value;
        setRows(tempRows);
    }
    const handleClassId=(classId , session)=>{
		if(!isEmpty(props.schoolDetails.classes) && classId){
			let classItem=props.schoolDetails.classes.filter((item)=> item.className===classId && item.admissionSession===session);
			return (!isEmpty(classItem) ? classItem[0].classId : null); 
		}
		else return "";
	}
	const addToCart = async () => {
		if (!isValidApplications())
			return
		let applications = [];
		const childObjList = JSON.parse(JSON.stringify(childsList));
		rows.forEach((row) => {
			let appObj = {};
			let childObj = childObjList.find(e => e.childId === row.childId);
			appObj["schoolId"] = schoolId;
			appObj["childId"] = row.childId;
			appObj["classId"] = handleClassId(row.classId , row.session)
			appObj["parentId"] = childObj?.parentId;
			appObj["admissionSession"] = row.session;
			appObj["fee"] = classFeeMap[handleClassId(row.classId , row.session)+ ":" + row.session];
			applications.push(appObj);
		});
		try {
			await RESTClient.post(RestEndPoint.ADD_TO_CART, applications);
			dispatch(getItemsInCart());
			toast.success("School added to apply list.");
			if (props.handleClose)
				props.handleClose();
		} catch (e) {
			toast.error(RESTClient.getAPIErrorMessage(e));
		}
	}

	function isValidApplications() {
		resetValidationErrors()
		let errors = {}
		rows.forEach((row, index) => {
			if (row.childId === '' || row.classId === '' || row.session === '')
				errors['row_' + index] = 'All fields are mandatory*'
		})
		setValidationErrors(errors)
		return (Object.keys(errors).length > 0 ? false : true)
	}

    function resetValidationErrors() {
      setValidationErrors({})
    }

	function handleAlertDialogClose() {
		setShowAlertDialog(false)
	}
	return (
		<>
			<div className="readytoapply-block">
				{/* <div className='title-bar'><span>Ready to apply?</span> <i className='icons info-icon'></i></div> */}
				<div className="applyoform-wrapper">
					
					<Form>
						<div className="frm-row form-header">
							<div className="item-cell-wrap">
								<div className="cell">Session <span className='error-exception'>*</span></div>
								<div className="cell">Select Child <span className='error-exception'>*</span></div>
								<div className="cell">Select Class <span className='error-exception'>*</span></div>
								
								
								<div className="cell app-fee-lbl">Application Fee</div>
								<div className="cell">&nbsp;</div>
							</div>
						</div>
						{rows.map((item, idx) => (
							<div className="frm-row form-content" key={"addChildRow_" + idx}>
								<div className="item-cell-wrap">
								<Form.Group
										className="cell"
										key={"sessionSelectorFrmGrp_" + idx}
									>
										<label className="applytoschool-lbl">Select Session</label>
										<Form.Select
											key={"sessionSelector_" + idx}
											name={item.session}
											value={item.session}
											onChange={(e) =>
												{
												setRowFieldValue(idx, "session", e.target.value)
												setRowFieldValue(idx, "childId",'')
												setRowFieldValue(idx, "class",'')
												popularSchoolClasses(props );
												}
											}
											id="validationCustom04"
											>
											<option disabled value="">
												--Session--
											</option>
											{sessionOptions.map((option, i) => {
												return (
													<option key={"session_" + i} value={option.value}>
														{option.text}
													</option>
												);
											})}
										</Form.Select>
									</Form.Group>
									<Form.Group className="cell" key={"childSelectorGrmGrp_" + idx}>
										<label className="applytoschool-lbl">Select Child</label>
										<Form.Select
											name={item.childId}
											value={item.childId}
											key={"childSelector_" + idx}
											onChange={(e) =>
												setRowFieldValue(idx, "childId", e.target.value)
											}
										>
										<option defaultValue='' disabled value="">
											--Child--
										</option>
										{childsList.map((child, i) => {
											return (
												<option key={"child_" + i} value={child.childId}>
													{child.firstName + " " + child.lastName}
												</option>
											);
										})}
										</Form.Select>
									</Form.Group>
									<Form.Group className="cell" key={"classSelectorFrmGrp_" + idx}>
										<label className="applytoschool-lbl">Select Class</label>
										<Form.Select
											key={"classSelector_" + idx}
											name={item.classId}
											value={item.classId}
											onChange={(e) =>
											{	
												setRowFieldValue(idx, "classId", e.target.value)
												handleChildSelection(idx, "childId", item.childId , item.session , item.classId)
										    }
												
											}
											id="validationCustom04"
											>
											<option disabled value="">
												--Class--
											</option>
									     {  sessionOptionsMap?.filter((sessionList)=>sessionList.session===item.session).map((selectedSession , i) => {
         								return (	 
											 selectedSession.classes.map((element, i) => {
											return<option key={"class_" + i} value={element}>
											{element}
											</option>;
										  }))
											})
										}
										</Form.Select>
									</Form.Group>
								
									<Form.Group
										className="cell app-fee-lbl"
										key={"admissionFeeGrmGrp_" + idx}
									>
										<label className="applytoschool-lbl">Application Fee</label>
										<span
											className="application-fee-amt"
											key={"admissionFee_" + idx}
										>
											{classFeeMap[handleClassId(rows[idx].classId ,rows[idx].session ) + ":"+ rows[idx].session]
												? "₹" + classFeeMap[handleClassId(rows[idx].classId ,rows[idx].session)+ ":"+ rows[idx].session]
												: "-"}
										</span>
									</Form.Group>
									<Form.Group
										className="cell button-wrap"
										key={"actionFrmGrp_" + idx}
									>
										<Button
											className="addnew-btn"
											key={"actionAddNewIcon_" + idx}
											onClick={handleAddRow}
										>
											<i className="icons addnew-icon"></i>{" "}
										</Button>
										<Button
											className="delete-btn"
											key={"actionRemoveIcon_" + idx}
											onClick={()=>{handleRemoveSpecificRow(idx)}}
										>
											<i className="icons delete-icon"></i>
										</Button>
									</Form.Group>
								</div>
								<div className="">
									{
									validationErrors && validationErrors.hasOwnProperty('row_'+idx) ? <div className="error-cell"><div className='error-exception'>{validationErrors['row_'+idx]} </div></div>: ''
									}
								</div>
							</div>
						))}
						<div className="form-control-btn">
							<Button className="add-child-btn" onClick={openAddChildDialog}>
								Add Child
							</Button>
							<Button
								className="addtoapply-btn"
								onClick={addToCart}
							>
								Add To Apply
							</Button>
						</div>
					</Form>
				</div>
			</div>
			<AddChildDialog
				show={showAddChildDialog}
				handleClose={() => setShowAddChildDialog(false)}
			/>
			<AlertDialog show={showAlertDialog} handleClose={handleAlertDialogClose} message={alertMessage}/>
		</>
	);
};

export default ApplyToSchool;
