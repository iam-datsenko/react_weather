import cn from 'classnames';

import Degree from '../Degree';
import Sunrise from '../icons/Sunrise';
import Sunset from '../icons/Sunset';
import Tile from '../Tile';

import {
  getCurrentDate,
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../../helpers';

import { Details } from '../../types';
import { Loader } from '../Loader';
import { Fragment } from 'react';

type Props = {
  data: Details | null;
  isExist: (data: string) => boolean;
  isLoading: boolean;
  onAdd: (data: string) => void;
  onCloseModal: () => void;
  onUpdate: (value: string) => void;
};

const ForecastPage = ({
  data,
  isExist,
  isLoading,
  onAdd,
  onCloseModal,
  onUpdate,
}: Props) => {
  const { dateTime } = getCurrentDate();

  if (!data) return null;

  const today = data.list[0];
  const exist = isExist(data.city.name);

  return (
    <div className="flex justify-center items-center w-full sm:max-w-[600px] md:max-w-[800px] md:max-h-[596px] mt-2 p-2 bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button
            className="absolute top-2 right-4 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onCloseModal}
          >
            X
          </button>

          <div className="p-8 md:p-2 w-full md:w-[600px]">
            <section className="flex justify-between">
              <button
                className="rounded-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"
                onClick={() => onUpdate(data.city.name)}
              >
                update
              </button>

              <h2 className="text-2xl font-black justify-self-center">
                {data.city.name}{' '}
                <span className="font-thin">{data.city.country}</span>
              </h2>

              <button
                className={cn(
                  'rounded-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer',
                  { 'border-zinc-500 text-zinc-500 cursor-default': exist }
                )}
                onClick={() => onAdd(data.city.name)}
              >
                {exist ? 'added' : 'add'}
              </button>
            </section>

            <section className="text-center">
              <h1 className="text-4xl font-extrabold">
                <Degree temp={Math.round(today.main.temp)} />
              </h1>
              <p className="text-m">{dateTime}</p>
              <p className="text-sm">
                {today.weather[0].main} ({today.weather[0].description})
              </p>
              <p className="text-sm">
                H: <Degree temp={Math.ceil(today.main.temp_max)} /> L:{' '}
                <Degree temp={Math.floor(today.main.temp_min)} />
              </p>
            </section>

            <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
              {data.list.map((item, i) => (
                <div
                  key={i}
                  className="inline-block text-center w-[50px] flex-shrink-0"
                >
                  <p className="text-sm">
                    {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
                  </p>
                  <img
                    alt={`weather-icon-${item.weather[0].description}`}
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  />
                  <p className="text-sm font-bold">
                    <Degree temp={Math.round(item.main.temp)} />
                  </p>
                </div>
              ))}
            </section>

            <section className="flex flex-col md:flex-row items-center flex-wrap justify-between text-zinc-700">
              <div className="w-full md:w-[140px] h-[120px] font-bold flex flex-col items-center justify-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
                <Sunrise />{' '}
                <span className="mt-2">{getSunTime(data.city.sunrise)}</span>
              </div>
              <div className="w-full md:w-[140px] h-[120px] font-bold flex flex-col items-center justify-center bg-white/20 backdrop-blur-ls rounded drop-shadow-lg py-4 mb-5">
                <Sunset />{' '}
                <span className="mt-2">{getSunTime(data.city.sunset)}</span>
              </div>

              <Tile
                icon="wind"
                title="Wind"
                info={`${Math.round(today.wind.speed)} km/h`}
                description={`${getWindDirection(
                  Math.round(today.wind.deg)
                )}, gusts 
              ${today.wind.gust.toFixed(1)} km/h`}
              />

              <Tile
                icon="feels"
                title="Feels like"
                info={<Degree temp={Math.round(today.main.feels_like)} />}
                description={`Feels ${
                  Math.round(today.main.feels_like) <
                  Math.round(today.main.temp)
                    ? 'colder'
                    : 'warmer'
                }`}
              />

              <Tile
                icon="humidity"
                title="Humidity"
                info={`${today.main.humidity} %`}
                description={getHumidityValue(today.main.humidity)}
              />

              <Tile
                icon="pop"
                title="Precipitation"
                info={`${Math.round(today.pop * 100)}%`}
                description={`${getPop(today.pop)}, clouds at ${
                  today.clouds.all
                }%`}
              />

              <Tile
                icon="pressure"
                title="Pressure"
                info={`${today.main.pressure} hPa`}
                description={` ${
                  Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
                } than standard`}
              />

              <Tile
                icon="visibility"
                title="Visibility"
                info={`${(today.visibility / 1000).toFixed()} km`}
                description={getVisibilityValue(today.visibility)}
              />
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default ForecastPage;
