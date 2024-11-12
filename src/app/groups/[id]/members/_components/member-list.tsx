import { AlertKickoutMember } from './alert-kickout-member';
import { InviteMember } from './invite-member';

export const MemberList = () => {
  const members = [
    { name: '딸', image: '/images/example.png' },
    { name: '아들', image: '/images/example2.png' },
    { name: '누나' },
    { name: '누나' },
  ];
  return (
    <div className="grid grid-cols-2 gap-11 justify-items-center items-start">
      {members.map((member, index) => (
        <AlertKickoutMember
          key={index}
          name={member.name}
          image={member?.image}
        />
      ))}
      <InviteMember />
    </div>
  );
};
