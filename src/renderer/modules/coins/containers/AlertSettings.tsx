// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import { saveAlert } from '../actions';

function AlertSettings(props: any) {
  const onSubmit = (data: any) => {
    props.saveAlert({ ...data, slug: props.extras.slug });
    props.closeModal();
  };

  const { error, submitting, handleSubmit } = props;

  /*

  const coinsOptions = values(map(coins.Data, (d) => ({ label: d.FullName, value: d })));
  const exchangesOptions = values(map(exchanges, (d) => ({ label: d, value: d })));
  const symbolsOptions = values(map(symbols, (d) => ({ label: d, value: d })));
*/

  return (
    <div>
      <h3>Alert coin</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="trend-up">Trend</label>
        <div className="form-group">
          <label className="checkbox-inline" htmlFor="trend-up">
            <Field
              name="trend"
              id="trend-up"
              component="input"
              type="radio"
              value="up"
            />{' '}
            ↑
          </label>
          <label className="checkbox-inline" htmlFor="trend-down">
            <Field
              name="trend"
              component="input"
              id="trend-down"
              type="radio"
              value="down"
            />{' '}
            ↓
          </label>
        </div>
        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="price">Select price</label>
          <Field name="price" id="price" component="input" type="number" />
        </div>
        <input
          type="submit"
          disabled={submitting}
          value="Add"
          className="btn btn-default"
        />
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

AlertSettings.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  saveAlert: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  extras: PropTypes.object.isRequired,
};

AlertSettings.defaultProps = {
  error: null,
};

function mapStateToProps({ settings }, { extras }) {
  return {
    alert: find(settings.alerts, (a) => a.slug === extras.slug),
  };
}

export default connect(mapStateToProps, { saveAlert })(
  reduxForm<any, any>({ form: 'settings/alert' })(AlertSettings)
);
