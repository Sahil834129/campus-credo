import React from 'react';
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import ReactDatePicker from 'react-datepicker';

function DateRangePicker({
  dateRanges,
  fieldName,
  setFieldData,
  handleData,
  minDate,
  dateRangeValue,
  disabled,
  maxDate,
  clearDependentValue,
  required = false,
  fixedEndDate = false,
}) {

  const updateDateRange = updatedValue => {
    if (fixedEndDate) {
      updatedValue[1] = maxDate;
    }
    fieldName.map((val, index) => {
      handleData(setFieldData, val, updatedValue[index], dateRangeValue[index]);
    });
    if (clearDependentValue) {
      clearDependentValue();
    }
  };

  return (
    <ReactDatePicker
      selectsRange={true}
      startDate={dateRanges[0]}
      endDate={dateRanges[1]}
      minDate={minDate || null}
      maxDate={maxDate || null}
      excludeDates={[minDate]}
      // placeholderText={'Select Date Range'} 
      onChange={update => {
        updateDateRange(update);
      }}
      required={required}
      onFocus={e => e.target.blur()}
      disabled={disabled}
      dateFormat={"dd/MM/yyyy"}
      customInput={
        <Form.Control
          size='sm'
          type='text'
          placeholder='Select Date Range'
          disabled={disabled}
        />
      }
      isClearable={!disabled ? !fixedEndDate : false}
    />
  );
}

export default React.memo(DateRangePicker);