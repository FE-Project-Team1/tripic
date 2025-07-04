// 팔로워/팔로잉 사용자 타입 정의
import { getCookie } from '../../utils/auth';

interface User {
  _id: string;
  accountname: string;
  username: string;
  image: string;
}

// 응답 인터페이스 개선
interface ProfileResponse {
  profile: {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    isfollow: boolean;
    following: User[];
    follower: User[];
    followerCount: number;
    followingCount: number;
  };
}

/**
 * 사용자 프로필 정보를 조회하는 함수
 * @param accountname 조회할 사용자 계정명
 * @returns 프로필 정보
 */
export const getProfile = async (
  accountname: string
): Promise<ProfileResponse> => {
  try {
    const token = getCookie('token');

    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
    }

    const apiUrl = `${import.meta.env.VITE_END_POINT}/profile/${accountname}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('해당 계정이 존재하지 않습니다.');
      }
      throw new Error('프로필 조회에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('프로필 조회 실패:', error.message);
    } else {
      console.error('프로필 조회 중 알 수 없는 오류가 발생했습니다.');
    }
    throw error;
  }
};
