'use client';
import { useState } from 'react';
import { AnswerList } from './_components/answer-list';
import { SearchForm } from '@/components/common/search-form';

const Page = () => {
  const [input, setInput] = useState('');
  return (
    <div className="m-auto w-full sm:w-[500px] sm:m-auto h-screen bg-[#FAFCFF]">
      <SearchForm input={input} setInput={setInput} />
      <AnswerList searchText={input} />
    </div>
  );
};

export default Page;
