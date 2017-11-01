// @flow
import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { connect } from "react-redux";
import { find, isEmpty, map, mapValues, values } from "lodash";
import SelectField from "../../form/SelectField/index";
import { getCoinPrice, getCoins, getExchangeList, getSymbolList, saveCoin } from "../actions";

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
    props = mapValues(props, (p) => p.value);

    return this.props.getCoinPrice(props)
      .then(() => {
        return this.props.saveCoin(props);
      })
      .then(() => {
        return this.props.closeModal();
      })
      .catch((error) => {
        throw new SubmissionError({
          _error: error.Message,
        });
      });
  }

  render() {
    const { error, submitting, coins, exchanges, symbols, handleSubmit } = this.props;

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
          <label>Select your from symbol*</label>
          <div className="form-group">
            <Field
              name="coin"
              options={coinsOptions}
              component={SelectField}
            />
          </div>
          <div className="form-group">
            <label>Select your to symbol*</label>
            <Field
              name="to"
              options={symbolsOptions}
              component={SelectField}
            />
          </div>
          <div className="form-group">

            <label>Select your exchange</label>
            <Field
              name="exchange"
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

function mapStateToProps({ coins }) {
  return {
    coins: coins.data,
    exchanges: coins.exchanges,
    symbols: coins.symbols,
  };
}

export default reduxForm({ form: "settings/coins" })(connect(mapStateToProps, { getCoins, saveCoin, getExchangeList, getSymbolList, getCoinPrice })(CoinsSettings));
