// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { find, isEmpty, map, values } from 'lodash';
import { updateMainSettings } from '../actions';

class MainSettings extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(settings) {
    this.props.updateMainSettings(settings);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Main settings</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="form-group">
            <label>Decimal:</label>
            <Field
              name="decimal"
              className="form-control"
              component="input"
              type="number"
            />
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
    },
  };
}

const form = reduxForm({ form: 'settings/main' })(MainSettings);

export default connect(mapStateToProps, { updateMainSettings })(form);
