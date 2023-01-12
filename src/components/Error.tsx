import { ErrorType } from '../types';

type Props = {
  error: ErrorType;
};

const Error = ({ error }: Props) => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg p-4 mt-4">
      <h1 className="text-xl text-zinc-700 font-black">
        Error: <span className="font-thin">{error}</span>
      </h1>
    </div>
  );
};

export default Error;
