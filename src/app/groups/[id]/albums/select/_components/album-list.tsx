'use client';

import { useQuery } from '@tanstack/react-query';
import { AiOutlineLoading3Quarters, AiOutlineCamera } from 'react-icons/ai';
import { HiOutlinePlus } from 'react-icons/hi';

import { getAlbumsByGroupId } from '@/features/album/api/getAlbumsByGroupId';
import { useRouter } from 'next/navigation';

interface Props {
  groupId: string;
}

interface AlbumType {
  id: string;
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  recentMedia: RecentMediaType[];
}

interface RecentMediaType {
  id: string;
  fileUrl: string;
  thumbnailUrl: string;
}

export const AlbumList = ({ groupId }: Props) => {
  const router = useRouter();

  const { data: albums, isLoading } = useQuery({
    queryKey: ['groupAlbums', groupId],
    queryFn: getAlbumsByGroupId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <AiOutlineLoading3Quarters className="size-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-6 text-center text-xl font-medium text-gray-700">
        질문할 앨범을 선택해주세요
      </h2>

      <div className="grid grid-cols-2">
        {albums.map((album: AlbumType) => (
          <div
            key={album.id}
            className="mx-[30px] mb-2 group relative cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              router.push(`/groups/${groupId}/albums/${album.id}/upload`);
            }}
          >
            {/* 앨범 썸네일 컨테이너 */}
            <div className="relative aspect-square rounded-[10px] overflow-hidden bg-gray-100">
              {album.recentMedia.length > 0 ? (
                <img
                  src={album.recentMedia[0].fileUrl}
                  alt={`${album.title} 썸네일`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                  <AiOutlineCamera className="size-12 text-gray-400" />
                </div>
              )}

              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center">
                <HiOutlinePlus className="size-8 text-white mb-2" />
                <span className="text-white font-medium">업로드 하기</span>
              </div>
            </div>

            {/* 앨범 제목 */}
            <h3 className="mt-2 text-center font-medium text-gray-700 truncate px-1 hover:underline">
              {album.title}
            </h3>
            <p className="text-center text-sm text-gray-500 truncate">
              {album.description}
            </p>
          </div>
        ))}
      </div>

      {albums.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          <p>생성된 앨범이 없습니다.</p>
          <p className="text-sm mt-1">먼저 앨범을 생성해주세요.</p>
        </div>
      )}
    </>
  );
};
