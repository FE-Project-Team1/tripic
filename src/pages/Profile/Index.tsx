import { useParams } from 'react-router-dom';
import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import Feeds from './component/Feeds';
import ProfileInfo from './component/ProfileInfo';
import TripCourse from './component/TripCourse';
import { getCookie } from '../../utils/auth'; // getCookie 함수 임포트

// 페이지 타입 정의
type PageType = 'my-profile' | 'your-profile';

function Profile() {
  const { accountname: urlAccountname } = useParams<{ accountname: string }>();

  // accountname 존재 여부로 페이지 타입 결정
  const pageType: PageType = urlAccountname ? 'your-profile' : 'my-profile';

  // Feeds 컴포넌트에 전달할 최종 accountname 결정
  // 'my-profile'일 경우 쿠키에서, 'your-profile'일 경우 URL 파라미터에서 가져옵니다.
  // 이 로직은 TripCourse 내부에서 이미 처리되고 있지만, Feeds도 동일하게 필요합니다.
  const displayAccountname =
    pageType === 'my-profile' ? getCookie('accountname') : urlAccountname;

  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <main className="pt-12 pb-15">
        <ProfileInfo pageType={pageType} />
        <div className="h-[6px] bg-light-gray-03"></div>
        <TripCourse pageType={pageType} urlAccountname={urlAccountname} />
        <div className="h-[6px] bg-light-gray-03"></div>
        <Feeds accountname={displayAccountname} />
      </main>
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Profile;