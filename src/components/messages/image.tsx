type Props = {
  imageSrc: string;
};

export const Image = ({ imageSrc }: Props) => {
  return (
    <div className="mb-10 my-auto">
      <div className="w-[290px] max-h-[450px] m-auto rounded-[20px] overflow-hidden">
        <img
          className="size-full aspect-auto object-contain"
          src={imageSrc}
          alt="앨범 사진"
        />
      </div>
    </div>
  );
};
