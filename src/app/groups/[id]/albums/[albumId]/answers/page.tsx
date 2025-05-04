'use client';
import { useState } from 'react';
import { AnswerList } from './_components/answer-list';
import { SearchForm } from '@/components/common/search-form';

type Props = {
  params: { id: string; albumId: string };
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const albumId = params.albumId;
  const [input, setInput] = useState('');

  return (
    <div className="w-full sm:w-[500px] sm:mx-auto bg-[#FAFCFF]">
      <SearchForm input={input} setInput={setInput} />
      <AnswerList searchText={input} albumId={albumId} groupId={id} />
    </div>
  );
};

export default Page;
