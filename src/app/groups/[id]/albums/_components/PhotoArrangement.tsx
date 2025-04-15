interface PhotoArrangementProps {
  id: number;
  title: string;
  bgImages: string[];
}

const PhotoArrangement = ({ id, title, bgImages }: PhotoArrangementProps) => {
  const layouts: Record<number, string[]> = {
    1: [
      'w-[54px] h-[85px] rounded-full absolute top-[69px]',
      'w-[186px] h-[117px] rounded-[10px] absolute right-0 bottom-[33px]',
      'w-[157px] h-[117px] rounded-[10px] absolute left-[64px] outline outline-[10px] outline-[#fafcff]',
      'w-[98px] h-[59px] rounded-[10px] absolute right-0',
      'w-[69px] h-[59px] rounded-[10px] absolute left-[64px] bottom-[33px]',
    ],
    2: [
      'w-[139px] h-[139px] rounded-[10px] absolute top-[67px]',
      'w-[209px] h-[123px] rounded-[10px] absolute right-0 bottom-0 outline outline-[10px] outline-[#fafcff]',
      'w-[130px] h-[130px] rounded-[10px] absolute left-[91px] outline outline-[10px] outline-[#fafcff]',
      'w-[99px] h-[46px] rounded-[10px] absolute top-[38px] right-0',
    ],
    3: [
      'w-[54px] h-[117px] rounded-[10px] absolute bottom-0',
      'w-[47px] h-[76px] rounded-[10px] absolute left-[64px] bottom-[79px]',
      'w-[200px] h-[70px] rounded-[10px] absolute left-[64px] bottom-0',
      'w-[202px] h-[127px] rounded-[10px] absolute right-[7px] top-[13px]',
      'w-[135px] h-[117px] rounded-[10px] absolute right-0 bottom-0 outline outline-[10px] outline-[#fafcff]',
    ],
    4: [
      'w-[117px] h-[117px] rounded-[10px] absolute left-0 bottom-0',
      'w-[121px] h-[60px] rounded-[10px] absolute left-[64px] bottom-0 outline outline-[10px] outline-[#fafcff]',
      'w-[135px] h-[206px] rounded-[10px] absolute right-0 bottom-0',
      'w-[59px] h-[136px] rounded-[10px] absolute left-[126px] top-[14px]',
      'w-[63px] h-[63px] rounded-[10px] absolute left-[53px] top-[30px]',
    ],
  };

  const randomLayout = Math.floor(Math.random() * 4);
  const layout = layouts[randomLayout] || [];

  return (
    <div className="mb-[50px]">
      <h3 className="text-[28px] text-[#5f81ff] font-semibold ml-8 mb-4 drop-shadow-md">
        {title}
      </h3>
      <div className="mx-auto w-[329px] h-[219px] relative">
        {bgImages.length > 0 ? (
          bgImages.map((image, index) => (
            <div
              key={index}
              className={layout[index]}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-[10px]">
            <p className="text-gray-500 text-lg">아직 사진이 없어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoArrangement;
