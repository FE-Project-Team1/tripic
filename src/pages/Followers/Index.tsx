import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import FollowList from '../../component/FollowList';

function Followers() {
  return (
    <>
      <TopNavigation heading="Followings" backBtn={true} />
      <FollowList />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Followers;
