'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PhotoArrangement from './_components/PhotoArrangement';
import { useRouter } from 'next/navigation';
import { addNewAlbum } from '@/lib/albums/addNewAlbum';
import useUserStore from '@/store/useUserInfo';

const Collection = () => {
  const { userInfo } = useUserStore();
  const groupId = userInfo?.currentGroupId;

  useEffect(() => {
    const fetchGroupAlmubs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/albums/group/${groupId}?thumbnailCount=5`,
          {
            method: 'get',
            credentials: 'include',
          },
        );
        const data = await response.json();
        console.log('API Response:', data);
        if (data.result === 'SUCCESS') {
          const formattedAlbums = data.data.map((album: any) => {
            return {
              id: album.id,
              title: album.title,
              bgImages: album.recentMedia
                .map((media: any) => {
                  console.log('Media URL:', media.fileUrl);
                  return encodeURI(media.fileUrl);
                })
                .slice(0, 5),
            };
          });
          setLocalAlbums(formattedAlbums);
        }
      } catch (error) {
        console.error('최근 미디어 가져오기 실패:', error);
      }
    };
    fetchGroupAlmubs();
  }, [groupId]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewAlbum((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAlbum = async () => {
    if (!newAlbum.title || !newAlbum.theme || !newAlbum.description) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      // API 호출
      await addNewAlbum({
        title: newAlbum.title,
        theme: newAlbum.theme,
        description: newAlbum.description,
        groupId: groupId ? groupId : 1,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/albums/group/${groupId}?thumbnailCount=5`,
        {
          method: 'get',
          credentials: 'include',
        },
      );
      const result = await response.json();

      if (result.result === 'SUCCESS') {
        const formattedAlbums = result.data.map(
          (album: {
            id: number;
            title: string;
            recentMedia: { fileUrl: any }[];
          }) => ({
            id: album.id,
            title: album.title,
            bgImages: album.recentMedia
              .map((media: { fileUrl: any }) => media.fileUrl)
              .slice(0, 5), // 최대 5개의 썸네일만 사용
          }),
        );

        setLocalAlbums(formattedAlbums);
      }

      setNewAlbum({
        title: '',
        theme: '',
        description: '',
      });

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
          <select
            name="theme"
            id="theme"
            className="mx-6 p-2 border rounded"
            value={newAlbum.theme}
            onChange={handleInputChange}
          >
            <option value="">테마를 선택하세요</option>
            <option value="SENIOR_CARE">SENIOR_CARE</option>
            <option value="CHILD_GROWTH">CHILD_GROWTH</option>
            <option value="COUPLE_STORY">COUPLE_STORY </option>
          </select>
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
