import { getCookie } from '../../utils/auth';
import type { IUserPost } from './getUserPostsByAccount';

// 게시글 업로드 요청 데이터 인터페이스
interface IUploadPostRequest {
  content: string;
  image: string; // "imageurl1, imageurl2" 형식
}

// 게시글 업로드 응답 데이터 인터페이스
interface IUploadPostResponse {
  post: IUserPost;
}

/**
 * 새 게시글을 업로드하는 API 함수
 * @param postData 업로드할 게시글 데이터
 * @returns 업로드된 게시글 응답 데이터
 */
export async function postPost(
  postData: IUploadPostRequest
): Promise<IUploadPostResponse> {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    const response = await fetch(`${import.meta.env.VITE_END_POINT}/post`, {
      method: 'POST',
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
      }
      throw new Error(errorData.message || '게시글 업로드에 실패했습니다.');
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
