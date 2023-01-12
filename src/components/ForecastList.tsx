import cn from 'classnames';

import { Card } from '../types';

import ForecastListItem from './ForecastListItem';

type Props = {
  forecastList: string[];
  loadCardForecast: (value: string) => Promise<Card>;
  onDelete: (data: string) => void;
  onOpenModal: (value: string) => void;
};

const ForecastList = ({
  forecastList,
  loadCardForecast,
  onDelete,
  onOpenModal,
}: Props) => {
  const isScrollVisible = forecastList.length > 3;

  return (
    <section
      className={cn(
        'flex flex-col md:max-w-[500px] w-full h-[400px] gap-4 pr-2',
        {
          'overflow-y-scroll': isScrollVisible,
        }
      )}
    >
      {forecastList.map((item) => (
        <ForecastListItem
          key={item}
          cityName={item}
          loadCardForecast={loadCardForecast}
          onDelete={onDelete}
          onOpenModal={onOpenModal}
        />
      ))}
    </section>
  );
};

export default ForecastList;
