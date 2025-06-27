import BottomNavigation from '../../component/BottomNavigation';
import TopNavigation from '../../component/Navigation/TopNavigation';
import FollowList from '../Follow/component/FollowList';

function Follow() {
  return (
    <>
      <TopNavigation heading="Followings" backBtn={true} />
      <FollowList />
      <BottomNavigation activePage="Profile" />
    </>
  );
}

export default Follow;