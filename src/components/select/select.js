import React from 'react';
import uuid from 'uuid/v5';
import slugify from 'slugify';

const NAMESPACE = '4c3fc58e-50df-4047-bede-21002905cf53';

const Select = ({
  options = [],
  handleChange = () => {},
  defaultValue,
  label,
  hideLabel = false,
  unselectedOption,
  unselectedOptionValue
}) => (
  <label className="select-wrapper">
    {hideLabel ? <span className="screen-reader-text">{label}</span> : label}
    <select
      onChange={handleChange}
      defaultValue={defaultValue || slugify(options[0], { lower: true })}
    >
      {unselectedOption && (
        <option value={unselectedOptionValue}>{unselectedOption}</option>
      )}
      {options.map(option => (
        <option
          key={uuid(`${label}-${option}`, NAMESPACE)}
          value={slugify(option, { lower: true })}
        >
          {option}
        </option>
      ))}
    </select>
  </label>
);

export default Select;
