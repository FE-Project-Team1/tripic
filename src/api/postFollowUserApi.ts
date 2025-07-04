import { getCookie } from '../utils/auth';

// 프로필 응답 인터페이스 정의
interface ProfileResponse {
  profile: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: any[];
    follower: string[];
    followerCount: number;
    followingCount: number;
  };
}

/**
 * 특정 계정을 팔로우하는 API 호출 함수
 * @param accountname 팔로우할 계정명
 * @returns 팔로우 후 프로필 정보 또는 에러 메시지
 */
export async function followUser(
  accountname: string
): Promise<ProfileResponse> {
  try {
    const token = getCookie('token');

    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/profile/${accountname}/follow`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '팔로우에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('팔로우 API 오류:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
