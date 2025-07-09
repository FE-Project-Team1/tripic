import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import { SearchProvider } from '../../context/SearchContext';
import SearchResult from './component/SearchResult';

function SearchContent() {
  return (
    <>
      <TopNavigation backBtn={true} searchInput={true} />
      <SearchResult />
      <BottomNavigation activePage="Home" />
    </>
  );
}

function Search() {
  return (
    <SearchProvider>
      <SearchContent />
    </SearchProvider>
  );
}

export default Search;
