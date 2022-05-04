import { has } from 'lodash';

function formatPrice(price: number, currency: string) {
  const symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    BTC: '฿',
    ETH: 'Ξ',
  };

  if (!has(symbols, currency)) {
    return `${currency} ${price}`;
  }

  return `${symbols[currency]}${price}`;
}

export default formatPrice;
