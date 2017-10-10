import axios from 'axios';

export const BASE_IMAGE_URL = 'https://www.cryptocompare.com';

export function getCoinPriceApi(symbol) {
  const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`;
  return axios
    .get(url)
    .then((response) => {
      if (response.data.Response === 'Error') {
        throw response.data;
      }

      return response;
    });
}

export function getCoinListApi() {
  const url = 'https://www.cryptocompare.com/api/data/coinlist';

  return axios.get(url);
}
