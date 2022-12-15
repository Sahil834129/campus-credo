import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {getChildsList} from '../../redux/actions/childAction';
import { useSelector, useDispatch } from "react-redux";
import AddChildDialog from "../../dialogs/addChild";
import RESTClient from "../../utils/RestClient";
import RestEndPoint from "../../redux/constants/RestEndpoints";
import { toast } from "react-toastify";
import { getItemsInCart } from "../../redux/actions/cartAction";
import moment from "moment";
import { getChildAge } from "../../utils/helper";

const ApplyToSchool = (props) => {
    const dispatch = useDispatch();
    const childsList = useSelector((state) => state.childsData.childs);
    const [showAddChildDialog, setShowAddChildDialog] = useState(false);
    const [classOptions, setClassOptions] = useState([]);
    const [classFeeMap, setClassFeeMap] = useState({});
    const [sessionOptions, setSessionOptions] = useState([]);
    const [rows, setRows] = useState([{childId:'', class:'', session:''}]);
    const [classMapWithAge, setClassMapWithAge] = useState({})
    const schoolId = props.schoolId;
    useEffect(() => { dispatch(getChildsList());}, [dispatch]);
    useEffect(()=> {popularSchoolClasses(props)}, [props]);
    useEffect(()=>{populateSessionOptions(props)}, [props]);
    useEffect(()=>{populateClassesWithAge()},[])
    
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
      setClassOptions(
        // [{ value: "", text: "Select Class" }].concat(
        props.schoolDetails.classes.map((it) => ({
          value: it.classId,
          text: it.className,
        })),
        // ),
      );
      props.schoolDetails &&
        props.schoolDetails.classes.forEach((element) => {
          feeMap[element.classId] = element.admissionFormFee;
        });
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
        try{
            const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_CLASSES_WITH_AGE)
            console.log("rest..." + JSON.stringify(response.data))
            let classWithAgeMap = {}
            response.data.classesWithAgeLimit.length 
            && response.data.classesWithAgeLimit.forEach((it, index) =>{
                classWithAgeMap[parseInt(it[1])] = it[0]
            })
            console.log("classWithAgeMap ::: " + JSON.stringify(classWithAgeMap))
            setClassMapWithAge(classWithAgeMap)
        } catch (error){}
    }

    function openAddChildDialog() {
        setShowAddChildDialog(true);
    }

    const handleChildSelection = (index, field, value) => {
        setRowFieldValue(index, field, value)
        // Select class based on child age
        const selectedChild = childsList.find(it => it.childId === parseInt(value))
        let childAge = getChildAge(selectedChild.dateOfBirth);
        let age = 0
        
        Object.keys(classMapWithAge).forEach((value, idx) => {
            if (parseInt(value) <= childAge && parseInt(value) > age)
                age = value
        })

        let optionText = classMapWithAge[parseInt(age)]
        const selectedClass = classOptions.find(it => it.text === optionText)
        if(selectedClass)
            setRowFieldValue(index, 'class', selectedClass.value.toString())
        else
        setRowFieldValue(index, 'class', '')
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

    const addToCart = async() => {
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
        } catch(e) {
            toast.error(RESTClient.getAPIErrorMessage(e));
        }
    }
    return (
    <>
      <div className="readytoapply-block">
        {/* <div className='title-bar'><span>Ready to apply?</span> <i className='icons info-icon'></i></div> */}
        <div className="applyoform-wrapper">
          <div className="frm-row form-header">
            <div className="cell">Select Child</div>
            <div className="cell">Select Class</div>
            <div className="cell">Session</div>
            <div className="cell app-fee-lbl">Application Fee</div>
            <div className="cell">&nbsp;</div>
          </div>
          <Form action="" onSubmit={addToCart}>
            {rows.map((item, idx) => (
              <div className="frm-row form-content" key={"addChildRow_" + idx}>
                <Form.Group className="cell" key={"childSelectorGrmGrp_" + idx}>
                  <Form.Select
                    name={item.child}
                    key={"childSelector_" + idx}
                    onChange={(e) =>
                      handleChildSelection(idx, "childId", e.target.value)
                    }
                    class="form-select"
                    id="validationCustom04"
                    required="select one option"
                  >
                    <option selected disabled value="">
                      --Select Child--
                    </option>
                    {/* <option value="" selected="" key="child_select">
                      --Select Child--
                    </option> */}
                    {childsList.map((child, i) => {
                      return (
                        <option key={"child_" + i} value={child.childId}>
                          {child.firstName + " " + child.lastName}
                        </option>
                      );
                    })}
                  </Form.Select>
                  {item.child?.type === "required" && (
                    <p style={{ color: "red" }}> Please select one field</p>
                  )}
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
                    required="select one option"
                  >
                    <option selected disabled value="">
                      --Select Class--
                    </option>
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
                    onChange={(e) =>
                      setRowFieldValue(idx, "session", e.target.value)
                    }
                    id="validationCustom04"
                    required="select one option"
                  >
                    <option selected disabled value="">
                      --Select Session--
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
                    onClick={handleRemoveSpecificRow}
                  >
                    <i className="icons delete-icon"></i>
                  </Button>
                </Form.Group>
              </div>
            ))}
            <div className="form-control-btn">
              <Button className="add-child-btn" onClick={openAddChildDialog}>
                Add Child
              </Button>
              <Button
                type="submit"
                className="addtoapply-btn"
                // onClick={addToCart}
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
    </>
  );
};

export default ApplyToSchool;


