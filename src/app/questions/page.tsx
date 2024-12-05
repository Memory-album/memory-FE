'use client';
import { SearchForm } from '@/components/common/search-form';
import { QuestionList } from './_components/question-list';
import { useState } from 'react';

const Page = () => {
  const [input, setInput] = useState('');
  return (
    <div className="m-auto w-full pb-[100px] sm:w-[500px] sm:m-auto pt-2 bg-[#FAFCFF] ForGnbpaddingTop">
      <SearchForm input={input} setInput={setInput} />
      <QuestionList searchText={input} />
    </div>
  );
};

export default Page;
