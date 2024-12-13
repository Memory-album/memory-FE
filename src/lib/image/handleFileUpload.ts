import { ChangeEvent } from 'react';

type OnUploadCallback = (preview: { dataUrl: string; file: File }) => void;

export const handleFileUpload = (
  e: ChangeEvent<HTMLInputElement>,
  callback: OnUploadCallback,
) => {
  e.preventDefault();
  const file = (e.target.files as FileList)[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      callback({
        dataUrl: reader.result as string, // 이미지의 dataUrl
        file, // 파일 자체
      });
    };

    reader.readAsDataURL(file);
  }
};
