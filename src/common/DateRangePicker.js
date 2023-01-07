import React from 'react';
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
  required = false
}) {
  
  const updateDateRange = updatedValue => {
    fieldName.map((val, index) => {
      handleData(setFieldData, val, updatedValue[index], dateRangeValue[index]);
    });
  };

  return (
    <ReactDatePicker
      selectsRange={true}
      startDate={dateRanges[0]}
      endDate={dateRanges[1]}
      minDate={minDate || null}
      excludeDates={[minDate]}
      placeholderText={'Select Date Range'} 
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
      isClearable={true}
    />
  );
}

export default React.memo(DateRangePicker);