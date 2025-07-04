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

/**
 * 특정 쿠키를 삭제하는 함수
 * @param name 삭제할 쿠키 이름
 * @param path 쿠키 경로 (선택사항, 기본값: '/')
 * @param domain 쿠키 도메인 (선택사항)
 */
export function deleteCookie(
  name: string,
  path: string = '/',
  domain?: string
) {
  // 쿠키 삭제는 만료일을 과거로 설정하는 방식으로 구현
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;

  // 도메인이 지정된 경우 추가
  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  // 쿠키 삭제 실행
  document.cookie = cookieString;
}

/**
 * 모든 쿠키를 삭제하는 함수
 */
export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    // 각 쿠키를 삭제
    deleteCookie(name);

    // 도메인별로도 삭제 시도 (하위 도메인 쿠키 처리)
    deleteCookie(name, '/', `.${window.location.hostname}`);
    deleteCookie(name, '/', window.location.hostname);
  }
}
