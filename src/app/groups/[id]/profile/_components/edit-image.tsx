import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePreviewFile } from '@/lib/image/usePreviewFile';
import { ChangeEvent, useRef } from 'react';
import { FaCamera } from 'react-icons/fa6';

export const EditImage = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { preview, setPreview, handlePreviewFile } = usePreviewFile();

  const handleClickInput = () => {
    imageRef.current?.click();
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files === null) {
      return;
    }

    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      alert(
        Math.round(file.size / 1024 / 1024) +
          'MB(1MB까지만 업로드 가능합니다.)',
      );
      return;
    }

    handlePreviewFile(file);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FaCamera className="absolute right-2 bottom-2 text-[#DAE2FF] text-[35px] cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="pb-[10px] w-[330px] rounded-[10px]">
        <AlertDialogHeader>
          <AlertDialogTitle>프로필 사진 변경</AlertDialogTitle>
        </AlertDialogHeader>

        <Input
          type="file"
          id="image"
          hidden
          className="hidden"
          ref={imageRef}
          onChange={(e) => handleUploadImage(e)}
        />
        <div className="flex">
          <Button className="w-[80px] text-sm" onClick={handleClickInput}>
            사진 선택
          </Button>
          {preview !== null && (
            <div className="m-auto size-[100px] overflow-hidden">
              <img
                src={preview.dataUrl}
                alt="이미지 미리보기"
                className="size-full object-cover"
              />
            </div>
          )}
        </div>
        <AlertDialogDescription className="hidden">
          프로필 사진 변경창입니다.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setPreview(null)}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction>변경</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
