import { cn } from '@/lib/utils';

type Props = {
  classNames?: string;
  image?: string;
  name: string;
};
export const Item = ({ classNames, image, name }: Props) => {
  const colors = [
    'bg-red-200',
    'bg-slate-500',
    'bg-stone-400',
    'bg-amber-300',
    'bg-lime-200',
  ];

  return (
    <div>
      <div
        className={cn(
          'mb-3 rounded-[10px] overflow-hidden mx-auto',
          classNames,
          colors[Math.floor(Math.random() * (colors.length - 1))],
        )}
      >
        {!image && (
          <img
            src="/images/default-img.png"
            alt=""
            className="block size-full"
          />
        )}
        {image && <img src={image} alt="" className="block size-full" />}
      </div>

      <p className="m-auto text-base text-[#4C4B4B] text-center w-[140px] truncate">
        {name}
      </p>
    </div>
  );
};
