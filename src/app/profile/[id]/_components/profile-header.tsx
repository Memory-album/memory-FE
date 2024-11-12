import { EditProfile } from './edit-profile';

export const ProfileHeader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-3 size-[180px] bg-[#CB82DC] rounded-full overflow-hidden">
        <img
          src="/images/default-img.png"
          alt=""
          className="block size-[160px] relative top-2 left-3"
        />
      </div>
      <div className="flex justify-center items-center mb-2">
        <strong className="font-bold text-[22px] mr-[9px]">이양장님</strong>
        <EditProfile />
      </div>
      <div className="mb-5 inline-flex justify-center items-center w-[60px] h-[30px] bg-[#4848F9] text-white rounded-[20px]">
        나
      </div>
    </div>
  );
};
