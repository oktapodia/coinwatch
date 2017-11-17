function trendToArrow(price, trend) {
  let formattedPrice = price;

  if (trend === 'lower') {
    formattedPrice += '↓';
  } else if (trend === 'higher') {
    formattedPrice += '↑';
  }

  return formattedPrice;
}

export default trendToArrow;
