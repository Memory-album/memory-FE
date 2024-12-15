import { ChangeEvent } from 'react';

type OnUploadCallback = React.Dispatch<
  React.SetStateAction<{ dataUrl: string; file: File }[]>
>;

export const handlePreviewFiles = (
  e: ChangeEvent<HTMLInputElement>,
  callback: OnUploadCallback,
) => {
  e.preventDefault();
  const files = e.target.files as FileList;

  if (files) {
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback((prevPreview) => [
          ...prevPreview,
          { dataUrl: reader.result as string, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }
};
