interface IAccountNameValidResponse {
  message: string;
}

/**
 * 계정명 유효성 검사 API 호출 함수
 * @param accountname 확인할 계정명
 * @returns 계정명 검증 응답 데이터
 */
export async function postAccountName(
  accountname: string
): Promise<IAccountNameValidResponse> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/user/accountnamevalid`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            accountname,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '계정명 검증에 실패했습니다.');
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
