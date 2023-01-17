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
import { getClassBasedOnAge, getStudentAge } from "../../utils/helper";
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
    const [rows, setRows] = useState([{childId:'', class:'', session:''}]);
    const [classMapWithAge, setClassMapWithAge] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
	const [showAlertDialog, setShowAlertDialog] = useState(false)
	const [alertMessage, setAlertMessage] = useState('')
    const schoolId = props.schoolId;
    
	useEffect(() => { dispatch(getChildsList());}, [dispatch]);
	useEffect(()=>{populateClassesWithAge()},[])
    useEffect(()=> {popularSchoolClasses(props)}, [props.schoolDetails]);
    useEffect(()=>{populateSessionOptions(props)}, [props.schoolDetails]);
    
    const handleAddRow = () => {
        const item = { childId: '', class: '', session: '' };
        setRows([...rows, item]);
    }

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
					})),
				);
			
				props.schoolDetails.classes.filter(it=> it.admissionStatus === 'Admission Open').forEach((element) => {
					feeMap[element.classId] = element.formFee;
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
        let session = props.schoolDetails.admissionInfo.admissionSession;
        sessionOptions.push({ value: session, text: session });
      }
      setSessionOptions(sessionOptions);
    };

    const populateClassesWithAge = async() => {
        setClassMapWithAge(await getAgeClassMap())
	}

    function openAddChildDialog() {
        setShowAddChildDialog(true);
    }

	function isSchoolAlreadyInApplyList(childId) {
		const childCartItemsGroupedOnChild = itemsInCart.childCartItemsList.filter(it=> it.childId === parseInt(childId))
		const childCartItems = childCartItemsGroupedOnChild.filter(it => it.childId === parseInt(childId))
		return (childCartItems.length && childCartItems[0].cartItems.filter(it => it.schoolId === parseInt(schoolId)).length > 0)
	}

	const isApplicationAlreadySubmittedForSchool = async(childId, schoolId) => {
		const response = await getApplications(childId);
		if (response && response.data) {
			const appliedSchoolIds = response.data.map((application) => { return application.schoolId })
			if (appliedSchoolIds.includes(parseInt(schoolId))){
				return true
			}
		}
		return false
	}

    const handleChildSelection = async(index, field, value) => {
		if (isSchoolAlreadyInApplyList(value)) {
			setAlertMessage('Schools is already in applied list for the selected child.')
			setShowAlertDialog(true)
			setRowFieldValue(index, field, '')
			return
		}
		const isApplicationAlreadySubmitted = await isApplicationAlreadySubmittedForSchool(value, schoolId)
		if (isApplicationAlreadySubmitted) {
			setAlertMessage('Application is already submitted to this school for the selected child.')
			setShowAlertDialog(true)
			setRowFieldValue(index, field, '')
			return
		}
		let studentProfile
		//let isProfileCompleted = false
		try {
			const response = await RESTClient.get(RestEndPoint.GET_STUDENT_PROFILE + `/${value}`)
			studentProfile = response.data
			//isProfileCompleted = studentProfile.profileCompleted ? true : false
		} catch (error) {}
		// if (!isProfileCompleted) {
		// 	setAlertMessage('Cannot be added to the apply list because the student profile for the selected child is incomplete.')
		// 	setShowAlertDialog(true)
		// 	setRowFieldValue(index, field, '')
		// 	return
		// }

		const selectedChild = childsList.find(it => it.childId === parseInt(value))
		let childAge = getStudentAge(selectedChild.dateOfBirth)
		let optionText = getClassBasedOnAge(classMapWithAge, classOptions, childAge)
		const selectedClass = classOptions.find((it) => it.text.toLowerCase() === optionText?.toLowerCase());
		setRowFieldValue(index, field, value)
        setRowFieldValue(index, 'class', selectedClass ? selectedClass.value.toString() : "")
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
			appObj["classId"] = row.class;
			appObj["parentId"] = childObj?.parentId;
			appObj["admissionSession"] = row.session;
			appObj["fee"] = classFeeMap[row.class];
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
			if (row.childId === '' || row.class === '' || row.session === '')
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
					<div className="frm-row form-header">
						<div className="cell">Select Child <span className='error-exception'>*</span></div>
						<div className="cell">Select Class <span className='error-exception'>*</span></div>
						<div className="cell">Session <span className='error-exception'>*</span></div>
						
						<div className="cell app-fee-lbl">Application Fee</div>
						<div className="cell">&nbsp;</div>
						
					</div>
					<Form>
						{rows.map((item, idx) => (
							<div className="frm-row form-content" key={"addChildRow_" + idx}>
								<Form.Group className="cell" key={"childSelectorGrmGrp_" + idx}>
									<Form.Select
										name={item.childId}
										value={item.childId}
										key={"childSelector_" + idx}
										onChange={(e) =>
											handleChildSelection(idx, "childId", e.target.value)
										}
									>
									<option defaultValue='' disabled value="">
										Child
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
									<Form.Select
										key={"classSelector_" + idx}
										name={item.class}
										value={item.class}
										onChange={(e) =>
											setRowFieldValue(idx, "class", e.target.value)
										}
										id="validationCustom04"
										>
										<option disabled value="">Class</option>
										{classOptions.map((option, i) => {
											return (
												<option key={"class_" + i} value={option.value}>
													{option.text}
												</option>
											);
										})}
									</Form.Select>
								</Form.Group>
								<Form.Group
									className="cell"
									key={"sessionSelectorFrmGrp_" + idx}
								>
									<Form.Select
										key={"sessionSelector_" + idx}
										name={item.session}
										value={item.session}
										onChange={(e) =>
											setRowFieldValue(idx, "session", e.target.value)
										}
										id="validationCustom04"
										>
										<option disabled value="">
											Session
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
								<Form.Group
									className="cell app-fee-lbl"
									key={"admissionFeeGrmGrp_" + idx}
								>
									<span
										className="application-fee-amt"
										key={"admissionFee_" + idx}
									>
										{classFeeMap[rows[idx].class]
											? "₹" + classFeeMap[rows[idx].class]
											: ""}
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
								{
								validationErrors && validationErrors.hasOwnProperty('row_'+idx) ? <div className='error-exception'>{validationErrors['row_'+idx]} </div>: ''
								}
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


