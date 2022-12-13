import React from 'react';
import ReactDatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';

function DateRangePicker({
  dateRanges,
  fieldName,
  setFieldData,
  handleData,
  dateRangeValue,
  disabled
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
      disabled={disabled}
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

export default React.memo(DateRangePicker)