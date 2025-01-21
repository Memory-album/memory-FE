import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const sendVerifyCode = async (userData: { email: string }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/send-verification-code`,
      userData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};

export const verifyEmailCode = async (userData: {
  emailVerificationCode: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/verify-email`,
      userData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};

interface RegisterUserData {
  email: string;
  password: string;
  name: string;
  profileImage?: File;
}

export const registerUser = async (userData: RegisterUserData) => {
  try {
    const formData = new FormData();

    // userRegisterDto JSON 객체 생성 및 추가
    const userRegisterDto = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
    };
    formData.append('userRegisterDto', JSON.stringify(userRegisterDto));

    // profileImage가 존재하면 추가
    if (userData.profileImage) {
      formData.append('profileImage', userData.profileImage);
      console.log('Added profile image:', userData.profileImage.name);
    }

    const response = await axios.post(
      `${API_BASE_URL}/register/complete-register`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Server response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error.response?.data || error.message;
  }
};
