
function formatPrice(price, currency) {
  const symbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
  };

  return `${symbols[currency]}${price}`;
}

export default formatPrice;
