import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { values } from 'lodash';
import 'react-select/dist/react-select.css';
import OptionComponent from './OptionComponent';
import ValueComponent from './ValueComponent';

SelectCoinField.defaultProps = {
  multi: false,
  className: "",
};

SelectCoinField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.shape({
    Data: PropTypes.object.isRequired,
    BaseImageUrl: PropTypes.string.isRequired,
  }).isRequired,
  multi: PropTypes.bool,
  className: PropTypes.string,
};

export default function SelectCoinField({ input, options, multi, className }) {
  const { name, value, onBlur, onChange, onFocus } = input;
  const transformedValue = transformValue(value, options, multi);
  return (
    <Select
      valueKey="value"
      name={name}
      value={transformedValue}
      multi={multi}
      optionComponent={OptionComponent}
      valueComponent={ValueComponent}
      options={values(options.Data)}
      onChange={multi
        ? multiChangeHandler(onChange)
        : singleChangeHandler(onChange)
      }
      onBlur={() => onBlur(value)}
      onFocus={onFocus}
      className={className}
    />
  );
}

/**
 * onChange from Redux Form Field has to be called explicity.
 */
function singleChangeHandler(func) {
  return function handleSingleChange(value) {
    func(value ? value.value : '');
  };
}

/**
 * onBlur from Redux Form Field has to be called explicity.
 */
function multiChangeHandler(func) {
  return function handleMultiHandler(values) {
    func(values.map(value => value.value));
  };
}

/**
 * For single select, Redux Form keeps the value as a string, while React Select
 * wants the value in the form { value: "grape", label: "Grape" }
 *
 * * For multi select, Redux Form keeps the value as array of strings, while React Select
 * wants the array of values in the form [{ value: "grape", label: "Grape" }]
 */
function transformValue(value, options, multi) {
  console.log(value, options, multi);

  if (multi && typeof value === 'string') return [];

  const filteredOptions = options.filter(option => {
    return multi
      ? value.indexOf(option.value) !== -1
      : option.value === value;
  });

  return multi ? filteredOptions : filteredOptions[0];
}
