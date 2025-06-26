import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import Feeds from './component/Feeds';
import ProfileInfo from './component/ProfileInfo';
import TripCourse from './component/TripCourse';

function Profile() {
  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <main className="pt-12 pb-15">
        <ProfileInfo />
        <div className="h-[6px] bg-light-gray-03"></div>
        <TripCourse />
        <div className="h-[6px] bg-light-gray-03"></div>
        <Feeds />
      </main>
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Profile;
