import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty, map, mapValues, values } from 'lodash';
import SelectField from '../../form/SelectField/index';
import { getCoinPrice, getCoins, getExchangeList, getSymbolList, saveCoin } from '../actions';

class CoinsSettings extends Component {
  constructor() {
    super();

    this.onSubmit = ::this.onSubmit;
  }

  componentWillMount() {
    if (isEmpty(this.props.coins)) {
      this.props.getCoins();
    }
    if (isEmpty(this.props.exchanges)) {
      this.props.getExchangeList();
    }
    if (isEmpty(this.props.symbols)) {
      this.props.getSymbolList();
    }
  }

  onSubmit(props) {
    const propsMapped = mapValues(props, (p) => (p.value ? p.value : p));

    return this.props.getCoinPrice(propsMapped, this.props.cryptocompareApiKey)
      .then(() => this.props.saveCoin(propsMapped))
      .then(() => this.props.closeModal())
      .catch((error) => {
        throw new SubmissionError({
          _error: error.Message,
        });
      });
  }

  render() {
    const {
      error,
      submitting,
      coins,
      exchanges,
      symbols,
      handleSubmit,
    } = this.props;

    if (isEmpty(coins)) {
      return <div>Loading...</div>;
    }

    const coinsOptions = values(map(coins.Data, (d) => ({ label: d.FullName, value: d })));
    const exchangesOptions = values(map(exchanges, (d) => ({ label: d, value: d })));
    const symbolsOptions = values(map(symbols, (d) => ({ label: d, value: d })));

    return (
      <div>
        <h3>Add a coin</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <label htmlFor="coin">Select your from symbol*</label>
          <div className="form-group">
            <Field
              name="coin"
              id="coin"
              options={coinsOptions}
              component={SelectField}
            />
          </div>
          <div className="form-group">
            <label htmlFor="to">Select your to symbol*</label>
            <Field
              name="to"
              id="to"
              options={symbolsOptions}
              component={SelectField}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exchange">Select your exchange (default: CCCAGG)</label>
            <Field
              name="exchange"
              id="exchange"
              options={exchangesOptions}
              component={SelectField}
            />
          </div>
          <input type="submit" disabled={submitting} value="Add" className="btn btn-default" />
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    );
  }
}

CoinsSettings.propTypes = {
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  coins: PropTypes.object.isRequired,
  exchanges: PropTypes.array.isRequired,
  symbols: PropTypes.array.isRequired,
  getCoins: PropTypes.func.isRequired,
  getExchangeList: PropTypes.func.isRequired,
  getSymbolList: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  saveCoin: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  cryptocompareApiKey: PropTypes.string.isRequired,
};

CoinsSettings.defaultProps = {
  error: null,
};

function mapStateToProps({ coins, settings }) {
  return {
    cryptocompareApiKey: settings.cryptocompareApiKey,
    coins: coins.data,
    exchanges: coins.exchanges,
    symbols: coins.symbols,
    initialValues: {
      exchange: 'CCCAGG',
    }
  };
}

const dispatchProps = {
  getCoins,
  saveCoin,
  getExchangeList,
  getSymbolList,
  getCoinPrice,
};

export default connect(mapStateToProps, dispatchProps)(reduxForm({ form: 'settings/coins' })(CoinsSettings));
