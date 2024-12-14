import { useViewStore } from '@/store/useViewStore';
import { useState } from 'react';

export const useFileProcessing = (nextView: string) => {
  const { setView } = useViewStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileProcessing = (
    file: File[] | Blob,
    fileType: 'image' | 'audio',
  ) => {
    const formData = new FormData();

    if (fileType === 'image') {
      if (Array.isArray(file)) {
        file.forEach((f: File) => {
          f && formData.append('images', f);
        });
      }
    } else if (fileType === 'audio') {
      formData.append('audio', file as Blob, 'recording.webm');
    }

    setIsLoading(true);

    // 파일 전송 로직
    // fetch('//', {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setView(nextView);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading file:', error);
    //     setIsLoading(false);
    //   });
    setTimeout(() => {
      setIsLoading(false);
      setView(nextView);
    }, 7000);
  };

  return { handleFileProcessing, isLoading };
};
