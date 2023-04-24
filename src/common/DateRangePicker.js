import React from 'react';
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import ReactDatePicker from 'react-datepicker';
import { formatDateToDDMMYYYY } from "../utils/DateUtil";

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
  const showText = dateRanges[0] && disabled;

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
    <>
      <div
        title={showText ? `${formatDateToDDMMYYYY(dateRanges[0])}- ${formatDateToDDMMYYYY(dateRanges[1])}` : ""}
        style={{ width: '100%' }}
      >
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
      </div>
    </>
  );
}

export default React.memo(DateRangePicker);