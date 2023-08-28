import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import MultiRangeSliderView from "../../../common/MultiRangeSlider";
import { OPERATORS } from '../../../constants/app';
import { getLocalData, isEmpty } from '../../../utils/helper';
import { applicationfilterData } from '../../../utils/services';

export const FilterApp = ({ schoolClassesData, classId, setClassId, setRowsData, callAllApi, sessionValue }) => {
  const intialValue = {
    grade: '',
    gradeOption: null,
    minAge: 1,
    maxAge: 30,
    minIncome: 0,
    maxIncome: 10000000,
    minMarks: 0,
    maxMarks: 100,
    minGpa: 0,
    maxGpa: 10,
    transport: '',
    boarding: '',
    session: '',
  };
  const [grade, setGrade] = useState(intialValue.grade);
  const [minAge, setMinAge] = useState(intialValue.minAge);
  const [maxAge, setMaxAge] = useState(intialValue.maxAge);
  const [minIncome, setMinIncome] = useState(intialValue.minIncome);
  const [maxIncome, setMaxIncome] = useState(intialValue.maxIncome);
  const [minMarks, setMinMarks] = useState(intialValue.minMarks);
  const [maxMarks, setMaxMarks] = useState(intialValue.maxMarks);
  const [maxGpa, setMaxGpa] = useState(intialValue.maxGpa);
  const [minGpa, setMinGpa] = useState(intialValue.minGpa);
  const [transport, setTransport] = useState(intialValue.transport);
  const [boarding, setBoarding] = useState(intialValue.boarding);

  const ClearForm = () => {
    setClassId(1);
    setMinAge(intialValue.minAge);
    setMaxAge(intialValue.maxAge);
    setMinIncome(intialValue.minIncome);
    setMaxIncome(intialValue.maxIncome);
    setMinMarks(intialValue.minMarks);
    setMaxMarks(intialValue.maxMarks);
    setMinGpa(intialValue.minGpa);
    setMaxGpa(intialValue.maxGpa);
    setGrade(intialValue.grade);
    setTransport(intialValue.transport);
    setBoarding(intialValue.boarding);
    callAllApi(1, sessionValue);
  };

  const handleApply = () => {
    const filterPyaload = {};
    const filter = [];
    if (classId !== null && classId !== '') {
      filter.push({
        field: 'classId',
        operator: OPERATORS.IN,
        values: [classId]
      });
    }
    if (minAge !== null && minAge !== '' && maxAge !== null && maxAge !== '') {
      filter.push({
        field: 'Age',
        operator: OPERATORS.BETWEEN,
        values: [minAge, maxAge]
      });
    }
    if (minIncome !== null && minIncome !== '' && maxIncome !== null && maxIncome !== '') {
      filter.push({
        field: 'annualFamilyIncome',
        operator: OPERATORS.BETWEEN,
        values: [minIncome, maxIncome]
      });
    }
    if (minMarks !== null && minMarks !== '' && maxMarks !== null && maxMarks !== '') {
      filter.push({
        field: 'PERCENTAGE',
        operator: OPERATORS.BETWEEN,
        values: [minMarks, maxMarks]
      });
    }
    if (grade !== null && grade !== '') {
      filter.push({
        field: 'GRADE',
        operator: OPERATORS.IN,
        values: [grade]
      });
    }
    if (transport !== null && transport !== '') {
      filter.push({
        field: 'transportFacility',
        operator: OPERATORS.EQUALS,
        value: transport
      });
    }
    if (boarding !== null && boarding !== '') {
      filter.push({
        field: 'boardingFacility',
        operator: OPERATORS.EQUALS,
        value: boarding
      });
    }
    if (!isEmpty(getLocalData("sessionValue"))) {
      filter.push({
        field: 'admissionSession',
        operator: OPERATORS.EQUALS,
        value: getLocalData("sessionValue"),
      });
    }

    filterPyaload['filters'] = filter;
    applicationfilterData(filterPyaload)
      .then(response => {
        window.scrollTo(0, 0);
        setRowsData(response?.data?.applicationDataDtos);
      })
      .catch(error => console.log(error));
  };

  const handleMinMarks = (e) => {
    const value = e.target.value;
    if (!value || isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > maxMarks)
      return;
    setMinMarks(value);
  };

  const handleMaxMarks = (e) => {
    const value = e.target.value;
    if (!value || isNaN(value) || parseFloat(value) < minMarks || parseFloat(value) > 100)
      return;
    setMaxMarks(value);
  };

  return (
    <div className='filterpanel'>
      <div className='filter-head'>
        <span className='filter-title'>
          <i className='icons filter-icon'></i>
          <label>Filters</label>
        </span>
        <Link href='' onClick={ClearForm}>Clear All</Link>
      </div>
      <div className='filter-form-area'>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Select Class</Form.Label>
          <Form.Select
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
            }}>
            {schoolClassesData.map((val, index) => (
              <option value={val.classId} key={`class${index}`} >
                {val.className}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Age</Form.Label>
          <MultiRangeSliderView
            minRange={1}
            maxRange={20}
            actualMinValue={minAge}
            actualMaxValue={maxAge}
            setActualMinValue={setMinAge}
            setActualMaxValue={setMaxAge}
            stepVal={1}
          />

        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Family Income</Form.Label>
          <MultiRangeSliderView
            minRange={0}
            maxRange={5000000}
            actualMinValue={minIncome}
            actualMaxValue={maxIncome}
            setActualMinValue={setMinIncome}
            setActualMaxValue={setMaxIncome}
            stepVal={50000}
          />
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Marks (%)</Form.Label>
          <MultiRangeSliderView
            minRange={0}
            maxRange={100}
            actualMinValue={minMarks}
            actualMaxValue={maxMarks}
            setActualMinValue={setMinMarks}
            setActualMaxValue={setMaxMarks}
            stepVal={1}
          />
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <div className='inner-container option-filter'>
            <Form.Label className='form-label'>Transport</Form.Label>
            <div className='radio-choice' >
              <input type='radio' name='transport' value={transport} checked={transport === 'true'} onChange={() => setTransport('true')} /> Yes
              <input type='radio' name='transport' value={transport} checked={transport === 'false'} onChange={() => setTransport('false')} /> No
              {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <div className='inner-container option-filter'>
            <Form.Label className='form-label'>Boarding</Form.Label>
            <div className='radio-choice'>
              <input type='radio' name='boarding' value={boarding} checked={boarding === 'true'} onChange={() => setBoarding('true')} /> Yes
              <input type='radio' name='boarding' value={boarding} checked={boarding === 'false'} onChange={() => setBoarding('false')} /> No
              {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='filter-item btn-wrap'>
          <div className=''>
            <button onClick={handleApply} 
            style={{
              // backgroundColor: '#41285F',
              // color: 'white',
              // width: '100%',
              // borderRadius: '4px',
              // padding: '12px',
              // fontWeight: '700',
              // fontSize: '14px'
            }}
            className="btn applyFilter"
            >
              Apply Filter
            </button>
          </div>
        </Form.Group>
      </div>
    </div>
  );
};

export default FilterApp;