import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import Feeds from './component/Feeds';
import ProfileInfo from './component/ProfileInfo';
import TripCourse from './component/TripCourse';

function Profile() {
  return (
    <>
      <TopNavigation backBtn={true} settingBtn={true} />
      <ProfileInfo />
      <TripCourse />
      <Feeds />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Profile;
