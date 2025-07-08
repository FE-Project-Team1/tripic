import { getCookie } from '../../utils/auth';

interface FollowingUser {
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
}

/**
 * 특정 계정이 팔로우하는 사용자 목록을 가져오는 함수
 * @param accountname - 팔로잉 목록을 조회할 계정명
 * @param limit - 한 번에 가져올 데이터 수(페이징)
 * @param skip - 건너뛸 데이터 수(페이징)
 * @returns 팔로잉 목록 또는 에러 메시지
 */
export const getFollowingList = async (
  accountname: string,
  limit?: number,
  skip?: number
): Promise<FollowingUser[]> => {
  try {
    const token = getCookie('token');

    // 기본 URL 생성
    let url = `${import.meta.env.VITE_END_POINT}/profile/${accountname}/following`;

    // 페이징 파라미터가 존재하는 경우 URL에 추가
    if (limit !== undefined || skip !== undefined) {
      const params = new URLSearchParams();
      if (limit !== undefined) params.append('limit', limit.toString());
      if (skip !== undefined) params.append('skip', skip.toString());
      url = `${url}?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || '팔로잉 목록을 불러오는 데 실패했습니다.'
      );
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('팔로잉 목록 조회 오류:', error.message);
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};
