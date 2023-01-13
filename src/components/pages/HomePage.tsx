import { Card } from '../../types';

import ForecastList from '../ForecastList';
import Search from '../Search';

type Props = {
  forecastList: string[];
  input: string;
  loadCardForecast: (value: string) => Promise<Card>;
  onDelete: (data: string) => void;
  onInputChange: (value: string) => void;
  onOpenModal: (value: string) => void;
};

const HomePage = ({
  forecastList,
  input,
  loadCardForecast,
  onDelete,
  onInputChange,
  onOpenModal,
}: Props) => (
  <div className="flex flex-col md:flex-row gap-8 m-10 md:m-[100px]">
    <Search
      input={input}
      onInputChange={onInputChange}
      onOpenModal={onOpenModal}
    />

    <ForecastList
      forecastList={forecastList}
      loadCardForecast={loadCardForecast}
      onDelete={onDelete}
      onOpenModal={onOpenModal}
    />
  </div>
);

export default HomePage;
