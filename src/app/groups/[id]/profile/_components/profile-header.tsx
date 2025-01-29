import { EditImage } from './edit-image';
import { EditProfile } from './edit-profile';

type Props = {
  user: {
    email: string;
    id: number;
    name: string;
    profileImgUrl: string;
  };
};
export const ProfileHeader = ({ user }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <div className="mb-3 size-[180px] rounded-full overflow-hidden">
          {/* 기본값 회원 가입 시 선택한 이미지 */}
          <img
            src={user.profileImgUrl}
            alt="유저 프로필 이미지"
            className="block size-full object-cover"
          />
        </div>
        <EditImage />
      </div>
      <div className="flex justify-center items-center mb-2">
        <strong className="font-bold text-[22px] mr-[9px]">{user.name}</strong>
        <EditProfile name={user.name} />
      </div>
    </div>
  );
};
