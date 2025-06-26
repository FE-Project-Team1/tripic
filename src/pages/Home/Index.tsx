import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import SearchResult from './component/SearchResult';

function Home() {
  return (
    <>
      <TopNavigation heading="Tripic" searchIcon={true} />
      <main className="pt-12">
        <SearchResult />
      </main>
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Home;
