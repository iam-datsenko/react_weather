import { useCallback, useEffect, useState } from 'react';

import Degree from './Degree';

import { getCurrentDate } from '../helpers';

import { Card, ErrorType } from '../types';
import { Loader } from './Loader';
import Error from './Error';

type Props = {
  cityName: string;
  loadCardForecast: (value: string) => Promise<Card>;
  onDelete: (data: string) => void;
  onOpenModal: (value: string) => void;
};

const ForecastListItem = ({
  cityName,
  loadCardForecast,
  onDelete,
  onOpenModal,
}: Props) => {
  const [cardForecast, setCardForecast] = useState<Card | null>(null);
  const [error, setError] = useState<ErrorType>(ErrorType.None);
  const [isLoading, setIsLoading] = useState(false);

  const { time } = getCurrentDate();

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);

      const newCardForecast = await loadCardForecast(cityName);
      setCardForecast(newCardForecast);

      setIsLoading(false);
    } catch {
      setError(ErrorType.LoadError);
    }
  }, [cityName, loadCardForecast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (error !== ErrorType.None) return <Error error={error} />;

  if (isLoading && error === ErrorType.None) return <Loader />;

  if (!cardForecast) return null;

  return (
    <section className="w-full min-h-[152px] md:max-w-[500px] flex flex-col md:px-4 lg:p-6 bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
      <h2 className="text-2xl font-black justify-self-center pb-2">
        {cardForecast.name}{' '}
        <span className="font-thin">{cardForecast.sys.country}</span>
      </h2>

      <section className="flex justify-between">
        <div>
          <p className="text-m">{time}</p>

          <p className="text-sm">
            {cardForecast.weather[0].main} (
            {cardForecast.weather[0].description})
          </p>

          <p className="text-sm">
            H: <Degree temp={Math.ceil(cardForecast.main.temp_max)} /> L:{' '}
            <Degree temp={Math.floor(cardForecast.main.temp_min)} />
          </p>
        </div>

        <h1 className="text-4xl font-extrabold">
          <Degree temp={Math.round(cardForecast.main.temp)} />
        </h1>
      </section>

      <button
        className="absolute top-2 right-4 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer text-xl"
        onClick={() => onDelete(cityName)}
      >
        x
      </button>

      <button
        className="absolute bottom-2 right-4 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer text-xl"
        onClick={() => onOpenModal(cityName)}
      >
        🠖
      </button>
    </section>
  );
};

export default ForecastListItem;
