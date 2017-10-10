// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { find, isEmpty, map, values } from 'lodash';
import SelectField from '../../form/SelectField/index';
import { getCoins } from '../../coins/actions';
import { saveCoinSettings, removeCoinSettings } from '../actions';

class CoinsSettings extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    if (isEmpty(this.props.coins)) {
      this.props.getCoins();
    }
  }

  onSubmit({ coin }) {
    this.props.saveCoinSettings(coin.value);
  }

  onRemove(coin) {
    this.props.removeCoinSettings(coin);
  }

  render() {
    const { coins, handleSubmit, followedCoins } = this.props;

    if (isEmpty(coins)) {
      return <div>Loading...</div>;
    }

    const options = values(map(coins.Data, (d) => ({ label: d.FullName, value: d })));

    const followedCoinsDisplay = map(followedCoins, (fc) => {
      return (
        <div key={fc.Id}>
          <img src={`${coins.BaseImageUrl}${fc.ImageUrl}`} width={30} />
          {fc.FullName}
          <span className="glyphicon glyphicon-remove-circle" onClick={() => this.onRemove(fc)} />
        </div>
      );
    });

    return (
      <div>
        <h3>Coin settings</h3>

        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="input-group">
            <Field
              name="coin"
              options={options}
              component={SelectField}
            />
            <span className="input-group-btn">
              <input className="btn btn-default" type="submit" value="Add" />
            </span>
          </div>
        </form>
        <div>
          <h3>You are following these coins:</h3>
          {followedCoinsDisplay}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ coins }) {
  return {
    coins: coins.data,
  };
}

export default reduxForm({ form: 'settings/coins' })(connect(mapStateToProps, { getCoins, saveCoinSettings, removeCoinSettings })(CoinsSettings));
