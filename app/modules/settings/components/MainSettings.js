import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { updateAutolaunchSettings, updateMainSettings } from '../actions';

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
            <label className="checkbox-inline" htmlFor="autoLaunch-yes">
              <Field
                name="autoLaunch"
                id="autoLaunch-yes"
                component="input"
                type="radio"
                value="yes"
              />{' '}
              Yes
            </label>
            <label className="checkbox-inline" htmlFor="autoLaunch-no">
              <Field
                name="autoLaunch"
                component="input"
                id="autoLaunch-no"
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

MainSettings.propTypes = {
  updateAutolaunchSettings: PropTypes.func.isRequired,
  updateMainSettings: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

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
