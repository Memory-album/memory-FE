import Image from 'next/image';
import { GroupActionDrawer } from './group-action-drawer';

export const UserGroups = () => {
  return (
    <div className="mt-10 pb-[102px]">
      <div className="flex justify-between mb-[17px]">
        <div className="text-[13px] font-semibold border border-t-0 border-x-0 border-b-2 border-b-[#4848F9]">
          참여 그룹
        </div>
        <GroupActionDrawer />
      </div>
      <div className="grid grid-cols-2 gap-3 items-start justify-items-center">
        <div>
          <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden cursor-pointer hover:opacity-90">
            <Image src="/images/1.png" alt="그룹 이미지" fill />
          </div>
          <strong className="mb-[7px] text-sm">그룹 이름</strong>
          <p className="mb-[7px] text-xs">그룹설명</p>
          <p className="text-[10px] text-[#555555]">@그룹장이름</p>
        </div>
        <div>
          <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden cursor-pointer hover:opacity-90">
            <Image src="/images/1.png" alt="그룹 이미지" fill />
          </div>
          <strong className="mb-[7px] text-sm">그룹 이름</strong>
          <p className="mb-[7px] text-xs">그룹설명</p>
          <p className="text-[10px] text-[#555555]">@그룹장이름</p>
        </div>
        <div>
          <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden cursor-pointer hover:opacity-90">
            <Image src="/images/1.png" alt="그룹 이미지" fill />
          </div>
          <strong className="mb-[7px] text-sm">그룹 이름</strong>
          <p className="mb-[7px] text-xs">그룹설명</p>
          <p className="text-[10px] text-[#555555]">@그룹장이름</p>
        </div>
      </div>
    </div>
  );
};
