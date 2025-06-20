import TopNavigation from '../../component/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import SearchResult from './component/SearchResult';

function Home() {
  return (
    <>
      <TopNavigation />
      <SearchResult />
      <BottomNavigation />
    </>
  );
}

export default Home;
