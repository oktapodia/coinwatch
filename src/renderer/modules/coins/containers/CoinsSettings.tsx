// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/destructuring-assignment */

import React, { useCallback, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, map, mapValues, values } from 'lodash';
import { Button } from '@material-ui/core';
import SelectField from '../../form/SelectField';
import { getCoinPrice, getCoins, getSymbolList, saveCoin } from '../actions';
import { closeModal } from '../../modal/actions';

function CoinsSettings() {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.data);
  const symbols = useSelector((state) => state.coins.symbols);

  useEffect(() => {
    dispatch(getCoins());
    dispatch(getSymbolList());
  }, [dispatch]);

  const onSubmit = (props) => {
    const propsMapped = mapValues(props, (p) => (p.value ? p.value : p));

    return dispatch(getCoinPrice(propsMapped))
      .then((res) => {
        console.log('result', res)
      })
      .then(() => dispatch(saveCoin(propsMapped)))
      .then(() => dispatch(closeModal()))
      .catch((error) => {
        return error;
        // throw new SubmissionError({
        //   _error: error.Message,
        // });
      });
  };

  if (isEmpty(coins)) {
    return <div>Loading...</div>;
  }

  const coinsOptions = coins;
  console.log('---', coins)
  const symbolsOptions = values(map(symbols, (d) => ({ label: d, value: d })));

  return (
    <div>
      <h3>Add a coin</h3>
      <Form onSubmit={onSubmit}>
        {({ error, submitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Field
                name="coin"
                id="coin"
                options={coinsOptions}
                component={SelectField}
                margin="normal"
                label="Select your FROM symbol*"
              />
            </div>
            <div className="form-group">
              <Field
                name="to"
                id="to"
                options={symbolsOptions}
                component={SelectField}
                margin="normal"
                label="Select your TO symbol*"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              disabled={submitting}
              type="submit"
            >
              Add
            </Button>
            {error && <div className="error">{error}</div>}
          </form>
        )}
      </Form>
    </div>
  );
}

CoinsSettings.propTypes = {
  error: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.any.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  symbols: PropTypes.array.isRequired,
  getCoins: PropTypes.func.isRequired,
  getSymbolList: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  saveCoin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

CoinsSettings.defaultProps = {
  error: null,
};

function mapStateToProps({ coins }) {
  return {
    coins: coins.data,
    symbols: coins.symbols,
    initialValues: {
      exchange: 'CCCAGG',
    },
  };
}

const dispatchProps = {
  getCoins,
  saveCoin,
  getSymbolList,
  getCoinPrice,
};

export default connect(mapStateToProps, dispatchProps)(CoinsSettings);
