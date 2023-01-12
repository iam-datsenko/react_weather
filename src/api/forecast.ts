import { Card } from '../types';

const BASE_URL = 'http://api.openweathermap.org';

export const getCardForecast = async (data: string) => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/weather?q=${data},&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  );

  return response.json();
};

export const getForecastDetails = async (data: Card) => {
  const response = await fetch(
    `${BASE_URL}/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&lang=en&appid=${process.env.REACT_APP_API_KEY}`
  );

  return response.json();
};
