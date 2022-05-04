interface ICoin {
  visibility: boolean;
  symbol: string;
  coin: {
    symbol: string;
  }
  slug: string;
  to: string;
  trend: string;
  price: number;
}

export default ICoin;
