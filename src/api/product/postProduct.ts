import { getCookie } from '../../utils/auth';
import type { IProductAuthor } from './getProductsByAccount';

// 상품 업로드 요청 매개변수 타입
interface IUploadProductParams {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
}

// 상품 업로드 응답 타입
interface IUploadProductResponse {
  product: {
    id: string;
    itemName: string;
    price: number;
    link: string;
    itemImage: string;
    author: IProductAuthor;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * 상품 업로드 API 함수
 * @param productData 업로드할 상품 데이터
 * @returns 상품 업로드 응답 데이터
 */
export async function uploadProduct(
  productData: IUploadProductParams
): Promise<IUploadProductResponse> {
  try {
    // 쿠키에서 토큰 가져오기
    const token = getCookie('token');
    if (!token) {
      throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
    }

    const response = await fetch(`${import.meta.env.VITE_END_POINT}/product`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: {
          itemName: productData.itemName,
          price: productData.price,
          link: productData.link,
          itemImage: productData.itemImage,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // 서버에서 반환한 구체적인 에러 메시지 사용
      if (errorData.message) {
        throw new Error(errorData.message);
      } else if (errorData.error) {
        throw new Error(errorData.error);
      } else if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      } else if (response.status === 400) {
        throw new Error('입력한 상품 정보가 올바르지 않습니다.');
      } else if (response.status === 500) {
        throw new Error(
          '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        throw new Error(
          `상품 업로드에 실패했습니다. (상태 코드: ${response.status})`
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
