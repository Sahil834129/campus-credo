import React from 'react';

const switchCss = {
  position: 'relative',
  height: '26px',
  width: '135px',
  backgroundColor: '#e4e4e4',
  borderRadius: '4px',
  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'center'
};

const switchRadioCss = {
  display: 'none',
};

const switchSelection = {
  display: 'block',
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  width: '45px',
  height: '26px',
  borderRadius: '4px',
  transition: 'left 0.25s ease-out',
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.16)'
};
const switchLabel = {
  position: 'relative',
  zIndex: 2,
  float: 'left',
  width: '45px',
  lineHeight: '26px',
  fontWeight: '400',
  fontSize: '11px',
  color: 'rgba(0, 0, 0, 0.6)',
  textAlign: 'center',
  cursor: 'pointer',
};

const checkedRadioCss = {
  transition: '0.15s ease- out',
  color: '#fff'
};

const titleCase = str =>
  str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel = ({ title, onChange, id, selected }) => {
  const checkedCss = (selected === title) ? { ...switchLabel, ...checkedRadioCss } : switchLabel;
  return <label style={{ ...checkedCss }} onClick={() => onChange(title)} className={id}>
    {titleCase(title)}
  </label>;
};

const ConcealedRadio = ({ value, selected }) => {
  return <input type="radio" name="switch" defaultChecked={selected === value} style={{ ...switchRadioCss }} />;

};

function ToggleSwitch({ selected, values, onChangeHandler, inputName, disabled }) {

  return (
    <div className='toggleswitch' style={switchCss}>
      {values.map(val => {
        return (
          <span key={`${inputName}-${val}`}>
            <ConcealedRadio value={val} selected={selected} disabled={disabled} />
            <ClickableLabel title={val} onChange={onChangeHandler} selected={selected} />
          </span>
        );
      })}
      {values.indexOf(selected) !== -1 && <span style={{ ...switchSelection, background: disabled ? 'grey' : '#549B43', left: `${values.indexOf(selected) / 3 * 100}%` }} />}
    </div>
  );

}

export default ToggleSwitch;
