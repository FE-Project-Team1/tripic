interface EmailValidResponse {
  message: string;
}

/**
 * 이메일 유효성 검사 API 호출 함수
 * @param email 확인할 이메일 주소
 * @returns 이메일 검증 응답 데이터
 */
export async function validEmail(email: string): Promise<EmailValidResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/user/emailvalid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '이메일 검증에 실패했습니다.');
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
