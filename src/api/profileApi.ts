import { getCookie } from '../utils/auth';

// 프로필 수정 요청 매개변수 타입
interface IModifyProfileParams {
  username: string;
  accountname: string;
  intro: string;
  image?: string;
}

// 프로필 수정 응답 타입
interface IModifyProfileResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    accountname: string;
    intro: string;
    image: string;
    // 기타 사용자 정보 필드
  };
}

/**
 * 프로필 수정 API 호출 함수
 * @param profileData 수정할 프로필 데이터
 * @returns 프로필 수정 응답 데이터
 */
export async function modifyProfile(
  profileData: IModifyProfileParams
): Promise<IModifyProfileResponse> {
  try {
    // 쿠키에서 토큰 가져오기
    const token = getCookie('token');

    if (!token) {
      throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
    }

    console.log('=== 서버로 전송할 프로필 데이터 ===');
    console.log(
      JSON.stringify(
        {
          user: {
            username: profileData.username,
            accountname: profileData.accountname,
            intro: profileData.intro,
            image: profileData.image || '',
          },
        },
        null,
        2
      )
    );

    const response = await fetch(`${import.meta.env.VITE_END_POINT}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: profileData.username,
          accountname: profileData.accountname,
          intro: profileData.intro,
          image: profileData.image || '',
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
      } else if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (response.status === 403) {
        throw new Error('프로필 수정 권한이 없습니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(
          `프로필 수정에 실패했습니다. (상태 코드: ${response.status})`
        );
      }
    }

    const data = await response.json();
    console.log('=== 프로필 수정 성공 응답 ===');
    console.log(JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('=== 프로필 수정 API 에러 ===');
    console.error(error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
