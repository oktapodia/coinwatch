// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { find, isEmpty, map, values } from 'lodash';
import { updateMainSettings, updateAutolaunchSettings } from '../actions';

class MainSettings extends Component {
  constructor() {
    super();

    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(settings) {
    if (settings.autoLaunch) {
      this.props.updateAutolaunchSettings(settings.autoLaunch);
    }
    this.props.updateMainSettings(settings);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="app-container">
        <h3>Main settings</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label>Launch on startup:</label>
            <label className="checkbox-inline">
              <Field
                name="autoLaunch"
                component="input"
                type="radio"
                value="yes"
              />{' '}
              Yes
            </label>
            <label className="checkbox-inline">
              <Field
                name="autoLaunch"
                component="input"
                type="radio"
                value="no"
              />{' '}
              No
            </label>
          </div>
          <input className="btn btn-default" type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ settings }) {
  return {
    settings,
    initialValues: {
      decimal: settings.decimal,
      autoLaunch: settings.autoLaunch,
    },
  };
}

const form = reduxForm({ form: 'settings/main' })(MainSettings);

export default connect(mapStateToProps, { updateMainSettings, updateAutolaunchSettings })(form);
