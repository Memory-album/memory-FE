import { useState } from 'react';

export const usePreviewFile = () => {
  const [preview, setPreview] = useState<{
    dataUrl: string;
    file: File;
  } | null>(null);

  const handlePreviewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview({ dataUrl: reader.result as string, file });
    };
  };

  return { preview, setPreview, handlePreviewFile };
};
