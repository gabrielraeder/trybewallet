const CURRENCIES_API = 'https://economia.awesomeapi.com.br';

export const getCurrencies = async () => {
  const response = await fetch(`${CURRENCIES_API}/json/all`);
  const json = await response.json();
  return json;
};

export const requiredStateCurrValues = async () => {
  const response = await getCurrencies();
  const keys = Object.keys(response);
  const currencies = keys.filter((key) => key !== 'USDT');
  return { currencies };
};
