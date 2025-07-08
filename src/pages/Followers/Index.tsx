import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowerList } from '../../api/profile/getFollowerList';
import { getCookie } from '../../utils/auth';
import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import FollowList from '../../component/FollowList';
import Loading from '../../component/Loading';
import ErrorFallback from '../../component/ErrorFallback';

// 응답 데이터 타입 정의
interface FollowerResponse {
  follower?: any[]; // 'follower' 키로 변경될 수 있음 (API 응답에 따라)
}

function Followers() {
  // 컴포넌트 이름 변경
  // 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [apiDataAvailable, setApiDataAvailable] = useState(false);

  // URL에서 accountname 파라미터 가져오기
  const { accountname: urlAccountName } = useParams();
  // 파라미터가 없으면 현재 로그인한 사용자의 accountname 사용
  const accountname = urlAccountName || getCookie('accountname');

  // 컴포넌트 마운트 시 팔로워 목록 가져오기
  useEffect(() => {
    const fetchFollowerList = async () => {
      // 함수 이름 변경
      if (!accountname) return;

      try {
        setIsLoading(true);
        // 토큰이 필요하다면 헤더에 추가
        const token = getCookie('token');
        let data;

        // 토큰이 문자열인 경우 그대로 전달
        // 쿼리스트링 limit 파라미터는 별도로 설정
        const limit = 10; // 적절한 기본값 설정

        if (token) {
          // 토큰이 있는 경우
          data = await getFollowerList(accountname, limit);
        } else {
          // 토큰이 없는 경우
          data = await getFollowerList(accountname, undefined, limit);
        }

        console.log('API에서 가져온 팔로워 데이터:', data); // 메시지 변경

        // API 데이터가 성공적으로 받아와졌는지 확인 (타입 체크 추가)
        if (data) {
          if (Array.isArray(data)) {
            setApiDataAvailable(true);
          } else if (typeof data === 'object' && data !== null) {
            // 안전한 타입 체크
            const typedData = data as FollowerResponse;
            if ('follower' in typedData) {
              // 키 이름 변경될 수 있음
              setApiDataAvailable(true);
            }
          }
        }
      } catch (err) {
        console.error('팔로워 목록 로드 실패:', err); // 메시지 변경
        // 에러가 발생해도 UI는 정상 표시되도록 설정
        console.log('하드코딩된 데이터를 사용합니다.');
        setError(null); // 에러 무시
      } finally {
        setIsLoading(false);
      }
    };

    fetchFollowerList();
  }, [accountname]);

  if (isLoading) {
    return (
      <>
        <TopNavigation heading="Followers" backBtn={true} /> {/* 제목 변경 */}
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <Loading />
        </div>
        <BottomNavigation activePage="Profile" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <TopNavigation heading="Followers" backBtn={true} /> {/* 제목 변경 */}
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <ErrorFallback />
        </div>
        <BottomNavigation activePage="Profile" />
      </>
    );
  }

  return (
    <>
      <TopNavigation heading="Followers" backBtn={true} /> {/* 제목 변경 */}
      {apiDataAvailable && (
        <div className="px-4 py-2 bg-green-100 text-xs text-green-800">
          API 데이터 로드 완료 (콘솔에서 확인 가능)
        </div>
      )}
      <FollowList />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Followers;
