import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const SelectField = (props) => {
  return (
    <Autocomplete
      {...props.input}
      {...props}
      getOptionLabel={(option: { label?: string }) => {
        if (!option || !option.label) {
          return '';
        }

        return option.label;
      }}
      getOptionSelected={(value) => value}
      options={props.options}
      style={{ width: 300 }}
      inputValue={props.value}
      value={props.value}
      onChange={(_event, value: any) => props.input.onChange(value)}
      onBlur={(_event: React.FocusEvent<HTMLDivElement>, value: any) =>
        props.input.onBlur(value)
      }
      renderInput={(params) => {
        return <TextField {...props} {...params} variant="outlined" />;
      }}
    />
  );
};

SelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectField;
