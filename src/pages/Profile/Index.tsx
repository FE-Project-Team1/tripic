import { useParams } from 'react-router-dom';
import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import Feeds from './component/Feeds';
import ProfileInfo from './component/ProfileInfo';
import TripCourse from './component/TripCourse';

// 페이지 타입 정의
type PageType = 'my-profile' | 'your-profile';

function Profile() {
  const { accountname } = useParams<{ accountname: string }>();

  // accountname 존재 여부로 페이지 타입 결정
  const pageType: PageType = accountname ? 'your-profile' : 'my-profile';

  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <main className="pt-12 pb-15">
        <ProfileInfo pageType={pageType} />
        <div className="h-[6px] bg-light-gray-03"></div>
        <TripCourse pageType={pageType} urlAccountname={accountname} />
        <div className="h-[6px] bg-light-gray-03"></div>
        <Feeds />
      </main>
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Profile;
