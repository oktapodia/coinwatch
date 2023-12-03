import axios from 'axios';
// @ts-ignore
import qs from 'query-string';

// export const BASE_URL = 'https://api.coinpaprika.com/v1';
export const BASE_URL = 'https://api.coincap.io/v2';
export const BASE_IMAGE_URL = 'https://api.coinpaprika.com/';

enum ESymbol {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  BTC = 'BTC',
  ETH = 'ETH',
}

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: 'coin';
}

interface IQuote {
  price: number;
}

interface ITicker {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  quotes: {
    [key: string]: IQuote; // key is ESymbol
  };
}

interface IErrorResponse {
  Response: 'Error';
}

/**
 * ONLY WORKING IN USD
 */
// @ts-ignore
export async function getCoinPriceApi({
  coin,
}: {
  coin: ICoin;
}) {
  // const ticker = await coinpaprika.getTicker({ coinId: coin.id });

  // console.log(ticker)

  // return { data: { to: ticker.quotes[to].price.toFixed(2) } }

  // const query = qs.stringify({
  //   quotes: to,
  // });

  const url = `${BASE_URL}/assets/${coin.id}`;
  return axios.get<{ data: ITicker & IErrorResponse }>(url).then((response) => {
    console.log(response.data.data.priceUsd);
    return { data: { to: parseFloat(response.data.data.priceUsd).toFixed(2) } };
  });
}

// @ts-ignore
function transformCoin(coin) {
  return {
    id: coin.id,
    price: coin.priceUsd,
    name: coin.name,
  };
}

export async function getCoinListApi() {
  // const coins = await coinpaprika.getCoins();

  // console.log('cc', coins)
  //   return coins.map((coin: ICoin) => ({ label: coin.name, value: coin }));
  const url = `${BASE_URL}/assets`;

  // const request = new Request(url, { method: 'GET' });
  // const data = await fetch(request);

  // console.log('dd', await data.json())

  // return (await data.json()).map((coin: ICoin) => ({ label: coin.name, value: coin }));

  return axios.get<{ data: ICoin[] }>(url).then((response) => {
    return {
      data: response.data.data.map((coin) => ({
        label: coin.name,
        value: coin,
      })),
    };
  });
}

export function getSymbolListApi(): Promise<{ data: ESymbol[] }> {
  return Promise.resolve({
    data: [ESymbol.EUR, ESymbol.USD, ESymbol.GBP, ESymbol.BTC, ESymbol.ETH],
  });
}
