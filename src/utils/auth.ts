/**
 * 브라우저에 쿠키를 설정하는 함수
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days 유효기간(일)
 */
export function setCookie(name: string, value: string, days: number) {
  // 현재 날짜에서 지정된 일수를 더해 만료 날짜 계산
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  // 쿠키 값 구성: 값(인코딩) + 만료일 + 경로
  const cookieValue =
    encodeURIComponent(value) + // 값 인코딩 (특수문자, 유니코드 처리)
    '; expires=' +
    expirationDate.toUTCString() + // 만료일: UTC 형식 문자열
    '; path=/'; // 경로: 전체 사이트에서 접근 가능

  // document.cookie에 문자열 할당하여 쿠키 설정
  // 참고: 기존 쿠키를 덮어쓰진 않고 새로 추가함
  document.cookie = name + '=' + cookieValue;
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
