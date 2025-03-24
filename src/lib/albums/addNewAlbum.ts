import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 URL 설정

interface AddNewAlbumData {
  title: string;
  description: string;
  theme: string;
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

    // 데이터를 x-www-form-urlencoded 형식으로 변환
    const formData = qs.stringify(albumData);

    // 디버깅을 위한 로그
    console.log('Sending data:', formData);
    console.log('Headers:', {
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const response = await axios.post<ApiResponse>(
      `${API_BASE_URL}/api/v1/albums`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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
