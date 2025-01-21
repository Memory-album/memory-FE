import { EditImage } from './edit-image';
import { EditProfile } from './edit-profile';

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="relative">
        <div className="mb-3 size-[180px] rounded-full overflow-hidden">
          {/* 기본값 회원 가입 시 선택한 이미지 */}
          <img
            src="/images/example2.png"
            alt=""
            className="block size-full object-cover"
          />
        </div>
        <EditImage />
      </div>
      <div className="flex justify-center items-center mb-2">
        <strong className="font-bold text-[22px] mr-[9px]">이양장님</strong>
        <EditProfile name="이양장" />
      </div>
    </div>
  );
};
