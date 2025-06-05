'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import '@/components/embla/embla.css';
import { GoHeartFill } from 'react-icons/go';
import { CgClose } from 'react-icons/cg';
import { DownloadSquare02Icon } from 'hugeicons-react';
import useUserStore from '@/store/useUserInfo';
import { CursorMagicSelection02Icon } from 'hugeicons-react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { usePathname } from 'next/navigation';

type PropType = {
  params: { id: string; photoId: string };
};

interface UploadedBy {
  id: number;
  name: string;
  profileImgUrl: string;
}

interface MediaItem {
  id: number;
  fileUrl: string;
  fileType: string;
  originalFilename: string;
  fileSize: number;
  thumbnailUrl: string | null;
  uploadedBy: UploadedBy;
  createdAt: string;
  story: string | null;
  isLiked: boolean;
}

interface ApiResponse {
  result: string;
  message: null;
  data: {
    content: MediaItem[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
}

const PhotoDetail = ({ params }: PropType) => {
  const currentPhotoId = params.photoId;
  const { userInfo } = useUserStore();
  const groupId = userInfo?.currentGroupId;
  const pathname = usePathname();
  const urlParts = pathname.split('/');
  const albumId = urlParts[4]; // URL 구조에 따라 조정 필요
  const currentId = Number(pathname.split('/').pop()) - 1;

  const [imagess, setImagess] = useState<MediaItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(() =>
    images.findIndex((photo) => photo.id.toString() === currentPhotoId),
  );

  useEffect(() => {
    setCurrentIndex(
      images.findIndex((photo) => photo.id.toString() === currentPhotoId),
    );
  }, [currentPhotoId, images]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: currentIndex,
    loop: false,
  });

  const updateURL = useCallback(
    (index: number) => {
      if (!images[index]) return;
      const newPhotoId = images[index].id.toString();
      const newPath = `/groups/${groupId}/albums/${albumId}/photo/${newPhotoId}`;
      window.history.replaceState(null, '', newPath);
    },
    [albumId, groupId, images],
  );

  const downloadRef = useRef<HTMLDivElement>(null);
  const detailPhotoRef = useRef<HTMLDivElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  const toggleVisibillity = (
    ref: React.RefObject<HTMLDivElement>,
    isVisible: boolean,
  ) => {
    if (ref.current) {
      ref.current.style.display = isVisible ? 'block' : 'none';
    }
  };

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const selectedIndex = emblaApi.selectedScrollSnap();
      updateURL(selectedIndex);
    };

    emblaApi.on('select', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect); // 언마운트 시 제거
    };
  }, [emblaApi, updateURL]);

  const toggleLike = (index: number) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, isLiked: !image.isLiked } : image,
      ),
    );
    console.log(pathname.slice(-1));
  };

  useEffect(() => {
    if (!groupId) {
      setError('그룹 ID가 없습니다.');
      setIsLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          size: '10',
          sort: 'createdAt,desc',
        });

        const response = await fetch(
          `/backend/api/v1/groups/${groupId}/albums/${albumId}/media?${queryParams}`,
          {
            method: 'get',
            credentials: 'include',
          },
        );
        const data: ApiResponse = await response.json();

        if (data.result === 'SUCCESS') {
          setImages(data.data.content);
          setTotalPages(data.data.totalPages);
        } else {
          setError('이미지를 불러오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
        setError('이미지를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [groupId, albumId, currentPage]);

  return (
    <main className="">
      {/* 다운로드 */}
      {/* <div
        ref={downloadRef}
        className="w-full h-full absolute top-0 z-50"
        style={{ display: 'none' }}
      >
        <div
          className="absolute top-0 bg-[#e0edffd6] w-full h-full"
          onClick={() => toggleVisibillity(downloadRef, false)}
        ></div>
        <div className="absolute right-[33px] top-[10%] cursor-pointer">
          <CgClose
            size={30}
            color="#494949"
            onClick={() => toggleVisibillity(downloadRef, false)}
          />
        </div>
        <div
          className="absolute top-[16%] w-[342px] h-[480px] overflow-scroll grid grid-cols-2 gap-[26px]"
          style={{ right: 'calc(50% - 171px)' }}
        >
          <div onClick={() => toggleVisibillity(detailPhotoRef, true)}>
            <Image
              src="/images/example.png"
              alt="사진"
              width={160}
              height={160}
              className="rounded-[10px] h-[160px]"
            ></Image>
          </div>
        </div>
        <div
          className="absolute bottom-[10%]"
          style={{ left: 'calc(50% - 44px)' }}
        >
          <button>
            <a href="/images/example.png" download="예시사진" role="button">
              <DownloadSquare02Icon size={88} color="#428EFF" />
            </a>
          </button>
        </div>
      </div> */}
      {/* 다운로드 */}
      <div
        ref={downloadRef}
        className="w-full h-full absolute top-0 z-50"
        style={{ display: 'none' }}
      >
        <div
          className="absolute top-0 bg-[#e0edff78] w-full h-full"
          onClick={() => toggleVisibillity(downloadRef, false)}
        ></div>
        <div className="absolute right-[33px] top-[10%] cursor-pointer">
          <CgClose
            size={30}
            color="#494949"
            onClick={() => toggleVisibillity(downloadRef, false)}
          />
        </div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] h-[480px] flex items-center justify-center">
          {images.length > 0 && (
            <div className="relative w-full h-full">
              <Image
                src={images[currentId]?.fileUrl || ''}
                alt="사진"
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-[10px]"
              />
            </div>
          )}
        </div>
        <div
          className="absolute bottom-[10%]"
          style={{ left: 'calc(50% - 44px)' }}
        >
          <button>
            <a href="/images/example2.png" download="예시사진2" role="button">
              <DownloadSquare02Icon size={88} color="#428EFF" />
            </a>
          </button>
        </div>
      </div>

      {/* 대화창 */}
      <div
        ref={conversationRef}
        className="w-full h-full absolute top-0 z-50"
        style={{ display: 'none' }}
      >
        <div
          className="absolute top-0 bg-[#cbcbcbd6] w-full h-full"
          onClick={() => toggleVisibillity(conversationRef, false)}
        ></div>
        <div
          className="absolute top-[16%] w-[362px] h-[518px] rounded-[10px] bg-[#eef6fff5]"
          style={{ left: 'calc(50% - 181px' }}
        >
          <div className="mt-5 h-[498px] overflow-y-scroll">
            <div className="flex justify-start items-end mb-[25px] pl-[30px] pr-[20px]">
              {images.length > 0
                ? images[currentId]?.story || '이미지에 대한 설명이 없습니다.'
                : '이미지에 대한 설명이 없습니다.'}
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 슬라이더 */}
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {isLoading ? (
            <div className="min-w-full p-4 flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="min-w-full p-4 flex flex-col items-center justify-center">
              <div className="w-[285px] h-[399px] bg-gray-200 rounded-[10px] flex items-center justify-center">
                <p className="text-gray-500 text-center">{error}</p>
              </div>
            </div>
          ) : (
            images.map((image, i) => (
              <div
                className="min-w-full p-4 flex flex-col items-center"
                key={image.id}
              >
                <div className="px-4 pt-6 sm:w-[500px] sm:m-auto">
                  <div className="mb-[35px] flex items-end">
                    <button
                      onClick={() => toggleVisibillity(downloadRef, true)}
                    >
                      <div
                        className="w-[285px] h-[399px] mr-3 bg-cover bg-center rounded-[10px]"
                        style={{
                          backgroundImage: `url(${encodeURI(image.fileUrl)})`,
                        }}
                      ></div>
                    </button>
                    <div className="flex flex-col items-center w-[64px]">
                      <div>
                        <button
                          className="bg-white w-[51px] h-[51px] rounded-full flex items-center justify-center"
                          onClick={() => toggleLike(i)}
                        >
                          {image.isLiked ? (
                            <div className="w-[51px] h-[51px] rounded-full border-2 border-red-500 border-solid p-3">
                              <GoHeartFill
                                size={23}
                                fill="red"
                                className="transition-transform transform scale-125 duration-300"
                              />
                            </div>
                          ) : (
                            <div className="w-[51px] h-[51px] rounded-full border-2 border-[#B4B4B4] border-solid p-3">
                              <GoHeartFill
                                size={23}
                                fill="#B4B4B4"
                                className="transition-transform transform scale-125 duration-300"
                              />
                            </div>
                          )}
                        </button>
                      </div>
                      <ul className="text-xs sm:text-sm mt-4">
                        <li>
                          <h3 className="font-semibold">작성자</h3>
                          <p className="text-[10px]">{image.uploadedBy.name}</p>
                        </li>
                        <li>
                          <h3 className="font-semibold">날짜</h3>
                          <p className="text-[10px]">
                            {new Date(image.createdAt).toLocaleDateString()}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => toggleVisibillity(conversationRef, true)}
                  >
                    <div
                      className="w-0 h-0 top-[-23px] left-[19px] absolute"
                      style={{
                        borderWidth: '23px 63px',
                        borderColor:
                          'transparent transparent transparent rgb(243, 244, 255)',
                      }}
                    ></div>
                    <div className="p-5 rounded-[20px] bg-[#F3F4FF] pb-3">
                      <div className="text-lg h-[82px] line-clamp-3 overflow-hidden text-ellipsis break-words">
                        {image.story || '이미지에 대한 설명이 없습니다.'}
                      </div>
                      <div className="text-[#8FB6FF] mt-4 flex row items-end justify-end">
                        <p className="text-[10px]">대화 보기</p>
                        <CursorMagicSelection02Icon
                          size={20}
                          color="#8FB6FF"
                          fill="white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default PhotoDetail;
