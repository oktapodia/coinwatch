function trendToArrow(trend) {
  let formattedPrice = '';

  if (trend === 'lower') {
    formattedPrice = '↓';
  } else if (trend === 'higher') {
    formattedPrice = '↑';
  }

  return formattedPrice;
}

export default trendToArrow;
