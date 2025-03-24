'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import PhotoArrangement from './_components/PhotoArrangement';
import useAlbumStore from '@/store/useAlbumStore';
import { useRouter } from 'next/navigation';

const Collection = () => {
  const router = useRouter();
  const { albums, fetchAlbums } = useAlbumStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const collections = [
    {
      id: 1,
      title: '풍경',
      bgImages: [
        './images/1.png',
        './images/2.png',
        './images/3.png',
        './images/4.png',
        './images/5.png',
      ],
    },
    {
      id: 2,
      title: '가족',
      bgImages: [
        './images/3.png',
        './images/2.png',
        './images/1.png',
        './images/4.png',
        './images/5.png',
      ],
    },
    {
      id: 3,
      title: '반려동물',
      bgImages: [
        './images/5.png',
        './images/3.png',
        './images/2.png',
        './images/4.png',
        './images/1.png',
      ],
    },
    {
      id: 4,
      title: '음식',
      bgImages: [
        './images/3.png',
        './images/2.png',
        './images/4.png',
        './images/5.png',
        './images/1.png',
      ],
    },
    {
      id: 5,
      title: '여행',
      bgImages: [
        './images/3.png',
        './images/2.png',
        './images/4.png',
        './images/5.png',
        './images/1.png',
      ],
    },
  ];

  return (
    <main className="ForGnbpaddingTop ForFnbmarginBottom">
      {collections.map((collection) => (
        <Link key={collection.id} href={`/albums/${collection.title}`}>
          <PhotoArrangement
            id={collection.id}
            title={collection.title}
            bgImages={collection.bgImages}
          />
        </Link>
      ))}
      {albums.map((collection) => (
        <Link key={collection.id} href={`/albums/${collection.title}`}>
          <PhotoArrangement
            id={collection.id}
            title={collection.title}
            bgImages={collection.thumbnailUrl}
          />
        </Link>
      ))}
      <div className="flex justify-center items-center">
        <button
          className="bg-[#bbbbbb] text-white px-4 py-2 rounded-[30px] w-[329px] h-[219px] text-[28px] font-semibold"
          onClick={() => router.push('/albums/add')}
        >
          앨범 추가하기
        </button>
      </div>
    </main>
  );
};

export default Collection;
