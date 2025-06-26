import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import SearchResult from './component/SearchResult';

function Search() {
  return (
    <>
      <TopNavigation backBtn={true} searchInput={true} />
      <SearchResult />
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Search;
