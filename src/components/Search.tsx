import { FormEvent } from 'react';
import Header from './Header';

type Props = {
  input: string;
  onInputChange: (value: string) => void;
  onOpenModal: (value: string) => void;
};

const Search = ({ input, onInputChange, onOpenModal }: Props) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onOpenModal(input.trim());
  };

  return (
    <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[400px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
      <Header />

      <form className="relative flex mt-10 md:mt-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          className="px-2 py-1 rounded-l-md border-2 border-white"
          onChange={(e) => onInputChange(e.target.value)}
        />
        <button
          className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
          onClick={handleSubmit}
        >
          search
        </button>
      </form>
    </section>
  );
};

export default Search;
