/**
 * 이미지 업로드 응답 인터페이스
 */
interface ImageUploadResponse {
  filename: string; // 업로드된 파일 이름
  extension: string; // 파일 확장자
  originalname: string; // 원본 파일 이름
  message: string; // 업로드 결과 메시지
}

/**
 * 이미지 파일 업로드 API 호출 함수
 * @param imageFile 업로드할 이미지 파일
 * @returns 업로드된 이미지 정보
 */
export async function uploadImage(
  imageFile: File
): Promise<ImageUploadResponse> {
  try {
    // FormData 객체 생성 (multipart/form-data 형식으로 전송)
    const formData = new FormData();
    formData.append('image', imageFile); // 서버에서 요구하는 키 이름으로 파일 추가

    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/image/uploadfile`,
      {
        method: 'POST',
        body: formData,
        // Content-type은 자동으로 multipart/form-data로 설정됨
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '이미지 업로드에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      alert(error);
      throw error;
    }
    throw new Error('이미지 업로드 중 오류가 발생했습니다.');
  }
}

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param filename 서버에서 반환된 파일명
 * @returns 전체 이미지 URL
 */
export function getImageUrl(filename: string): string {
  console.log(filename);
  return `https://dev.wenivops.co.kr/services/mandarin/${filename}`;
}
