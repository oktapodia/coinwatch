import { has } from 'lodash';

function formatPrice(price, currency) {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BTC: '฿',
    ETH: 'Ξ'
  };

  if (!has(symbols, currency)) {
    return `${currency} ${price}`;
  }

  return `${symbols[currency]}${price}`;
}

export default formatPrice;
