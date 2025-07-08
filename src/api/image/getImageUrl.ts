/**
 * 이미지 URL 생성 헬퍼 함수
 * @param filename 서버에서 반환된 파일명 또는 전체 URL
 * @returns 전체 이미지 URL
 */
export function getImageUrl(filename: string): string {
  if (!filename) return '';

  // 이미 전체 URL인 경우 그대로 반환
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }

  // 베이스 URL이 포함된 경우 처리
  if (filename.includes('dev.wenivops.co.kr/services/mandarin/')) {
    // 베이스 URL 부분을 제거하고 파일명만 추출
    const baseUrl = 'dev.wenivops.co.kr/services/mandarin/';
    const startIndex = filename.indexOf(baseUrl) + baseUrl.length;
    const cleanFilename = filename.substring(startIndex);
    return `https://dev.wenivops.co.kr/services/mandarin/${cleanFilename}`;
  }

  // 순수 파일명인 경우
  return `https://dev.wenivops.co.kr/services/mandarin/${filename}`;
}
