import MultiRangeSlider from "multi-range-slider-react";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { OPERATORS } from '../../../constants/app';
import { applicationfilterData } from '../../../utils/services';

export const FilterApp = ({ schoolClassesData, classId, setClassId, setRowsData, callAllApi }) => {
  const intialValue = {
    grade: '',
    gradeOption: null,
    minAge: 0,
    maxAge: 30,
    minIncome: 0,
    maxIncome: 2000000,
    minMarks: 0,
    maxMarks: 100,
    minGpa: 0,
    maxGpa: 10,
    transport: '',
    boarding: ''
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
    callAllApi(1);
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

    filterPyaload['filters'] = filter;
    applicationfilterData(filterPyaload)
      .then(response => {
        window.scrollTo(0, 0);
        setRowsData(response?.data);
      })
      .catch(error => console.log(error));
  };

  const handleMinMarks = (e) => {
    const value = e.target.value;
    if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > maxMarks)
      return;
    setMinMarks(value);
  };

  const handleMaxMarks = (e) => {
    const value = e.target.value;
    if (isNaN(value) || parseFloat(value) < minMarks || parseFloat(value) > 100)
      return;
    setMaxMarks(value);
  };

  const handleMinIncome = (e) => {
    const value = e.target.value;
    if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > maxIncome)
      return;
    setMinIncome(value);
  };

  const handleMaxIncome = (e) => {
    const value = e.target.value;
    if (isNaN(value) || parseFloat(value) < minIncome || parseFloat(value) > 20000000)
      return;
    setMaxIncome(value);
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
          <div className='range-slider-wrapper'>
            <MultiRangeSlider className='age-slider'
              min={0}
              max={30}
              step={1}
              minValue={minAge}
              maxValue={maxAge}
              ruler='false'
              label='false'
              onInput={(e) => {
                setMinAge(e.minValue);
                setMaxAge(e.maxValue);
              }}
            />
          </div>
          <label className="age-range-value">({minAge + '-' + maxAge}) Years</label>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Family Income</Form.Label>
          <div className='inner-container'>
            <div className='range-slider-wrapper'>
              <MultiRangeSlider className='income-slider'
                min={0}
                max={20000000}
                step={500}
                minValue={minIncome}
                maxValue={maxIncome}
                ruler='false'
                label='false'
                onInput={(e) => {
                  setMinIncome(e.minValue);
                  setMaxIncome(e.maxValue);
                }}
              />
            </div>
            <div className='input-val-wrapper'>
              <div className='value-cell'>
                <Form.Label className=''>Min</Form.Label>
                <Form.Control type='text' placeholder='0' value={minIncome} onChange={handleMinIncome} />
              </div>
              <div className='value-cell'>
                <Form.Label className=''>Max</Form.Label>
                <Form.Control type='text' placeholder='20L' value={maxIncome} onChange={handleMaxIncome} />
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <Form.Label className='form-label'>Marks (%)</Form.Label>
          <div className='inner-container'>
            <div className='range-slider-wrapper'>
              <MultiRangeSlider className='marks-slider'
                min={0}
                max={100}
                step={1}
                minValue={minMarks}
                maxValue={maxMarks}
                ruler='false'
                label='false'
                onInput={(e) => {
                  setMinMarks(e.minValue);
                  setMaxMarks(e.maxValue);
                }}
              />
            </div>
            <div className='input-val-wrapper'>
              <div className='value-cell'>
                <Form.Label className=''>Min</Form.Label>
                <Form.Control type='text' value={minMarks} onChange={handleMinMarks} />
              </div>
              <div className='value-cell'>
                <Form.Label className=''>Max</Form.Label>
                <Form.Control type='text' value={maxMarks} onChange={handleMaxMarks} />
              </div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <div className='inner-container option-filter'>
            <Form.Label className='form-label'>Transport</Form.Label>
            <div className='radio-choice' >
              <input type='radio' name='transport' value={transport} checked={transport === 'true'} onChange={() => setTransport('true')} /> YES
              <input type='radio' name='transport' value={transport} checked={transport === 'false'} onChange={() => setTransport('false')} /> NO
              {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='form-element-group' controlId=''>
          <div className='inner-container option-filter'>
            <Form.Label className='form-label'>Boarding</Form.Label>
            <div className='radio-choice'>
              <input type='radio' name='boarding' value={boarding} checked={boarding === 'true'} onChange={() => setBoarding('true')} /> YES
              <input type='radio' name='boarding' value={boarding} checked={boarding === 'false'} onChange={() => setBoarding('false')} /> NO
              {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
            </div>
          </div>
        </Form.Group>
        <Form.Group>
          <div >
            <button onClick={handleApply} style={{
              backgroundColor: '#41285F',
              color: 'white',
              width: '100%',
              borderRadius: '4px',
              padding: '12px',
              fontWeight: '700',
              fontSize: '14px'
            }}>
              Apply Filter
            </button>
          </div>
        </Form.Group>
      </div>
    </div>
  );
};

export default FilterApp;