export const ReceivedMessage = () => {
  return (
    <div className="relative">
      <div
        className="w-0 h-0 top-[-23px] left-[19px] absolute"
        style={{
          borderWidth: '23px 63px',
          borderColor: 'transparent transparent transparent rgb(243, 244, 255)',
        }}
      ></div>
      <div className="p-5 rounded-[20px] bg-[#F3F4FF] text-lg">
        아직 답변을 하지 않았어요
      </div>
    </div>
  );
};
