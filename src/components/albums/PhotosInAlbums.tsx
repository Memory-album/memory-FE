'use client';

import Image from 'next/image';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { usePathname } from 'next/navigation';

const PhotosInAlbum = () => {
  const pathname = usePathname();

  const [images, setImages] = useState([
    { id: '0', src: '/images/example.png', isLiked: true },
    { id: '1', src: '/images/example2.png', isLiked: true },
    { id: '2', src: '/images/1.png', isLiked: true },
    { id: '3', src: '/images/2.png', isLiked: true },
    { id: '4', src: '/images/3.png', isLiked: true },
    { id: '5', src: '/images/4.png', isLiked: true },
    { id: '6', src: '/images/5.png', isLiked: true },
    { id: '7', src: '/images/6.png', isLiked: true },
  ]);

  const toggleLike = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, isLiked: !image.isLiked } : image,
      ),
    );
  };

  return (
    <div className="ForGnbpaddingTop ForFnbmarginBottom mx-4">
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 500: 2, 600: 3, 1200: 4, 1400: 5 }}
      >
        <Masonry columnsCount={3} gutter="15px">
          {images.map((image, i) => (
            <div className="relative" key={i}>
              <Link href={`${pathname}/photo/${image.id}`} key={image.id}>
                <img
                  src={image.src}
                  style={{ width: '100%', display: 'block' }}
                  className="rounded-[10px] cursor-pointer"
                  alt={image.id}
                />
              </Link>
              <div className="absolute bottom-[7px] left-[7px] flex items-end">
                <Avatar className="w-7 h-7 text-white">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <p className="text-[11px] pl-1">김덕철</p>
              </div>
              <div className="absolute bottom-[7px] right-[7px]">
                <button
                  className="bg-white w-7 h-7 rounded-full flex items-center justify-center"
                  onClick={() => toggleLike(i)}
                >
                  {image.isLiked ? (
                    <GoHeartFill
                      fill="red"
                      className="transition-transform transform scale-125 duration-300"
                    />
                  ) : (
                    <GoHeart className="transition-transform transform scale-125 duration-300" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default PhotosInAlbum;
