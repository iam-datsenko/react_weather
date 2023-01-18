import { useCallback, useEffect, useState } from 'react';

import { Details, ErrorType } from './types';
import Error from './components/Error';
import HomePage from './components/pages/HomePage';
import ForecastPage from './components/pages/ForecastPage';
import { getCardForecast, getForecastDetails } from './api/forecast';
import { Loader } from './components/Loader';

const localData = localStorage.getItem('list');

const App = (): JSX.Element => {
  const [forecastList, setForecastList] = useState<string[]>(
    localData ? JSON.parse(localData) : []
  );
  const [forecastDetails, setForecastDetails] = useState<Details | null>(null);
  const [input, setInput] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>(ErrorType.None);

  const loadCardForecast = useCallback(async (value: string) => {
    const newCardForecast = await getCardForecast(value);

    return newCardForecast;
  }, []);

  const loadForecastDetails = useCallback(
    async (value: string) => {
      setIsLoading(true);
      const newCardForecast = await loadCardForecast(value);

      if (!newCardForecast) return;

      const newForecastDetails = await getForecastDetails(newCardForecast);
      setForecastDetails(newForecastDetails);
    },
    [loadCardForecast]
  );

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(forecastList));
  }, [forecastList]);

  const onInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const isExist = useCallback(
    (data: string) => {
      return forecastList.some((item) => item === data);
    },
    [forecastList]
  );

  const onAdd = useCallback(
    (data: string) => {
      const exist = isExist(data);
      if (exist) return;

      setForecastList([...forecastList, data]);
    },
    [forecastList, isExist]
  );

  const onDelete = useCallback(
    (data: string) => {
      const exist = isExist(data);
      if (!exist) return;

      const filteredList = forecastList.filter((item) => item !== data);
      setForecastList(filteredList);
    },
    [forecastList, isExist]
  );

  const onUpdate = useCallback(
    async (value: string) => {
      try {
        setIsLoading(true);

        await loadForecastDetails(value);

        setIsLoading(false);
      } catch {
        setError(ErrorType.UpdateError);
        setIsModalOpen(false);
      }
    },
    [loadForecastDetails]
  );

  const onOpenModal = useCallback(
    async (value: string) => {
      try {
        setIsModalOpen(true);
        setIsLoading(true);

        await loadForecastDetails(value);

        setIsLoading(false);
      } catch {
        setError(ErrorType.LoadError);
        setIsModalOpen(false);
      } finally {
        setInput('');
        setIsLoading(false);
      }
    },
    [loadForecastDetails]
  );

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setForecastDetails(null);
    setError(ErrorType.None);
  }, []);
  
  if (isLoading) return <Loader />;

  return (
    <main className="flex flex-col justify-center items-center h-full w-full">
      {isModalOpen && (
        <ForecastPage
          data={forecastDetails}
          isExist={isExist}
          isLoading={isLoading}
          onAdd={onAdd}
          onCloseModal={onCloseModal}
          onUpdate={onUpdate}
        />
      )}

      {!isModalOpen && (
        <HomePage
          forecastList={forecastList}
          input={input}
          loadCardForecast={loadCardForecast}
          onDelete={onDelete}
          onInputChange={onInputChange}
          onOpenModal={onOpenModal}
        />
      )}

      {error !== ErrorType.None && !isModalOpen && <Error error={error} />}
    </main>
  );
};

export default App;
