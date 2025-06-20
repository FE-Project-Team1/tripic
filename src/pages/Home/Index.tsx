import TopNavigation from '../../component/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import SearchResult from './component/SearchResult';

function Home() {
  return (
    <>
      <TopNavigation />
      <main className='pt-12'>
        <SearchResult />
      </main>
      <BottomNavigation />
    </>
  );
}

export default Home;
