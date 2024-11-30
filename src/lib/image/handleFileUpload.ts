import { ChangeEvent } from 'react';

type OnUploadCallback = (preview: string) => void;

export const handleFileUpload = (
  e: ChangeEvent<HTMLInputElement>,
  callback: OnUploadCallback,
) => {
  e.preventDefault();
  const file = (e.target.files as FileList)[0];
  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      callback(reader.result as string);
    };

    reader.readAsDataURL(file);
  }
};
