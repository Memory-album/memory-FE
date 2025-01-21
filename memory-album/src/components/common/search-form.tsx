import { CiSearch } from 'react-icons/ci';

import { Input } from '@/components/ui/input';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface List {
  id: number;
  sender: string;
  questions: string[];
  date: string;
  img: string;
}

type Props = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};

export const SearchForm = ({ input, setInput }: Props) => {
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className="relative mx-[15px] mb-10">
      <CiSearch className="absolute top-2 left-3 size-6 text-button font-semibold cursor-pointer" />
      <Input
        className="h-10 rounded-[20px] pl-10 text-base focus:border-[#4848F9]"
        name="search"
        id="search"
        placeholder="검색"
        value={input}
        onChange={handleChangeInput}
      />
    </div>
  );
};
