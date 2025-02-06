'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { FaEdit, FaUsers, FaQuestionCircle, FaKey } from 'react-icons/fa';
// TODO: 그룹 수정, 초대 코드 오너만 ..
export const DashboardMenu = () => {
  const { id } = useParams();

  return (
    <div className="bg-[#F2F7FF] rounded-[14px] py-[26px] px-2">
      <ul>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaEdit className="opacity-60" />
          <Link href={`/groups/${id}/edit`}>그룹 수정</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaUsers className="opacity-60" />
          <Link href={`/groups/${id}/members`}>멤버 보기</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaQuestionCircle className="opacity-60" />
          <Link href={`/groups/${id}/questions`}>내 질문 보기</Link>
        </li>
        <li className="flex items-center gap-2 hover:bg-[#e1e6ed] p-2 rounded-[5px] cursor-pointer">
          <FaKey className="opacity-60" />
          {/* TODO: 초대 코드 조회  */}
          <Link href="#">그룹 초대 코드</Link>
        </li>
      </ul>
    </div>
  );
};
