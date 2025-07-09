import { getCookie } from '../../utils/auth';

interface UserProfileResponse {
  user: {
    _id: string;
    username: string;
    accountname: string;
    image: string;
    isfollow: boolean;
    following: Array<any>;
    follower: Array<any>;
    followerCount: number;
    followingCount: number;
  };
}

/**
 * 현재 사용자의 프로필 정보를 가져옵니다
 * @returns 사용자 프로필 데이터가 담긴 Promise
 */
export const getMyProfile = async (): Promise<UserProfileResponse> => {
  const token = getCookie('token');

  try {
    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/user/myinfo`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('사용자 프로필 정보를 가져오는데 실패했습니다');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('프로필 데이터 가져오기 오류:', error);
    throw error;
  }
};
