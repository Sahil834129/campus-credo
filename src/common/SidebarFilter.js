import { Form, Formik } from "formik";
import MultiRangeSlider from "multi-range-slider-react";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/form/Button";
import InputField from "../components/form/InputField";
import { getSchoolClasses } from "../redux/actions/masterData";
import { setSchoolFilter } from "../redux/actions/userAction";
import RestEndPoint from "../redux/constants/RestEndpoints";
import RESTClient from "../utils/RestClient";

const SidebarFilter = ({ filterFormData, applyFilters }) => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const classOptions = useSelector(
    (state) => state?.masterData?.schoolClasses || []
  );
  const distanceOptions = [
    { text: "--Select Distance--" },
    { value: "1", text: "0 - 2km" },
    { value: "2", text: "2 - 6km" },
    { value: "3", text: "6 - 10km" },
  ];

  const [boardOptions, setBoardOptions] = useState([
    { value: "", text: "Select Board" },
  ]);
  const [genderOptions, setGenderOptions] = useState([
    { value: "", text: "Select Gender" },
  ]);
  const [mediumOfInstructionsOtions, setMediumOfInstructionsOtions] = useState([
    { value: "", text: "Select Medium" },
  ]);
  const [facilitiesOptions, setFacilitiesOptions] = useState([]);
  const [extracurricularOptions, setExtracurricularOptions] = useState([]);
  const [admissionStatusOptions, setAdmissionStatusOptions] = useState([
    { value: "", text: "All" },
    { value: "open", text: "Open" },
    { value: "closed", text: "Closed" },
  ]);
  const [minMonthlyTutionFee, setMinMonthlyTutionFee] = React.useState(0);
  const [maxMonthlyTutionFee, setMaxMonthlyTutionFee] = React.useState(20000);
  const [facilities, setFacilities] = useState([]);
  const [extracurriculars, setExtracurriculars] = useState([]);
  const [initialFilterValues, setInitialFilterValues] = useState({
    distance: "",
    class: "",
    board: "",
    gender: "",
    medium: "",
    status: "",
  });

  useEffect(() => {
    populateSchoolBoardsList();
  }, []);
  useEffect(() => {
    populateMediumOfInstructionsList();
  }, []);
  useEffect(() => {
    populateGenderOptions();
  }, []);
  useEffect(() => {
    populateFacilities();
  }, []);
  useEffect(() => {
    popularExtraCurricularActivities();
  }, []);

  useEffect(() => {
    if (classOptions.length === 0) {
      dispatch(getSchoolClasses());
    }
  }, []);

  useEffect(() => {
    if (Object.keys(filterFormData).length > 0) {
      if (filterFormData.facilities)
        setFacilities([...filterFormData.facilities]);
      if (filterFormData.extracurriculars)
        setExtracurriculars([...filterFormData.extracurriculars]);
      if (filterFormData.minMonthlyTutionFee)
        setMinMonthlyTutionFee(filterFormData?.minMonthlyTutionFee);
      if (filterFormData.maxMonthlyTutionFee)
        setMaxMonthlyTutionFee(filterFormData?.maxMonthlyTutionFee);
    }
  }, []);

  const applyFilter = (values) => {
    const filterValues = getFilterValues(values);
    dispatch(setSchoolFilter(filterValues));
    applyFilters(filterValues);
  };

  function getFilterValues(formValues) {
    return {
      ...formValues,
      facilities: facilities,
      extracurriculars: extracurriculars,
      minMonthlyTutionFee: minMonthlyTutionFee,
      maxMonthlyTutionFee: maxMonthlyTutionFee,
    };
  }

  const populateMediumOfInstructionsList = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_MEDIUM_OF_INSTRUCTIONS
      );
      setMediumOfInstructionsOtions(
        [{ value: "", text: "Select Medium" }].concat(
          response.data.schoolMediumOfInstructions.map((it) => ({
            value: it,
            text: it,
          }))
        )
      );
    } catch (e) {
      console.log("Error while getting medium of instructions list" + e);
    }
  };

  const populateSchoolBoardsList = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_BOARDS);
      setBoardOptions(
        [{ value: "", text: "Select Board" }].concat(
          response.data.schoolBoards.map((it) => ({ value: it, text: it }))
        )
      );
    } catch (e) {
      console.log("Error while getting board list" + e);
    }
  };

  const populateGenderOptions = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_GENDER);
      setGenderOptions(
        [{ value: "", text: "Select Gender" }].concat(
          response.data.schoolGenders.map((it) => ({ value: it, text: it }))
        )
      );
    } catch (e) {
      console.log("Error while getting gender list" + e);
    }
  };

  const populateFacilities = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_FACILITIES);
      setFacilitiesOptions(
        response.data.schoolFacilities.map((it) => ({
          value: it.facilityName,
          label: it.facilityName,
        }))
      );
    } catch (e) {
      console.log("Error while getting school facilities" + e);
    }
  };

  const popularExtraCurricularActivities = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_SCHOOL_EXTRA_CURRICULAR_ACTIVITIES
      );
      setExtracurricularOptions(
        response.data.extracurriculars.map((it) => ({
          value: it.activity,
          label: it.activity,
        }))
      );
    } catch (e) {
      console.log("Error while getting extracurriculars list" + e);
    }
  };

  function handleResetForm(resetForm) {
    resetForm();
    setMinMonthlyTutionFee(0);
    setMaxMonthlyTutionFee(20000);
    setFacilities([]);
    setExtracurriculars([]);
    dispatch(setSchoolFilter({}));
    applyFilters({});
  }

  return (
    <Row className="filter-panel">
      <Formik
        initialValues={
          Object.keys(filterFormData).length > 0
            ? filterFormData
            : initialFilterValues
        }
        enableReinitialize
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({ errors, resetForm, touched }) => (
          <Form className="filter-components">
            <div className="filter-head">
              <h2>
                <i className="icons filter-icon"></i> Filters
              </h2>
              <Link onClick={() => handleResetForm(resetForm)}>Reset</Link>
            </div>

            <div className="filter-item">
              <InputField
                fieldName="status"
                fieldType="select"
                placeholder=""
                label="Admission Status"
                selectOptions={admissionStatusOptions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item">
              <InputField
                fieldName="distance"
                fieldType="select"
                placeholder=""
                label="Distance from Home"
                selectOptions={distanceOptions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item">
              <InputField
                fieldName="class"
                fieldType="select"
                placeholder=""
                label="Class"
                selectOptions={classOptions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item">
              <label>Monthly Tuition Fees</label>
              <div className="range-slider-wrapper">
                <MultiRangeSlider
                  min={0}
                  max={20000}
                  step={500}
                  minValue={minMonthlyTutionFee}
                  maxValue={maxMonthlyTutionFee}
                  ruler="false"
                  label="false"
                  onInput={(e) => {
                    setMinMonthlyTutionFee(e.minValue);
                    setMaxMonthlyTutionFee(e.maxValue);
                  }}
                />

                <label className="income-range-value">
                  ₹ ({minMonthlyTutionFee + "-" + maxMonthlyTutionFee})
                </label>
              </div>
            </div>
            <div className="filter-item">
              <InputField
                fieldName="board"
                fieldType="select"
                placeholder=""
                label="School Board"
                selectOptions={boardOptions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item">
              <InputField
                fieldName="gender"
                fieldType="select"
                placeholder=""
                label="Gender"
                selectOptions={genderOptions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item">
              <InputField
                fieldName="medium"
                fieldType="select"
                placeholder=""
                label="Medium of Instruction"
                selectOptions={mediumOfInstructionsOtions}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="filter-item multiselect-fld">
              <label>Facilities</label>
              <MultiSelect
                options={facilitiesOptions}
                value={facilities}
                onChange={setFacilities}
                labelledBy="Facilities"
                //isOpen={true}
              ></MultiSelect>
            </div>
            <div className="filter-item multiselect-fld">
              <label>Extracurriculars</label>
              <MultiSelect
                options={extracurricularOptions}
                value={extracurriculars}
                onChange={setExtracurriculars}
                labelledBy="Extracurriculars"
                //isOpen={true}
              ></MultiSelect>
            </div>
            <div className="filter-item btn-wrap">
              <Button buttonLabel="Apply" class="applyFilter" />
            </div>
          </Form>
        )}
      </Formik>
    </Row>
  );
};

export default SidebarFilter;
