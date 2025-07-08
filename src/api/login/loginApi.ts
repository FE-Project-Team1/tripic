interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  _id: string;
  username: string;
  email: string;
  accountname: string;
  image: string;
  token: string;
}

/**
 * 사용자 로그인 API 호출 함수
 * @param email 사용자 이메일
 * @param password 사용자 비밀번호
 * @returns 로그인 응답 데이터
 */
export async function loginFetch({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/user/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
