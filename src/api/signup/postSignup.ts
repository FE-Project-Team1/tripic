// 회원가입 요청 매개변수 타입
interface ISignupParams {
  username: string;
  email: string;
  password: string;
  accountname: string;
  intro?: string;
  image?: string;
}

// 회원가입 응답 타입
interface ISignupResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
    token: string;
    // 기타 사용자 정보 필드
  };
  token: string;
}

/**
 * 회원가입 API 호출 함수
 * @param signupData 회원가입 데이터
 * @returns 회원가입 응답 데이터
 */
export async function signupFetch(
  signupData: ISignupParams
): Promise<ISignupResponse> {
  try {
    console.log('=== 서버로 전송할 데이터 ===');
    console.log(
      JSON.stringify(
        {
          user: {
            username: signupData.username,
            email: signupData.email,
            password: signupData.password,
            accountname: signupData.accountname,
            intro: signupData.intro,
            image: signupData.image || '',
          },
        },
        null,
        2
      )
    );

    const response = await fetch(`${import.meta.env.VITE_END_POINT}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
          accountname: signupData.accountname,
          intro: signupData.intro,
          image: signupData.image || '',
        },
      }),
    });

    console.log('=== 서버 응답 상태 ===');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('=== 서버 에러 응답 ===');
      console.log(JSON.stringify(errorData, null, 2));

      // 서버에서 반환한 구체적인 에러 메시지 사용
      if (errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error) {
        throw new Error(errorData.error);
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(
          `회원가입에 실패했습니다. (상태 코드: ${response.status})`
        );
      }
    }

    const data = await response.json();
    console.log('=== 회원가입 성공 응답 ===');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('=== 회원가입 API 에러 ===');
    console.error(error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
