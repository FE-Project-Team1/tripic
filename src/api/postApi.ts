import { getCookie } from '../utils/auth';

interface IPostAuthor {
  _id: string;
  username: string;
  accountname: string;
  intro: string;
  image: string;
  isfollow: boolean;
  following: string[];
  follower: string[];
  followerCount: number;
  followingCount: number;
}

export interface IUserPost {
  id: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  hearted: boolean;
  heartCount: number;
  commentCount: number;
  author: IPostAuthor;
}

export interface IGetUserPostsResponse {
  post: IUserPost[];
}

/**
 * 특정 계정의 게시글 목록을 조회하는 API 함수
 * @param accountname 게시글을 조회할 계정명
 * @param limit 페이지당 게시글 수 (옵션)
 * @param skip 건너뛸 게시글 수 (옵션)
 * @returns 게시글 목록 응답 데이터
 */
export async function fetchUserPostsByAccount(
  accountname: string,
  limit?: number,
  skip?: number
): Promise<IGetUserPostsResponse> {
  try {
    const token = getCookie('token');
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', String(limit));
    if (skip !== undefined) params.append('skip', String(skip));

    const url = `${import.meta.env.VITE_END_POINT}/post/${accountname}/userpost${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 404) {
        throw new Error(
          errorData.message || '요청한 계정의 게시글을 찾을 수 없습니다.'
        );
      } else if (response.status === 401) {
        throw new Error(errorData.message || '인증 정보가 유효하지 않습니다.');
      }
      throw new Error(errorData.message || '게시글 목록 조회에 실패했습니다.');
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
export async function uploadPost(
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
