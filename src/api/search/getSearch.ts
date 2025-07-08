import { getCookie } from '../../utils/auth';

// 사용자 검색 응답 타입
type SearchResponse = {
  _id: string;
  username: string;
  accountname: string;
  following: [];
  follower: [];
  followerCount: number;
  followingCount: number;
  image: string;
  isfollow: boolean;
}[];

/**
 * 사용자 검색 API 함수
 * @param keyword 검색할 키워드
 * @returns 검색된 사용자 목록 응답 데이터
 */
export async function getSearch(keyword: string): Promise<SearchResponse> {
  try {
    // 쿠키에서 토큰 가져오기
    const token = getCookie('token');
    if (!token) {
      throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
    }

    if (!keyword) {
      throw new Error('검색 키워드가 필요합니다.');
    }

    // 키워드 URL 인코딩
    const encodedKeyword = encodeURIComponent(keyword);

    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/user/searchuser/?keyword=${encodedKeyword}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      // 서버에서 반환한 구체적인 에러 메시지 사용
      if (errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error) {
        throw new Error(errorData.error);
      } else if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (response.status === 403) {
        throw new Error('검색할 권한이 없습니다.');
      } else if (response.status === 404) {
        throw new Error('검색 결과를 찾을 수 없습니다.');
      } else if (response.status === 422) {
        throw new Error('검색 키워드가 올바르지 않습니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(`검색에 실패했습니다. (상태 코드: ${response.status})`);
      }
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
