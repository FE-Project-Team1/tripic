import { getCookie } from '../../utils/auth';

// 게시글 신고 응답 데이터 인터페이스
interface IPostReportResponse {
  message: string;
}

/**
 * 게시글을 신고하는 API 함수
 * @param postId 신고할 게시글 ID
 * @returns 신고 처리 응답 데이터
 */
export async function postReport(postId: string): Promise<IPostReportResponse> {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    if (!postId) {
      throw new Error('게시글 ID가 필요합니다.');
    }

    const url = `${import.meta.env.VITE_END_POINT}/post/${postId}/report`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        throw new Error(errorData.message || '인증 정보가 유효하지 않습니다.');
      } else if (response.status === 400) {
        throw new Error(
          errorData.message ||
            '이미 신고된 게시글이거나 유효하지 않은 요청입니다.'
        );
      } else if (response.status === 403) {
        throw new Error(
          errorData.message || '본인의 게시글은 신고할 수 없습니다.'
        );
      } else if (response.status === 404) {
        throw new Error(errorData.message || '게시글을 찾을 수 없습니다.');
      } else if (response.status === 422) {
        throw new Error(errorData.message || '유효하지 않은 게시글 ID입니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      }

      throw new Error(errorData.message || '게시글 신고에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 신고 실패:', error.message);
      throw error;
    }

    const errorMessage = '알 수 없는 오류가 발생했습니다.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
