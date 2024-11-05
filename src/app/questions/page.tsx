import { SearchForm } from '@/components/common/search-form';
import { QuestionList } from './_components/question-list';

const Page = () => {
  return (
    <div className="m-auto w-full sm:w-[500px] sm:m-auto pt-2 bg-[#FAFCFF]">
      <SearchForm />
      <QuestionList />
    </div>
  );
};

export default Page;
