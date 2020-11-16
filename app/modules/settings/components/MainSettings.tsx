import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateAutolaunchSettings, updateMainSettings } from '../actions';
import Title from '../../Title';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function MainSettings(props: {
  updateAutolaunchSettings: (arg0: boolean) => void;
  close: () => void;
  autoLaunch: any;
}) {
  const classes = useStyles();
  const [isAutoLaunch, setAutoLaunch] = useState(false);

  const handleRadioChange = (event) => {
    setAutoLaunch(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.updateAutolaunchSettings(isAutoLaunch);
    props.close();
  };

  return (
    <Container>
      <Title>Main settings</Title>
      <form onSubmit={onSubmit}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">AutoLaunch at startup</FormLabel>
          <RadioGroup
            aria-label="autoLaunch"
            name="autoLaunch"
            value={props.autoLaunch}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Save
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

MainSettings.propTypes = {
  close: PropTypes.func.isRequired,
  updateAutolaunchSettings: PropTypes.func.isRequired,
  updateMainSettings: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

function mapStateToProps({ settings }) {
  console.log(JSON.stringify(settings));
  return {
    settings,
    initialValues: {
      decimal: settings.decimal,
      autoLaunch: settings.autoLaunch,
    },
  };
}

const form = reduxForm({ form: 'settings/main' })(MainSettings);

export default connect(mapStateToProps, {
  updateMainSettings,
  updateAutolaunchSettings,
})(form);
