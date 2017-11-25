function trendToArrow(trend) {
  let formattedPrice = null;

  if (trend === 'lower') {
    formattedPrice = '↓';
  } else if (trend === 'higher') {
    formattedPrice = '↑';
  }

  return formattedPrice;
}

export default trendToArrow;
