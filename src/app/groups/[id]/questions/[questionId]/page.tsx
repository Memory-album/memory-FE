import { Image } from './_components/image';
import { ReceivedMessage } from './_components/received-message';

const Page = () => {
  return (
    <div className="px-4 pt-6 sm:w-[500px] sm:m-auto ForGnbpaddingTop">
      <div className="mb-[35px] flex items-end">
        <Image />
        <ul className="text-xs sm:text-sm">
          <li>
            <h3 className="font-semibold">작성자</h3>
            <p>두칠이</p>
          </li>
          <li>
            <h3 className="font-semibold">날짜</h3>
            <p>19년 1월 1일</p>
          </li>
        </ul>
      </div>
      <ReceivedMessage />
    </div>
  );
};

export default Page;
