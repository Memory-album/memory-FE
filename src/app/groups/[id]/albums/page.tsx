'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PhotoArrangement from './_components/PhotoArrangement';
import { useRouter } from 'next/navigation';
import { addNewAlbum } from '@/lib/albums/addNewAlbum';

const Collection = () => {
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
  const router = useRouter();
  const [addAlbums, setAddAlbums] = useState(false);
  const [localAlbums, setLocalAlbums] = useState<
    Array<{
      id: number;
      title: string;
      bgImages: string[];
    }>
  >([]);
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    theme: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAlbum((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAlbum = async () => {
    if (!newAlbum.title || !newAlbum.theme || !newAlbum.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // API 호출 (실제로는 응답을 받아서 처리해야 하지만, 현재는 무시)
      await addNewAlbum({
        title: newAlbum.title,
        theme: newAlbum.theme,
        description: newAlbum.description,
        groupId: 1, // 실제 groupId로 교체 필요
      });

      // 로컬 상태에 새 앨범 추가
      const newLocalAlbum = {
        id: collections.length + localAlbums.length + 1,
        title: newAlbum.title,
        bgImages: ['./images/1.png'], // 기본 이미지
      };

      setLocalAlbums((prev) => [...prev, newLocalAlbum]);

      // 입력 필드 초기화
      setNewAlbum({
        title: '',
        theme: '',
        description: '',
      });

      // 팝업 닫기
      setAddAlbums(false);
    } catch (error) {
      console.error('앨범 추가 실패:', error);
      alert('앨범 추가에 실패했습니다.');
    }
  };

  const popupAddAlbums = () => {
    setAddAlbums((prev) => !prev);
    console.log('팝업');
  };

  return (
    <main className="ForGnbpaddingTop ForFnbmarginBottom">
      {addAlbums && (
        <div
          className="bg-black/[.28] w-screen h-screen fixed top-0 z-10"
          onClick={popupAddAlbums}
        ></div>
      )}
      <div
        className={`bg-white w-[300px] h-[500px] rounded-[30px] fixed z-20 ${
          addAlbums ? 'block' : 'hidden'
        }`}
        style={{
          left: 'calc(50% - 150px)',
          bottom: 'calc(50% - 250px)',
        }}
      >
        <div className="flex flex-col gap-4 mt-[50px]">
          <label className="mx-6" htmlFor="albums">
            앨범 이름
          </label>
          <input
            className="mx-6"
            id="albums"
            type="text"
            placeholder="앨범 이름"
            name="title"
            value={newAlbum.title}
            onChange={handleInputChange}
          />
          <label className="mx-6" htmlFor="theme">
            테마
          </label>
          <input
            className="mx-6"
            id="theme"
            type="text"
            placeholder="테마"
            name="theme"
            value={newAlbum.theme}
            onChange={handleInputChange}
          />
          <label className="mx-6" htmlFor="description">
            설명
          </label>
          <input
            className="mx-6"
            id="description"
            type="text"
            placeholder="설명"
            name="description"
            value={newAlbum.description}
            onChange={handleInputChange}
          />
          <button
            className="mx-auto mt-[40px] bg-[#4970ff] text-white px-4 py-2 rounded-[17px] w-[200px] h-[78px] text-[23px] font-semibold"
            onClick={handleAddAlbum}
          >
            추가
          </button>
        </div>
      </div>
      {collections.map((collection) => (
        <Link key={collection.id} href={`/groups/1/albums/${collection.title}`}>
          <PhotoArrangement
            id={collection.id}
            title={collection.title}
            bgImages={collection.bgImages}
          />
        </Link>
      ))}
      {localAlbums.map((album) => (
        <Link key={album.id} href={`/groups/1/albums/${album.title}`}>
          <PhotoArrangement
            id={album.id}
            title={album.title}
            bgImages={album.bgImages}
          />
        </Link>
      ))}
      <div className="flex justify-center items-center">
        <button
          onClick={popupAddAlbums}
          className="bg-[#bbbbbb] text-white px-4 py-2 rounded-[30px] w-[329px] h-[219px] text-[28px] font-semibold"
        >
          앨범 추가하기
        </button>
      </div>
    </main>
  );
};

export default Collection;
