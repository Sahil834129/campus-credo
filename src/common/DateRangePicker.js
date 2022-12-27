import React from 'react';
import ReactDatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { DATE_FORMAT } from "../constants/app";

function DateRangePicker({
  dateRanges,
  fieldName,
  setFieldData,
  handleData,
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