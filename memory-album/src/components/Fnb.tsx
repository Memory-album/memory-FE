import Image from 'next/image';
import Link from 'next/link';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Album02Icon } from 'hugeicons-react';
import { Home11Icon } from 'hugeicons-react';
import { FavouriteIcon } from 'hugeicons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Fnb = () => {
  return (
    <footer className="w-[390px] h-[87px] fixed bottom-0 left-0 right-0">
      <div className="w-full h-16 fixed bottom-0 left-0 right-0 bg-[#DAE2FF] rounded-t-[14px]">
        <div className="py-8">
          <Home11Icon />
          <FavouriteIcon />
          <Album02Icon />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div
        className="w-[70px] h-[45px] fixed bottom-[42px]  rounded-tl-full rounded-tr-full"
        style={{ left: 'calc(50% - 35px)' }}
      >
        <svg width="70" height="45" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="35" cy="23" rx="35" ry="23" fill="#DAE2FF" />
        </svg>
      </div>

      <BsPlusCircleFill
        className="w-12 h-12 text-[#4848f9] bg-white rounded-full fixed bottom-[32px]"
        style={{ left: 'calc(50% - 1.5rem)' }}
      ></BsPlusCircleFill>
    </footer>
  );
};

export default Fnb;
