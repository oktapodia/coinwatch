// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import { saveAlert } from '../actions';
import { closeModal } from '../../modal/actions';

function AlertSettings(props: any) {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.alerts.settings);
  const alert = find(settings.alerts, (a) => a.slug === extras.slug);

  const onSubmit = (data: any) => {
    dispatch(saveAlert({ ...data, slug: extras.slug }));
    dispatch(closeModal());
  };

  return (
    <div>
      <h3>Alert coin</h3>
      <Form onSubmit={onSubmit}>
        {({ error, submitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
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
            {error && <div className="error">{error}</div>}
          </form>
        )}
      </Form>
    </div>
  );
}

AlertSettings.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  extras: PropTypes.object.isRequired,
};

export default AlertSettings;
