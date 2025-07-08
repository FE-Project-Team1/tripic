import { getCookie } from '../../utils/auth';
import type { IUserPost } from './getUserPostsByAccount';

// 게시글 수정 요청 데이터 인터페이스
interface IUpdatePostRequest {
  content: string;
  image: string; // "imageurl1, imageurl2" 형식
}

// 게시글 수정 응답 데이터 인터페이스
interface IUpdatePostResponse {
  post: IUserPost;
}

/**
 * 기존 게시글을 수정하는 API 함수
 * @param postId 수정할 게시글 ID
 * @param postData 수정할 게시글 데이터
 * @returns 수정된 게시글 응답 데이터
 */
export async function putPost(
  postId: string,
  postData: IUpdatePostRequest
): Promise<IUpdatePostResponse> {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    if (!postId) {
      throw new Error('게시글 ID가 필요합니다.');
    }

    const url = `${import.meta.env.VITE_END_POINT}/post/${postId}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        post: {
          content: postData.content,
          image: postData.image,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        throw new Error(errorData.message || '인증 정보가 유효하지 않습니다.');
      } else if (response.status === 400) {
        throw new Error(
          errorData.message || '게시글 데이터가 유효하지 않습니다.'
        );
      } else if (response.status === 403) {
        throw new Error(
          errorData.message || '이 게시글을 수정할 권한이 없습니다.'
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

      throw new Error(errorData.message || '게시글 수정에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('게시글 수정 실패:', error.message);
      throw error;
    }

    const errorMessage = '알 수 없는 오류가 발생했습니다.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
