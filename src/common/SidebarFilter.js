import React, { useState, useEffect } from 'react'
import BootStrapForm from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import { Formik, Form } from 'formik'
import InputField from '../components/form/InputField'
import Button from '../components/form/Button'
import RestEndPoint from '../redux/constants/RestEndpoints'
import RESTClient from '../utils/RestClient'
import { useSelector } from 'react-redux'
import { combineArray, popularSchoolClasses } from '../utils/populateOptions'

const SidebarFilter = props => {
  const distanceOptions = [
    { text: '--Select Distance--' },
    { value: '1', text: '0 - 2km' },
    { value: '2', text: '2 - 6km' },
    { value: '3', text: '6 - 10km' }
  ]
  const [classOptions, setClassOptions] = useState([
    { value: '', text: 'Select Class' }
  ])
  const [boardOptions, setBoardOptions] = useState([
    { value: '', text: 'Select Board' }
  ])
  const [genderOptions, setGenderOptions] = useState([
    { value: '', text: 'Select Gender' }
  ])
  const [mediumOfInstructionsOtions, setMediumOfInstructionsOtions] = useState([
    { value: '', text: 'Select Medium' }
  ])
  const [facilitiesOptions, setFacilitiesOptions] = useState([
    { value: '', text: 'Select Facilities' }
  ])
  const [extracurricularOptions, setExtracurricularOptions] = useState([
    { value: '', text: 'Select Activity' }
  ])
  const [minMonthlyTutionFee, setMinMonthlyTutionFee] = React.useState(0)
  const [maxMonthlyTutionFee, setMaxMonthlyTutionFee] = React.useState(0)
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
    popularSchoolClasses()
      .then(data => combineArray(data.data.classes))
      .then(data => {
        setClassOptions(data)
      })
  }, [])

  const applyFilter = values => {
    props.applyFilters(prepareSchoolFilter(values))
  }

  function prepareSchoolFilter (filterForm) {
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
        operator: OPERATORS.EQUALS,
        value: filterForm.gender
      })
    if (filterForm.medium !== null && filterForm.medium !== '')
      filters.push({
        field: 'mediumOfInstruction',
        operator: OPERATORS.LIKE,
        value: filterForm.medium
      })
    if (filterForm.facilities !== null && filterForm.facilities !== '')
      filters.push({
        field: 'facilities',
        operator: OPERATORS.IN,
        values: [filterForm.facilities]
      })
    if (
      filterForm.extracurriculars !== null &&
      filterForm.extracurriculars !== ''
    )
      filters.push({
        field: 'extracurriculars',
        operator: OPERATORS.IN,
        values: [filterForm.extracurriculars.value]
      })
    let maxFee = maxMonthlyTutionFee > 0 ? maxMonthlyTutionFee : 100000
    filters.push({
      field: 'fee',
      operator: OPERATORS.BETWEEN,
      values: [minMonthlyTutionFee, maxFee]
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
        [{ value: '', text: 'Select Facilities' }].concat(
          response.data.schoolFacilities.map(it => ({
            value: it.facilityName,
            text: it.facilityName
          }))
        )
      )
    } catch (e) {
      console.log('Error while getting gender list' + e)
    }
  }

  const popularExtraCurricularActivities = async () => {
    try {
      const response = await RESTClient.get(
        RestEndPoint.GET_SCHOOL_EXTRA_CURRICULAR_ACTIVITIES
      )
      setExtracurricularOptions(
        [{ value: '', text: 'Select Activity' }].concat(
          response.data.extracurriculars.map(it => ({
            value: it.activity,
            text: it.activity
          }))
        )
      )
    } catch (e) {
      console.log('Error while getting extracurriculars list' + e)
    }
  }

  return (
    <Row className='filter-panel'>
      <div className='filter-head'>
        <h2>
          <i className='icons filter-icon'></i> Filters
        </h2>
        <Link href=''>Reset</Link>
      </div>
      <Formik
        initialValues={{
          distance: '',
          class: '',
          board: '',
          gender: '',
          medium: '',
          facilities: '',
          extracurriculars: ''
        }}
        onSubmit={values => {
          applyFilter(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className='filter-components'>
            <InputField
              fieldName='distance'
              fieldType='select'
              placeholder=''
              label='Distance from Home'
              selectOptions={distanceOptions}
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='class'
              fieldType='select'
              placeholder=''
              label='Class'
              selectOptions={classOptions}
              errors={errors}
              touched={touched}
            />
            <label>Min. Monthly Tuition Fees ₹</label>
            <BootStrapForm.Range
              id='minTutionFeeRange'
              value={minMonthlyTutionFee}
              min={1000}
              max={50000}
              onChange={e => setMinMonthlyTutionFee(e.target.value)}
            />
            <InputField
              fieldName='minMonthlyTutionFee'
              value={minMonthlyTutionFee}
              fieldType='text'
              placeholder=''
              errors={errors}
              touched={touched}
            />
            <label>Max. Monthly Tuition Fees ₹</label>
            <BootStrapForm.Range
              id='maxTutionFeeRange'
              value={maxMonthlyTutionFee}
              min={1000}
              max={50000}
              onChange={e => setMaxMonthlyTutionFee(e.target.value)}
            />
            <InputField
              fieldName='maxMonthlyTutionFee'
              value={maxMonthlyTutionFee}
              fieldType='text'
              placeholder=''
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='board'
              fieldType='select'
              placeholder=''
              label='School Board'
              selectOptions={boardOptions}
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='gender'
              fieldType='select'
              placeholder=''
              label='Gender'
              selectOptions={genderOptions}
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='medium'
              fieldType='select'
              placeholder=''
              label='Medium of Instruction'
              selectOptions={mediumOfInstructionsOtions}
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='facilities'
              fieldType='select'
              placeholder=''
              label='Facilities'
              selectOptions={facilitiesOptions}
              errors={errors}
              touched={touched}
            />
            <InputField
              fieldName='extracurriculars'
              fieldType='select'
              placeholder=''
              label='Extracurriculars'
              selectOptions={extracurricularOptions}
              errors={errors}
              touched={touched}
            />
            <Button buttonLabel='Apply' class='applyFilter' />
          </Form>
        )}
      </Formik>
    </Row>
  )
}

export default SidebarFilter
