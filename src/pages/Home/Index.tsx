import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import DefaultHome from './component/DefaultHome';

function Home() {
  return (
    <>
      <TopNavigation heading="Tripic" searchIcon={true} />
      <DefaultHome />
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Home;
