import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // 백엔드 URL 설정

// 인증번호 요청 함수
export const sendVerifyCode = async (userData: { email: string }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/send-verification-code`,
      userData,
      {
        withCredentials: true, // 쿠키 사용 설정 <<< 여기다가 설정 해야지 사용됨!!!!!!!!!!
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

// 인증번호 확인함수
export const verifyEmailCode = async (userData: {
  emailVerificationCode: string;
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/register/verify-email`,
      userData,
      {
        withCredentials: true, // 쿠키 사용 설정
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

// // 회원가입 요청 함수
// export const registerUser = async (userData: {
//   email: string;
//   password: string;
//   name: string;
//   profileImgUrl?: File; // 선택적으로 프로필 이미지를 포함
// }) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/register/complete-register`,
//       userData,
//       {
//         withCredentials: true, // 쿠키 사용 설정
//       },
//     );
//     return response.data; // 성공 시 반환되는 데이터를 리턴
//   } catch (error: any) {
//     console.error(
//       'Error during registration:',
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error.message; // 에러 처리
//   }
// };
export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
  profileImage?: File; // File 타입으로 변경
}) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();
    
    // userRegisterDto JSON 문자열 생성
    const userRegisterDto = {
      email: userData.email,
      password: userData.password,
      name: userData.name
    };
    
    // FormData에 데이터 추가
    formData.append('userRegisterDto', JSON.stringify(userRegisterDto));
    
    // 프로필 이미지가 있는 경우 추가
    if (userData.profileImage) {
      formData.append('profileImage', userData.profileImage);
    }

    const response = await axios.post(
      `${API_BASE_URL}/register/complete-register`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during registration:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
}

// // 로그인
// export const userLogin = async (userData: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
//     return response.data; // 성공 시 반환되는 데이터를 리턴
//   } catch (error: any) {
//     console.error(
//       'Error during registration:',
//       error.response?.data || error.message,
//     );
//     throw error.response?.data || error.message; // 에러 처리
//   }
// };

// 로그인
export const userLogin = async (userData: {
  email: string;
  password: string;
  rememberMe?: boolean; // 자동 로그인 옵션 추가
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`, 
      userData,
      {
        withCredentials: true, // 쿠키를 받기 위해 필수
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Login error:',
      error.response?.data || error.message,
    );
    throw error.response?.data || error.message;
  }
};
