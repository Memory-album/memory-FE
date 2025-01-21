import { RiQuestionAnswerLine } from 'react-icons/ri';
import { BiGroup } from 'react-icons/bi';
import { AlertLeaveGroup } from './alert-leave-group';
import Link from 'next/link';

export const ProfileNav = () => {
  return (
    <nav className="py-[30px] px-5 bg-white">
      <ul className="text-lg font-medium">
        <li className="mb-5">
          <Link href="/questions" className="flex items-center">
            <RiQuestionAnswerLine className="mr-[15px] text-[28px]" />
            <span>내 질문 보기</span>
          </Link>
        </li>
        <li className="mb-5">
          <Link href="/groups/id/members" className="flex items-center">
            <BiGroup className="mr-[15px] text-[28px]" />
            <span>내 그룹 멤버 보기</span>
          </Link>
        </li>
        <li>
          <AlertLeaveGroup />
        </li>
      </ul>
    </nav>
  );
};
