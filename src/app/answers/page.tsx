import { AnswerList } from './_components/answer-list';
import { SearchForm } from '@/components/common/search-form';

const Page = () => {
  return (
    <div className="m-auto w-full sm:w-[500px] sm:m-auto h-screen pt-[140px] bg-[#FAFCFF]">
      <SearchForm />
      <AnswerList />
    </div>
  );
};

export default Page;
