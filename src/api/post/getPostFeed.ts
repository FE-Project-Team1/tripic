import { getCookie } from '../../utils/auth';
import type { IUserPost } from '../../types/commonType';

export interface IGetPostFeedResponse {
  posts: IUserPost[];
}

/**
 * 피드 게시글 목록을 조회하는 API 함수
 * @param limit 페이지당 게시글 수 (기본값: 10)
 * @param skip 건너뛸 게시글 수 (기본값: 0)
 * @returns 피드 게시글 목록 응답 데이터
 */
export async function getPostFeed(
  limit: number = 20,
  skip: number = 0
): Promise<IGetPostFeedResponse> {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    const params = new URLSearchParams();
    params.append('limit', String(limit));
    params.append('skip', String(skip));

    const url = `${import.meta.env.VITE_END_POINT}/post/feed/?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        throw new Error(errorData.message || '인증 정보가 유효하지 않습니다.');
      } else if (response.status === 403) {
        throw new Error(errorData.message || '피드에 접근할 권한이 없습니다.');
      } else if (response.status === 404) {
        throw new Error(errorData.message || '피드를 찾을 수 없습니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      }

      throw new Error(errorData.message || '피드 조회에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('피드 조회 실패:', error.message);
      throw error;
    }

    const errorMessage = '알 수 없는 오류가 발생했습니다.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
