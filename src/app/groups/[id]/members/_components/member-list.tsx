import { AlertKickoutMember } from './alert-kickout-member';
import Image from 'next/image';
import { MemberActionDropdown } from './member-action-dropdown';
import { useState } from 'react';

export const MemberList = () => {
  const [isActive, setIsActive] = useState(false);

  const members = [
    { id: '1', name: '딸', image: '/images/example.png' },
    { id: '2', name: '아들', image: '/images/example2.png' },
    { id: '3', name: '누나', image: '/images/1.png' },
  ];
  // return (
  //   <div className="grid grid-cols-2 gap-4 justify-items-center items-start">
  //     {members.map((member, index) => (
  //       <div>
  //         <div className="mb-[7px] size-[150px] rounded-[5px] overflow-hidden">
  //           <img
  //             src={member.image}
  //             alt="멤버 이미지"
  //             className="block size-full object-cover"
  //           />
  //         </div>
  //         <p className="m-auto text-base text-[#4C4B4B] text-center w-[140px] truncate">
  //           {member.name}
  //         </p>
  //       </div>
  //     ))}
  //     <InviteMember />
  //   </div>
  // );
  return (
    <div className="mt-10 pb-[102px]">
      <div className="flex justify-between mb-[17px]">
        <div className="text-[13px] font-semibold border border-t-0 border-x-0 border-b-2 border-b-[#4848F9]">
          멤버 목록
        </div>
        <MemberActionDropdown setIsActive={setIsActive} />
      </div>
      <div className="grid grid-cols-2 gap-3 items-start justify-items-center">
        {members.map((member) => (
          <MemberItem
            key={member.id}
            isActive={isActive}
            setIsActive={setIsActive}
            imageUrl={member.image}
            username={member.name}
          />
        ))}
      </div>
    </div>
  );
};

type MemberItemProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  imageUrl: string;
  username: string;
};

const MemberItem = ({
  isActive,
  setIsActive,
  imageUrl,
  username,
}: MemberItemProps) => {
  return (
    <div className="relative">
      {isActive && (
        <AlertKickoutMember
          setIsActive={setIsActive}
          groupname="미니언즈 모임"
          username={username}
        />
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="relative mb-3 size-[150px] rounded-[14px] overflow-hidden">
          <Image src={imageUrl} alt="멤버 이미지" fill />
        </div>
        <strong className="mb-[7px] text-sm">{username}</strong>
      </div>
    </div>
  );
};
