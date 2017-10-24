import axios from 'axios';

export function getIcosListApi() {
  const url = 'https://api.icowatchlist.com/public/v1/';

  return axios.get(url);
}
