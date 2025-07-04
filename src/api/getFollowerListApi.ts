import { getCookie } from '../utils/auth';

interface FollowerUser {
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
 * 특정 계정의 팔로워 목록을 가져오는 API 호출 함수
 * @param accountname 팔로워 목록을 조회할 계정명
 * @param limit 한 번에 가져올 데이터 수(페이징)
 * @param skip 건너뛸 데이터 수(페이징)
 * @returns 팔로워 목록 또는 에러 메시지
 */
export async function getFollowerList(
  accountname: string,
  limit?: number,
  skip?: number
): Promise<FollowerUser[]> {
  try {
    const token = getCookie('token');

    // 기본 URL 생성
    const baseUrl = `${import.meta.env.VITE_END_POINT}/profile/${accountname}/follower`;

    // 페이징 파라미터가 존재하는 경우 URL에 추가
    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', limit.toString());
    if (skip !== undefined) params.append('skip', skip.toString());

    // 최종 URL 조합
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || '팔로워 목록을 불러오는 데 실패했습니다.'
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('팔로워 목록 조회 오류:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
