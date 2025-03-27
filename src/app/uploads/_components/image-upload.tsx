// 'use client';
// import { Input } from '@/components/ui/input';
// import { handlePreviewFiles } from '@/lib/image/handlePreviewFiles';
// import { ChangeEventHandler, useRef } from 'react';
// import { MdOutlineCameraAlt } from 'react-icons/md';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';

// type Props = {
//   preview: { dataUrl: string; file: File }[];
//   setPreview: React.Dispatch<
//     React.SetStateAction<{ dataUrl: string; file: File }[]>
//   >;
// };

// export const ImageUpload = ({ preview, setPreview }: Props) => {
//   const imageRef = useRef<HTMLInputElement | null>(null);

//   const handleUploadImage = () => {
//     imageRef.current?.click();
//   };

//   const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
//     if (e.target.files) {
//       if (e.target.files!!.length + preview.length > 10) {
//         alert('사진은 10장 이내로 올려주세요');
//         return;
//       }
//     }

//     handlePreviewFiles(e, (result) => setPreview(result));
//   };

//   const handleDeleteImage = (index: number) => {
//     setPreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   const getGridClasses = () => {
//     if (preview.length < 5) return 'grid-cols-2 gap-4';
//     return 'grid-cols-3 gap-3';
//   };

//   return (
//     <div className="my-5">
//       <Input
//         type="file"
//         multiple
//         hidden
//         ref={imageRef}
//         className="hidden"
//         onChange={onUpload}
//       />
//       {preview.length === 0 && (
//         <div
//           onClick={handleUploadImage}
//           className="m-auto flex flex-col items-center justify-center w-[290px] h-[400px] border-[8px] border-solid border-[#dae2ff] rounded-[20px] cursor-pointer"
//         >
//           <MdOutlineCameraAlt className="size-[120px] text-[#dae2ff]" />
//           <p className="text-lg font-bold text-[#dae2ff]">사진 업로드</p>
//         </div>
//       )}
//       {preview.length === 1 && (
//         <ImageItem
//           src={preview[0]?.dataUrl}
//           onDeleteImage={() => handleDeleteImage(0)}
//           imageClassValue="aspect-auto"
//           imageContainerClassValue="w-[290px] m-auto"
//         />
//       )}
//       <div className="mx-[30px]">
//         {preview.length > 1 && (
//           <div className={cn('grid justify-items-center', getGridClasses())}>
//             {preview?.map(
//               (v, index) =>
//                 v && (
//                   <ImageItem
//                     key={index}
//                     src={v.dataUrl}
//                     onDeleteImage={() => handleDeleteImage(index)}
//                     imageClassValue="object-cover aspect-square"
//                   />
//                 ),
//             )}
//           </div>
//         )}
//       </div>
//       {preview.length > 0 && (
//         <div className="flex justify-center mt-[90px] mb-3">
//           <Button onClick={handleUploadImage}>사진 추가하기</Button>
//         </div>
//       )}
//     </div>
//   );
// };

// type ItemProps = {
//   src: string;
//   onDeleteImage: () => void;
//   imageClassValue: string;
//   imageContainerClassValue?: string;
// };

// const ImageItem = ({
//   src,
//   onDeleteImage,
//   imageClassValue,
//   imageContainerClassValue,
// }: ItemProps) => {
//   return (
//     <div className={cn(imageContainerClassValue, 'relative')}>
//       <div
//         onClick={onDeleteImage}
//         className="absolute top-[-5px] right-[-4px] flex justify-center items-center text-white bg-slate-300 size-6 rounded-full cursor-pointer hover:bg-slate-500 sm:size-8 sm:text-[24px]"
//       >
//         x
//       </div>
//       <img
//         src={src}
//         alt="미리보기"
//         className={cn(
//           imageClassValue,
//           'size-full rounded-[10px] overflow-hidden',
//         )}
//       />
//     </div>
//   );
// };

'use client';
import { Input } from '@/components/ui/input';
import { handlePreviewFiles } from '@/lib/image/handlePreviewFiles';
import { ChangeEventHandler, useRef, useMemo } from 'react';
import { MdOutlineCameraAlt, MdAddAPhoto, MdClose } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  preview: { dataUrl: string; file: File }[];
  setPreview: React.Dispatch<
    React.SetStateAction<{ dataUrl: string; file: File }[]>
  >;
};

export const ImageUpload = ({ preview, setPreview }: Props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleUploadImage = () => {
    imageRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      if (e.target.files!!.length + preview.length > 10) {
        alert('사진은 10장 이내로 올려주세요');
        return;
      }
    }

    handlePreviewFiles(e, (result) => setPreview(result));
  };

  const handleDeleteImage = (index: number) => {
    setPreview((prev) => prev.filter((_, i) => i !== index));
  };

  // 이미지 그리드 레이아웃 설정 (반응형)
  const gridLayout = useMemo(() => {
    if (preview.length === 0) return '';
    if (preview.length === 1) return '';
    if (preview.length === 2) return 'grid-cols-2 gap-3';
    if (preview.length === 3) return 'grid-cols-3 gap-3';
    if (preview.length === 4) return 'grid-cols-2 gap-3';
    return 'grid-cols-3 gap-2';
  }, [preview.length]);

  // 남은 업로드 가능한 이미지 수
  const remainingUploads = 10 - preview.length;

  return (
    <div className="my-5 w-full max-w-3xl mx-auto">
      <Input
        type="file"
        multiple
        accept="image/*"
        hidden
        ref={imageRef}
        className="hidden"
        onChange={onUpload}
      />

      {/* 이미지가 없을 때 보여줄 업로드 영역 */}
      {preview.length === 0 && (
        <div
          onClick={handleUploadImage}
          className="m-auto flex flex-col items-center justify-center w-full max-w-sm h-[400px] border-[8px] border-dashed border-[#dae2ff] rounded-[20px] cursor-pointer transition-all hover:border-[#b9c6f8] hover:bg-blue-50"
        >
          <MdOutlineCameraAlt className="size-[100px] text-[#dae2ff]" />
          <p className="text-lg font-bold text-[#dae2ff] mt-4">사진 업로드</p>
          <p className="text-sm text-[#8c9be0] mt-2">
            최대 10장까지 업로드 가능합니다
          </p>
        </div>
      )}

      {preview.length > 0 && remainingUploads > 0 && (
        <Button
          onClick={handleUploadImage}
          className=" bg-transparent hover:bg-transparent flex items-center text-blue-600 hover:text-blue-600/80"
        >
          <MdAddAPhoto className="size-5" />
          <span>사진 추가하기 ({remainingUploads}장 남음)</span>
        </Button>
      )}

      {/* 단일 이미지 케이스 (큰 이미지로 표시) */}
      {preview.length === 1 && (
        <div className="w-full max-w-lg mx-auto mt-4">
          <ImageItem
            src={preview[0]?.dataUrl}
            onDeleteImage={() => handleDeleteImage(0)}
            imageClassValue="aspect-auto max-h-[400px] w-auto mx-auto"
            imageContainerClassValue="w-full"
          />
        </div>
      )}

      {/* 여러 이미지 그리드 레이아웃 */}
      {preview.length > 1 && (
        <div className="mt-4 px-2">
          <div className={cn('grid', gridLayout)}>
            {preview?.map(
              (v, index) =>
                v && (
                  <ImageItem
                    key={index}
                    src={v.dataUrl}
                    onDeleteImage={() => handleDeleteImage(index)}
                    imageClassValue="object-cover aspect-square"
                  />
                ),
            )}
          </div>
        </div>
      )}

      {/* 하단 액션 버튼 영역 */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          질문 남기기
        </Button>

        <Button className="bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300">
          AI가 질문할게요
        </Button>
      </div>
    </div>
  );
};

type ItemProps = {
  src: string;
  onDeleteImage: () => void;
  imageClassValue: string;
  imageContainerClassValue?: string;
};

const ImageItem = ({
  src,
  onDeleteImage,
  imageClassValue,
  imageContainerClassValue,
}: ItemProps) => {
  return (
    <div className={cn(imageContainerClassValue, 'relative group')}>
      {/* <div
        onClick={onDeleteImage}
        className="absolute top-2 right-2 flex justify-center items-center text-white bg-black bg-opacity-50 size-6 rounded-full cursor-pointer hover:bg-opacity-70 sm:size-8 transition-opacity opacity-0 group-hover:opacity-100"
      >
        <MdClose className="size-4 sm:size-5" />
      </div> */}
      <div
        onClick={onDeleteImage}
        className="absolute top-2 right-2 flex justify-center items-center text-white bg-black bg-opacity-50 size-6 rounded-full cursor-pointer hover:bg-opacity-70 sm:size-8 transition-opacity opacity-0 group-hover:opacity-100"
      >
        <MdClose className="size-4 sm:size-5" />
      </div>
      <img
        src={src}
        alt="미리보기"
        className={cn(
          imageClassValue,
          'w-full rounded-lg shadow-sm overflow-hidden transition-transform',
        )}
      />
    </div>
  );
};
