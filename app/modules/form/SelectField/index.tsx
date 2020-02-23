import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const SelectField = props => {
  return (
    <Select
      {...props}
      value={props.input.value}
      onChange={value => props.input.onChange(value)}
      onBlur={() => props.input.onBlur(props.input.value)}
      options={props.options}
    />
  );
};

SelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired
  }).isRequired,
  options: PropTypes.array.isRequired
};

export default SelectField;
