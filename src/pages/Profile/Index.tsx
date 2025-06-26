import BottomNavigation from '../../component/BottomNavigation';
import Feeds from './component/Feeds';

function Profile() {
  return (
    <>
      <Feeds />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Profile;
