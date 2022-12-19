import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import MultiRangeSlider from "multi-range-slider-react";
import { useState } from 'react'
import { saveSchoolfilterData } from '../../utils/services';
import { OPERATORS } from '../../constants/app'

export const FilterApp = ({schoolClassesData, classId, setClassId}) => {
    const [grade, setGrade] = useState('')
    const gradeOption = [
    {
    value: 0,
    name: 'Select Grade'
    },
    {
    value: 1,
    name: 'A'
    },
    {
    value: 2,
    name: 'B'
    },
    {
    value: 3,
    name: 'C'
    },
    {
    value: 4,
    name: 'D'
    },
    {
    value: 5,
    name: 'E'
    },
    {
    value: 6,
    name: 'F'
    }]
    const [checkValue, setCheckValue] = useState(1)
    const [minAge, setMinAge ] = useState(0)
    const [maxAge, setMaxAge ] = useState(30)
    const [minIncome, setMinIncome] =useState(0)
    const [maxIncome, setMaxIncome] =useState(2000000)
    const [minMarks, setMinMarks] =useState(0)
    const [maxMarks, setMaxMarks] =useState(100)
    const [maxGpa, setMaxGpa] =useState(10)
    const [minGpa, setMinGpa] =useState(0)
    const [transport, setTransport] =useState(null)
    const [boarding, setBoarding] = useState(null)

  const ClearForm = ()=>{
    setClassId(1)
    setMinAge(0)
    setMaxAge(30)
    setMinIncome(0)
    setMaxIncome(2000000)
    setMinMarks(0)
    setMaxMarks(100)
    setMinGpa(0)
    setMaxGpa(10)
    setGrade(gradeOption[0].value)
    setCheckValue(1)
    setTransport(null)
    setBoarding(null)
  }

  const HandleApply = (checkValue) =>{
    const filterPyaload ={}
    const filter=[]
    if (classId !== null && classId !=='') {
      filter.push({
        field: 'className',
        operator: OPERATORS.IN,
        values: [classId]
      })
    }
    if (minAge !== null && minAge !=='' && maxAge !== null && maxAge !=='') {
      filter.push({
        field: 'Age',
        operator: OPERATORS.BETWEEN,
        values: [minAge, maxAge]
      })
    }
    if (minIncome !== null && minIncome !=='' && maxIncome !== null && maxIncome !=='') {
      filter.push({
        field: 'annualFamilyIncome',
        operator: OPERATORS.BETWEEN,
        values: [minIncome, maxIncome]
      })
    }
    if (minMarks !== null && minMarks !=='' && maxMarks !== null && maxMarks !=='') {
      filter.push({
        field: 'PERCENTAGE',
        operator: OPERATORS.BETWEEN,
        values:  [minMarks, maxMarks]
      })
    }
    if (minGpa !== null && minGpa !=='' && maxGpa !== null && maxGpa !=='') {
      filter.push({
        field: 'SGPA',
        operator: OPERATORS.BETWEEN,
        values: [minGpa, maxGpa]
      })
    }
    if (grade !== null && grade !=='') {
      filter.push({
        field: 'GRADE',
        operator: OPERATORS.IN,
        values: [grade]
      })
    }
    if (transport !== null && transport !=='') {
      filter.push({
        field: 'transportFacility',
        operator: OPERATORS.EQUALS,
        value: transport
      })
    }
    if (boarding !== null && boarding !=='') {
      filter.push({
        field: 'boardingFacility',
        operator: OPERATORS.EQUALS,
        value: boarding
      })
    }

    filterPyaload['filters'] = filter
    saveSchoolfilterData(filterPyaload)
    .then(response => {
      console.log('response', response)
      })
    .error(error => console.log(error)) 
  }

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
                    {schoolClassesData.map((val) => (
                            <option value={val.classId} >
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
                  <label className="age-range-value">({minAge + '-'+ maxAge}) Years</label>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Family Income</Form.Label>
                  <div className='inner-container'>
                    <div className='range-slider-wrapper'>
                    <MultiRangeSlider className='income-slider'
                      min={0}
                      max={2000000}
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
                        <Form.Control type='text' placeholder='0' value={minIncome}/>
                      </div>
                      <div className='value-cell'>
                        <Form.Label className=''>Max</Form.Label>
                        <Form.Control type='text' placeholder='20L' value={maxIncome} />
                      </div>
                    </div>
                  </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <Form.Label className='form-label'>Marks/Grades/GPA</Form.Label>
                <div className='inner-container'>
                  <div className='options-wrap'>
                    <Form.Check
                      type='checkbox'
                      label='Marks' 
                      onChange={()=>setCheckValue(1)}
                      checked={checkValue ===1}
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={()=>setCheckValue(2)}
                      label='GPA'
                      checked={checkValue ===2}
                    />
                    <Form.Check
                      type='checkbox'
                      onChange={()=>setCheckValue(3)}
                      label='Grade'
                      checked={checkValue ===3}
                    />
                  </div>
                  {(checkValue === 1) && <div>
                    <div className='slider-block'>
                      <Form.Label className='form-label'>Add Marks</Form.Label>
                    </div>
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
                            <Form.Control type='text' value={minMarks} />
                          </div>
                          <div className='value-cell'>
                            <Form.Label className=''>Max</Form.Label>
                            <Form.Control type='text' value={maxMarks} />
                          </div>
                       </div>
                    </div>
                  </div>}
                  {(checkValue === 2) && <div>
                    <div className='slider-block'>
                      <Form.Label className='form-label'>GPA</Form.Label>
                    </div>
                    <div className='inner-container'>
                      <div className='range-slider-wrapper'>
                        <MultiRangeSlider className='marks-gpa-slider'
                        min={0}
                        max={10}
                        step={1}
                        minValue={minGpa}
                        maxValue={maxGpa}
                        ruler='false'
                        label='false'
                        onInput={(e) => {
                          setMinGpa(e.minValue);
                          setMaxGpa(e.maxValue);
                            }}
                        />
                      </div>
                      <div className='input-val-wrapper'>
                        <div className='value-cell'>
                          <Form.Label className=''>Min GPA</Form.Label>
                          <Form.Control type='text' value={minGpa} />
                        </div>
                        <div className='value-cell'>
                          <Form.Label className=''>Max GPA</Form.Label>
                          <Form.Control type='text' value={maxGpa} />
                        </div>
                      </div>
                    </div>
                  </div>}
                  {(checkValue === 3) && <div>
                      <div className='slider-block'>
                        <Form.Label className='form-label'>GRADES</Form.Label>
                      </div>
                      <div>
                      <Form.Select 
                    value={grade} 
                    onChange={(e) => {
                      setGrade(e.target.value);
                          }}
                    > 
                    {gradeOption.map((val) => (
                            <option value={val.value} >
                              {val.name}
                            </option>
                    ))}
                </Form.Select>
                      </div>
                  </div>}
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Transport</Form.Label>
                  <div className='radio-choice' >
                    <input type='radio' name='transport' value={transport} checked={transport === 'true'} onChange={()=> setTransport('true')}/> YES
                    <input type='radio' name='transport' value={transport} checked={transport === 'false'} onChange={()=> setTransport('false')}/> NO
                    {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
                  </div>
                </div>
              </Form.Group>
              <Form.Group className='form-element-group' controlId=''>
                <div className='inner-container option-filter'>
                  <Form.Label className='form-label'>Boarding</Form.Label>
                  <div className='radio-choice'>
                    <input type='radio' name='boarding' value= {boarding} checked={boarding === 'true'} onChange={()=> setBoarding('true')}/> YES
                    <input type='radio' name='boarding' value= {boarding} checked={boarding === 'false'} onChange={()=> setBoarding('false')}/> NO
                    {/* <Form.Check type='radio' label='Yes' />
                    <Form.Check type='radio' label='No' /> */}
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div >
                  <button  onClick={HandleApply} style={{
                    backgroundColor:'#41285F',
                    color:'white', 
                    width: '100%', 
                    borderRadius: '4px',
                    padding: '12px',
                    fontWeight: '700',
                    fontSize:'14px'
                    }}> 
                    Apply Filter
                  </button>
                </div>
              </Form.Group>
            </div>
          </div>
    )
}

export default FilterApp