import Feels from './icons/Feels';
import Humidity from './icons/Humidity';
import Pop from './icons/Pop';
import Pressure from './icons/Pressure';
import Visibility from './icons/Visibility';
import Wind from './icons/Wind';

type Props = {
  icon: 'feels' | 'humidity' | 'pop' | 'pressure' | 'visibility' | 'wind';
  title: string;
  info: string | JSX.Element;
  description?: string | JSX.Element;
};

const icons = {
  feels: Feels,
  humidity: Humidity,
  pop: Pop,
  pressure: Pressure,
  visibility: Visibility,
  wind: Wind,
};

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon];

  return (
    <article className="w-[140px] h-[120px] text-zinc-700 bg-white/20 backdrop-blur-ls rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>

      <div className="text-xs font-bold">{description}</div>
    </article>
  );
};
export default Tile;
