import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { updateAutolaunchSettings } from '../actions';
import Title from '../../Title';
import { closeModal } from '../../modal/actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

function MainSettings() {
  const classes = useStyles();
  const settings = useSelector((state: any) => {
    console.log('groidsahogihwegads', state);
    return state.settings;
  });
  const dispatch = useDispatch();
  const [isAutoLaunch, setAutoLaunch] = useState(false);

  const handleRadioChange = (event: any) => {
    console.log(event.target.value, event.target.value === 'yes');
    setAutoLaunch(!!Number(event.target.value));
  };

  console.log(isAutoLaunch);

  const onSubmit = () => {
    dispatch(updateAutolaunchSettings(isAutoLaunch));
    closeModal();
  };

  console.log('settings--', settings);

  return (
    <Container>
      <Title>Main settings</Title>
      <Form
        initialValues={{
          decimal: settings.decimal,
          autoLaunch: settings.autoLaunch,
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">AutoLaunch at startup</FormLabel>
              <RadioGroup
                aria-label="autoLaunch"
                name="autoLaunch"
                value={isAutoLaunch ? 'yes' : 'no'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes"
                  checked={isAutoLaunch}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                  checked={!isAutoLaunch}
                />
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
        )}
      </Form>
    </Container>
  );
}

export default MainSettings;
