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
  const isScrollVisible = forecastList.length > 2;

  return (
    <section
      className={cn(
        'flex flex-col gap-4 md:pr-2 min-w-[320px] md:max-w-[500px] w-full h-[400px]',
        {
          'md:overflow-y-scroll': isScrollVisible,
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
