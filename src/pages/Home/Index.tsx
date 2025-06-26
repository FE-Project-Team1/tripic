import TopNavigation from '../../component/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import DefaultHome from './component/DefaultHome';

function Home() {
  return (
    <>
      <TopNavigation />
      <DefaultHome />
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Home;
