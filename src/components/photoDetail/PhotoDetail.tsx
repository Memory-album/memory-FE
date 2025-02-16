'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import '@/components/embla/embla.css';
// import { ReceivedMessageInAlbums } from './_components/received-message-albums';
import { GoHeartFill } from 'react-icons/go';
import { CgClose } from 'react-icons/cg';
import { DownloadSquare02Icon } from 'hugeicons-react';
import { CursorMagicSelection02Icon } from 'hugeicons-react';

type PropType = {
  params: { id: string; photoId: string };
};

const PhotoDetail = ({ params }: PropType) => {
  const albumId = params.id;
  const currentPhotoId = params.photoId;

  const [images, setImages] = useState([
    { id: '0', src: '/images/example.png', isLiked: true, name: '사진1' },
    { id: '1', src: '/images/example2.png', isLiked: true, name: '사진2' },
    { id: '2', src: '/images/1.png', isLiked: true, name: '사진3' },
    { id: '3', src: '/images/2.png', isLiked: true, name: '사진4' },
    { id: '4', src: '/images/3.png', isLiked: true, name: '사진5' },
    { id: '5', src: '/images/4.png', isLiked: true, name: '사진6' },
    { id: '6', src: '/images/5.png', isLiked: true, name: '사진7' },
    { id: '7', src: '/images/6.png', isLiked: true, name: '사진8' },
  ]);

  const [currentIndex, setCurrentIndex] = useState(() =>
    images.findIndex((photo) => photo.id === currentPhotoId),
  );

  useEffect(() => {
    setCurrentIndex(images.findIndex((photo) => photo.id === currentPhotoId));
  }, [currentPhotoId, images]); // const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: currentIndex,
    loop: false,
  });

  const updateURL = useCallback(
    (index: number) => {
      if (!images[index]) return;
      const newPhotoId = images[index].id;
      const newPath = `/albums/${albumId}/photo/${newPhotoId}`;
      window.history.replaceState(null, '', newPath);
    },
    [albumId], // images를 제거
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
  };

  return (
    <main className="ForGnbpaddingTop">
      {/* 다운로드 */}
      <div
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
          <div onClick={() => toggleVisibillity(detailPhotoRef, true)}>
            <Image
              src="/images/example.png"
              alt="사진"
              width={160}
              height={160}
              className="rounded-[10px] h-[160px]"
            ></Image>
          </div>
          <div onClick={() => toggleVisibillity(detailPhotoRef, true)}>
            <Image
              src="/images/example.png"
              alt="사진"
              width={160}
              height={160}
              className="rounded-[10px] h-[160px]"
            ></Image>
          </div>
          <div onClick={() => toggleVisibillity(detailPhotoRef, true)}>
            <Image
              src="/images/example.png"
              alt="사진"
              width={160}
              height={160}
              className="rounded-[10px] h-[160px]"
            ></Image>
          </div>
          <div onClick={() => toggleVisibillity(detailPhotoRef, true)}>
            <Image
              src="/images/example.png"
              alt="사진"
              width={160}
              height={160}
              className="rounded-[10px] h-[160px]"
            ></Image>
          </div>
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
      </div>
      <div
        ref={detailPhotoRef}
        className="w-full h-full absolute top-0 z-50"
        style={{ display: 'none' }}
      >
        <div
          className="absolute top-0 bg-[#e0edff78] w-full h-full"
          onClick={() => toggleVisibillity(detailPhotoRef, false)}
        ></div>
        <div className="absolute right-[33px] top-[10%] cursor-pointer">
          <CgClose
            size={30}
            color="#494949"
            onClick={() => toggleVisibillity(detailPhotoRef, false)}
          />
        </div>
        <div
          className="absolute top-[16%]"
          style={{ right: 'calc(50% - 171px)' }}
        >
          <Image
            src="/images/example.png"
            alt="사진"
            width={342}
            height={480}
            className="rounded-[10px]"
          ></Image>
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
          <div className="mt-5 h-[498px] overflow-scroll">
            {/* 여기 컴포넌트화 */}
            <div className="flex justify-start items-end mb-[25px] pl-[30px]">
              <div className="mr-4 w-[50px] h-[50px] shrink-0">
                <img
                  className="block w-full h-full object-cover rounded-full"
                  src="/images/profile.png"
                  alt="프로필 이미지"
                />
              </div>

              <div className="flex flex-col items-start">
                <p className="py-3 px-[17px] mb-1 max-w-[240px] bg-[#ABA5FF] rounded-[20px] rounded-bl-none text-white text-base">
                  답장예시
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 슬라이더 */}
      <div ref={emblaRef} className="overflow-hidden h-full">
        <div className="flex h-full">
          {images.map((image, i) => (
            <div
              className="min-w-full p-4 flex flex-col items-center"
              key={image.id}
            >
              <div className="px-4 pt-6 sm:w-[500px] sm:m-auto">
                <div className="mb-[35px] flex items-end">
                  <button onClick={() => toggleVisibillity(downloadRef, true)}>
                    <div
                      className="w-[285px] h-[399px] mr-3 bg-cover bg-center rounded-[10px]"
                      style={{ backgroundImage: `url(${image.src})` }}
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
                        <p className="text-[10px]">두칠이</p>
                      </li>
                      <li>
                        <h3 className="font-semibold">날짜</h3>
                        <p className="text-[10px]">24년 1월 1일</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <ReceivedMessageInAlbums /> */}
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
                    <div className="text-lg">
                      이건 언젠데 토끼랑 토끼가 둘이 앉아있고 뭐라고 하는데
                      새벽이고 하늘이 예쁘고 블라블라
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
          ))}
        </div>
      </div>
    </main>
  );
};

export default PhotoDetail;
