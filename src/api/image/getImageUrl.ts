/**
 * 이미지 URL 생성 헬퍼 함수
 * @param filename 서버에서 반환된 파일명
 * @returns 전체 이미지 URL
 */
export function getImageUrl(filename: string): string {
  if (!filename) return '';
  return `https://dev.wenivops.co.kr/services/mandarin/${filename}`;
}
