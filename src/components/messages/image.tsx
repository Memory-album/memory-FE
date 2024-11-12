export const Image = () => {
  return (
    <div className="relative flex justify-center items-center w-full aspect-auto mb-[30px]">
      <img
        className="rounded-md object-cover"
        src="/images/example.png"
        alt="앨범 사진"
      />
    </div>
  );
};
