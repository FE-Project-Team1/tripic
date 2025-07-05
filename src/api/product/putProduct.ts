import { getCookie } from '../../utils/auth';

// 상품 수정 요청 타입
interface IPutProductRequest {
  product: {
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
  };
}

// 상품 수정 응답 타입
interface IPutProductResponse {
  product: {
    id: string;
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
    author: {
      _id: string;
      username: string;
      accountname: string;
      following: [];
      follower: [];
      followerCount: number;
      followingCount: number;
      image: string;
    };
  };
}

/**
 * 상품 수정 API 함수
 * @param productId 수정할 상품의 ID
 * @param productData 수정할 상품 데이터
 * @returns 수정된 상품 정보 응답 데이터
 */
export async function putProduct(
  productId: string,
  productData: IPutProductRequest['product']
): Promise<IPutProductResponse> {
  try {
    // 쿠키에서 토큰 가져오기
    const token = getCookie('token');
    if (!token) {
      throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
    }

    if (!productId) {
      throw new Error('상품 ID가 필요합니다.');
    }

    // 요청 데이터 유효성 검증
    if (
      !productData.itemName ||
      !productData.price ||
      !productData.link ||
      !productData.itemImage
    ) {
      throw new Error('모든 상품 정보를 입력해주세요.');
    }

    if (productData.itemName.length < 2 || productData.itemName.length > 15) {
      throw new Error('상품명은 2~15자 이내여야 합니다.');
    }

    if (productData.price < 1) {
      throw new Error('가격은 1원 이상이어야 합니다.');
    }

    const requestBody: IPutProductRequest = {
      product: productData,
    };

    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/product/${productId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      // 서버에서 반환한 구체적인 에러 메시지 사용
      if (errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error) {
        throw new Error(errorData.error);
      } else if (response.status === 400) {
        throw new Error('잘못된 요청입니다. 입력 정보를 확인해주세요.');
      } else if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (response.status === 403) {
        throw new Error('이 상품을 수정할 권한이 없습니다.');
      } else if (response.status === 404) {
        throw new Error('수정하려는 상품을 찾을 수 없습니다.');
      } else if (response.status === 422) {
        throw new Error('입력 데이터가 올바르지 않습니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(
          `상품 수정에 실패했습니다. (상태 코드: ${response.status})`
        );
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
