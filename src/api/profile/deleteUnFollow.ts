import { getCookie } from '../../utils/auth';

// 언팔로우 응답 타입 (팔로우와 동일한 구조)
interface UnFollowResponse {
  profile: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: {
      _id: string;
      accountname: string;
      username: string;
      image: string;
    }[];
    follower: {
      _id: string;
      accountname: string;
      username: string;
      image: string;
    }[];
    followerCount: number;
    followingCount: number;
  };
}

/**
 * 사용자를 언팔로우하는 함수
 * @param accountname 언팔로우할 사용자 계정명
 * @returns 언팔로우 후 프로필 정보
 */
export async function deleteUnFollow(
  accountname: string
): Promise<UnFollowResponse> {
  try {
    const token = getCookie('token');

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
    }

    if (!accountname) {
      throw new Error('언팔로우할 계정명이 필요합니다.');
    }

    const apiUrl = `${import.meta.env.VITE_END_POINT}/profile/${accountname}/unfollow`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      // 서버에서 반환한 구체적인 에러 메시지 사용
      if (errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error) {
        throw new Error(errorData.error);
      } else if (response.status === 400) {
        throw new Error('잘못된 요청입니다. 계정명을 확인해주세요.');
      } else if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (response.status === 403) {
        throw new Error('언팔로우할 권한이 없습니다.');
      } else if (response.status === 404) {
        throw new Error('해당 계정이 존재하지 않습니다.');
      } else if (response.status === 409) {
        throw new Error('이미 언팔로우한 사용자입니다.');
      } else if (response.status === 422) {
        throw new Error('유효하지 않은 계정명입니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(
          `언팔로우에 실패했습니다. (상태 코드: ${response.status})`
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('언팔로우 실패:', error.message);
      throw error;
    } else {
      const errorMessage = '언팔로우 중 알 수 없는 오류가 발생했습니다.';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
