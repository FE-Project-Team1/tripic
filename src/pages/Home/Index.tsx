import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import Feeds from './component/Feeds';
import BottomModal from '../../component/BottomModal';

function Home() {
  return (
    <>
      <TopNavigation heading="Tripic" searchIcon={true} />
      <Feeds />
      <BottomNavigation activePage="Home" />
      <BottomModal />
    </>
  );
}

export default Home;
