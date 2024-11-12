export const ReceivedMessage = () => {
  return (
    <div className="flex items-end mb-[25px] pl-[30px]">
      <div className="mr-5 w-[50px] h-[50px] rounded-full">
        <img
          className="rounded-full w-full h-full object-cover block"
          src="/images/profile.png"
          alt="프로필 이미지"
        />
      </div>

      <div className="py-3 px-[17px] max-w-[240px] bg-[#ABA5FF] rounded-[20px] rounded-bl-none text-white text-base">
        엄마 이사진 기억나??
      </div>
    </div>
  );
};
