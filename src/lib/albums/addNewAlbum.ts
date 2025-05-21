import axios from 'axios';

interface AddNewAlbumData {
  title: string;
  description?: string;
  thumbnailFile?: File;
  theme: string;
  userId?: number;
  groupId: number;
}

interface ApiResponse {
  result: string;
  message: {
    code: string;
    message: string;
  };
  data: {
    id: number;
    title: string;
    description: string;
    thumbnailUrl: string;
    theme: string;
    visibility: string;
    userId: number;
    groupId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const addNewAlbum = async (
  albumData: AddNewAlbumData,
): Promise<ApiResponse> => {
  try {
    if (typeof albumData.groupId !== 'number') {
      throw new Error('groupId must be a number');
    }

    const formData = new FormData();
    formData.append('title', albumData.title);
    formData.append('theme', albumData.theme);
    formData.append('groupId', albumData.groupId.toString());

    //기본 이미지 파일 생성
    const defaultImage = await fetch('./images/1.png').then((res) =>
      res.blob(),
    );
    const defaultImageFile = new File([defaultImage], '1.png', {
      type: 'image/png',
    });
    formData.append('thumbnailFile', defaultImageFile);

    // Optional fields
    if (albumData.description) {
      formData.append('description', albumData.description);
    }
    if (albumData.userId) {
      formData.append('userId', albumData.userId.toString());
    }

    const response = await axios.post<ApiResponse>(
      `/api/api/v1/albums`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data; // 성공 시 반환되는 데이터를 리턴
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message; // 에러 처리
  }
};
