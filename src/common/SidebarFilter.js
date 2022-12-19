import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import { Formik, Form } from 'formik'
import InputField from '../components/form/InputField'
import Button from '../components/form/Button'
import RestEndPoint from '../redux/constants/RestEndpoints'
import RESTClient from '../utils/RestClient'
import { useDispatch, useSelector } from 'react-redux'
import { getSchoolClasses } from '../redux/actions/masterData'
import MultiRangeSlider from "multi-range-slider-react";
import { MultiSelect } from 'react-multi-select-component'

const SidebarFilter = ({ applyFilters }) => {
  const dispatch = useDispatch()
  const [filter, setFilter]=useState('')
  const classOptions = useSelector(
    state => state?.masterData?.schoolClasses || []
  )
  const distanceOptions = [
    { text: '--Select Distance--' },
    { value: '1', text: '0 - 2km' },
    { value: '2', text: '2 - 6km' },
    { value: '3', text: '6 - 10km' }
  ]

  const [boardOptions, setBoardOptions] = useState([
    { value: '', text: 'Select Board' }
  ])
  const [genderOptions, setGenderOptions] = useState([
    { value: '', text: 'Select Gender' }
  ])
  const [mediumOfInstructionsOtions, setMediumOfInstructionsOtions] = useState([
    { value: '', text: 'Select Medium' }
  ])
  const [facilitiesOptions, setFacilitiesOptions] = useState([])
  const [extracurricularOptions, setExtracurricularOptions] = useState([])
  const [admissionStatusOptions, setAdmissionStatusOptions] = useState([
    { value: '', text: 'Select Status' },
    { value: 'open', text: 'Open' },
    { value: 'closed', text: 'Closed' }
  ])
  const [minMonthlyTutionFee, setMinMonthlyTutionFee] = React.useState(0)
  const [maxMonthlyTutionFee, setMaxMonthlyTutionFee] = React.useState(20000)
  const [facilities, setFacilities] = useState([])
  const [extracurriculars, setExtracurriculars] = useState([])
  const selectedLocation = useSelector(
    state => state.locationData.selectedLocation
  )
  const OPERATORS = {
    EQUALS: 'EQUALS',
    IN: 'IN',
    BETWEEN: 'BETWEEN',
    LIKE: 'LIKE'
  }

  useEffect(() => {
    populateSchoolBoardsList()
  }, [])
  useEffect(() => {
    populateMediumOfInstructionsList()
  }, [])
  useEffect(() => {
    populateGenderOptions()
  }, [])
  useEffect(() => {
    populateFacilities()
  }, [])
  useEffect(() => {
    popularExtraCurricularActivities()
  }, [])

  useEffect(() => {
    if (classOptions.length === 0) {
      dispatch(getSchoolClasses())
    }
  }, [])

  const applyFilter = values => {
    applyFilters(prepareSchoolFilter(values))
  }

  function prepareSchoolFilter (filterForm) {
    const selectedFacilities = facilities.map(v=>v.value)
    const selectedExtracurriculars = extracurriculars.map(v=>v.value)
    let filterPayload = {}
    let filters = []
    filters.push({
      field: 'city',
      operator: OPERATORS.EQUALS,
      value: selectedLocation
    })
    if (filterForm.class !== null && filterForm.class !== '')
      filters.push({
        field: 'classes',
        operator: OPERATORS.IN,
        values: [filterForm.class]
      })
    if (filterForm.board !== null && filterForm.board !== '')
      filters.push({
        field: 'board',
        operator: OPERATORS.EQUALS,
        value: filterForm.board
      })
    if (filterForm.gender !== null && filterForm.gender !== '')
      filters.push({
        field: 'gender',
        operator: OPERATORS.LIKE,
        value: filterForm.gender
      })
    if (filterForm.medium !== null && filterForm.medium !== '')
      filters.push({
        field: 'mediumOfInstruction',
        operator: OPERATORS.LIKE,
        value: filterForm.medium
      })
    if (selectedFacilities && selectedFacilities.length)
      filters.push({
        field: 'facilities',
        operator: OPERATORS.IN,
        values: selectedFacilities
      })
    if (selectedExtracurriculars && selectedExtracurriculars.length)
      filters.push({
        field: 'extracurriculars',
        operator: OPERATORS.IN,
        values: selectedExtracurriculars
      })
    let maxFee = maxMonthlyTutionFee > 0 ? maxMonthlyTutionFee : 100000
    filters.push({
      field: 'fee',
      operator: OPERATORS.BETWEEN,
      values: [minMonthlyTutionFee, maxFee]
    })
    if (filterForm.status != null && filterForm.status !== '')
      filters.push({
        field: 'status',
        operator: OPERATORS.LIKE,
        value: filterForm.status
      })
    
    filterPayload['filters'] = filters
    return filterPayload
  }

  const populateMediumOfInstructionsList = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_MEDIUM_OF_INSTRUCTIONS
      )
      setMediumOfInstructionsOtions(
        [{ value: '', text: 'Select Medium' }].concat(
          response.data.schoolMediumOfInstructions.map(it => ({
            value: it,
            text: it
          }))
        )
      )
    } catch (e) {
      console.log('Error while getting medium of instructions list' + e)
    }
  }

  const populateSchoolBoardsList = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_BOARDS)
      setBoardOptions(
        [{ value: '', text: 'Select Board' }].concat(
          response.data.schoolBoards.map(it => ({ value: it, text: it }))
        )
      )
    } catch (e) {
      console.log('Error while getting board list' + e)
    }
  }

  const populateGenderOptions = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_GENDER)
      setGenderOptions(
        [{ value: '', text: 'Select Gender' }].concat(
          response.data.schoolGenders.map(it => ({ value: it, text: it }))
        )
      )
    } catch (e) {
      console.log('Error while getting gender list' + e)
    }
  }

  const populateFacilities = async () => {
    try {
      const response = await RESTClient.get(RestEndPoint.GET_SCHOOL_FACILITIES)
      setFacilitiesOptions(
        response.data.schoolFacilities.map(it => ({
          value: it.facilityName,
          label:it.facilityName
        }))
      )
    } catch (e) {
      console.log('Error while getting school facilities' + e)
    }
  }

  const popularExtraCurricularActivities = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_SCHOOL_EXTRA_CURRICULAR_ACTIVITIES
      )
      setExtracurricularOptions(
        response.data.extracurriculars.map(it => ({
          value: it.activity,
          label: it.activity
        }))
      )
    } catch (e) {
      console.log('Error while getting extracurriculars list' + e)
    }
  }

  function handleResetForm(resetForm) {
    setMinMonthlyTutionFee(0)
    setMaxMonthlyTutionFee(20000)
    setFacilities([])
    setExtracurriculars([])
    resetForm()
  }

  return (
    <Row className='filter-panel'>
    <Formik
        initialValues={{
          distance: '',
          class: '',
          board: '',
          gender: '',
          medium: '',
          status:'open'
        }}
        onSubmit={values => {
          applyFilter(values)
        }}
      >
        {({ errors, resetForm, touched }) => (
          <Form className='filter-components'>
            
              <div className='filter-head'>
                <h2>
                  <i className='icons filter-icon'></i> Filters
                </h2>
                <Link onClick={() => handleResetForm(resetForm)}>Reset</Link>
              </div>

              <div className='filter-item'>
                <InputField
                  fieldName='status'
                  fieldType='select'
                  placeholder=''
                  label='Admission Status'
                  selectOptions={admissionStatusOptions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item'>
                <InputField
                  fieldName='distance'
                  fieldType='select'
                  placeholder=''
                  label='Distance from Home'
                  selectOptions={distanceOptions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item'>
                <InputField
                  fieldName='class'
                  fieldType='select'
                  placeholder=''
                  label='Class'
                  selectOptions={classOptions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item'>
                <label>Monthly Tuition Fees</label>
                <div className='range-slider-wrapper'>
                  
                  <MultiRangeSlider min={0}
                    max={20000}
                    step={500}
                    minValue={minMonthlyTutionFee}
                    maxValue={maxMonthlyTutionFee}
                    ruler='false'
                    label='false'
                    onInput={(e) => {
                      setMinMonthlyTutionFee(e.minValue);
                      setMaxMonthlyTutionFee(e.maxValue);
                    }}
                    />

                    <label className="income-range-value">₹ ({minMonthlyTutionFee + '-'+ maxMonthlyTutionFee})</label>
                </div>
              </div>
              <div className='filter-item'>
                <InputField
                  fieldName='board'
                  fieldType='select'
                  placeholder=''
                  label='School Board'
                  selectOptions={boardOptions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item'>
                <InputField
                  fieldName='gender'
                  fieldType='select'
                  placeholder=''
                  label='Gender'
                  selectOptions={genderOptions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item'>
                <InputField
                  fieldName='medium'
                  fieldType='select'
                  placeholder=''
                  label='Medium of Instruction'
                  selectOptions={mediumOfInstructionsOtions}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className='filter-item multiselect-fld'>
                <label>Facilities</label>
                <MultiSelect 
                  options={facilitiesOptions}
                  value={facilities}
                  onChange={setFacilities}
                  labelledBy="Facilities"
                  //isOpen={true}
                  >
                </MultiSelect>
              </div>
              <div className='filter-item multiselect-fld'>
                <label>Extracurriculars</label>
                <MultiSelect 
                  options={extracurricularOptions}
                  value={extracurriculars}
                  onChange={setExtracurriculars}
                  labelledBy="Extracurriculars"
                  //isOpen={true}
                  >
                </MultiSelect>
              </div>
              <div className='filter-item btn-wrap'>
                <Button buttonLabel='Apply' class='applyFilter' />
              </div>
          </Form>
        )}
      </Formik>
      </Row>
  )
}

export default SidebarFilter
