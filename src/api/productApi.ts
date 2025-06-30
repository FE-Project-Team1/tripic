import { getCookie } from '../utils/auth'; 

interface IProductAuthor {
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

interface IProduct {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  author: IProductAuthor;
}

interface IGetProductsResponse {
  data: number;
  product: IProduct[];
}

/**
 * 특정 계정의 상품 목록을 조회하는 API 함수
 * @param accountname 상품을 조회할 계정명
 * @param limit 페이지당 상품 수 (옵션)
 * @param skip 건너뛸 상품 수 (옵션)
 * @returns 상품 목록 응답 데이터
 */
export async function fetchProductsByAccount(
  accountname: string,
  limit?: number,
  skip?: number
): Promise<IGetProductsResponse> {
  try {
    // getCookie 함수를 사용하여 'token' 이름의 쿠키에서 토큰을 가져옵니다.
    const token = getCookie('token'); 

    // 토큰이 없으면 오류를 throw합니다.
    if (!token) {
      throw new Error('인증 토큰이 없습니다. 로그인 상태를 확인해주세요.');
    }

    const params = new URLSearchParams();
    if (limit !== undefined) params.append('limit', String(limit));
    if (skip !== undefined) params.append('skip', String(skip));

    const url = `${import.meta.env.VITE_END_POINT}/product/${accountname}${
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
      // HTTP 상태 코드와 응답 데이터의 메시지를 기반으로 더 구체적인 오류 메시지를 제공합니다.
      if (response.status === 404) {
        throw new Error(errorData.message || '요청한 계정의 상품을 찾을 수 없습니다.');
      } else if (response.status === 401) {
        // 토큰이 없어서 발생한 401 오류와, 토큰은 있으나 유효하지 않은 401 오류를 구분하기 위해
        // 토큰 부재 시 미리 오류를 throw 했으므로, 여기서는 '유효하지 않은 토큰'으로 간주합니다.
        throw new Error(errorData.message || '인증 정보가 유효하지 않습니다.');
      }
      throw new Error(errorData.message || '상품 목록 조회에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // 이미 Error 인스턴스인 경우, 해당 오류를 다시 throw합니다.
      throw error;
    }
    // 알 수 없는 유형의 오류인 경우, 일반적인 오류 메시지를 throw합니다.
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}