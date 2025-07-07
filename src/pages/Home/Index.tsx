import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import Feeds from './component/Feeds';

function Home() {
  return (
    <>
      <TopNavigation heading="Tripic" searchIcon={true} />
      <Feeds />
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Home;
