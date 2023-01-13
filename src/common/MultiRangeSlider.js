import MultiRangeSlider from "multi-range-slider-react";
import Form from 'react-bootstrap/Form';

import { useEffect, useState } from "react";

export default function MultiRangeSliderView({
  minRange,
  maxRange,
  actualMinValue,
  actualMaxValue,
  setActualMinValue,
  setActualMaxValue,
  stepVal,
  rangeValueHide = false,
}) {
  const [inputMinVal, setInputMinVal] = useState(minRange);
  const [inputMaxVal, setInputMaxVal] = useState(maxRange);

  const handleMinIncome = (value) => {
    if (!value || isNaN(value) || parseFloat(value) < minRange || parseFloat(value) > actualMaxValue) {
      setInputMinVal(minRange);
      setActualMinValue(minRange);
    } else {
      setInputMinVal(value);
      setActualMinValue(value);
    }
  };

  const handleMaxIncome = (value) => {
    if (!value || isNaN(value) || parseFloat(value) < actualMinValue || parseFloat(value) > maxRange) {
      setInputMaxVal(maxRange);
      setActualMaxValue(maxRange);
    } else {
      setInputMaxVal(value);
      setActualMaxValue(value);
    }
  };

  useEffect(() => {
    setInputMinVal(actualMinValue);
  }, [actualMinValue]);

  useEffect(() => {
    setInputMaxVal(actualMaxValue);
  }, [actualMaxValue]);

  return (
    <div className={!rangeValueHide ? "inner-container" : ""}>
      <div className='range-slider-wrapper' >
        <MultiRangeSlider className='income-slider'
          min={minRange}
          max={maxRange}
          step={stepVal}
          stepOnly
          minValue={actualMinValue}
          maxValue={actualMaxValue}
          ruler='false'
          label='false'
          onChange={(e) => {
            setActualMinValue(e.minValue);
            setActualMaxValue(e.maxValue);
          }}
        />
        {rangeValueHide && <label className="age-range-value">({actualMinValue + '-' + actualMaxValue}) Rs</label>}
      </div >
      {!rangeValueHide && (
        <div className='input-val-wrapper'>
          <div className='value-cell'>
            <Form.Label className=''>Min</Form.Label>
            <Form.Control
              type='number'
              min={minRange}
              max={maxRange}
              step={stepVal}
              onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              steponly
              value={inputMinVal}
              onChange={(e) => setInputMinVal(e.target.value)}
              onBlur={e => handleMinIncome(inputMinVal)}
            />
          </div>
          <div className='value-cell'>
            <Form.Label className=''>Max</Form.Label>
            <Form.Control
              type='number'
              min={minRange}
              max={maxRange}
              onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
              step={stepVal}
              steponly
              value={inputMaxVal}
              onChange={(e) => setInputMaxVal(e.target.value)}
              onBlur={e => handleMaxIncome(inputMaxVal)}
            />
          </div>
        </div>
      )}
    </div>
  );
}