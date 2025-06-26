import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';

function Search() {
  return (
    <>
      <TopNavigation backBtn={true} searchInput={true} />
      <BottomNavigation activePage="Home" />
    </>
  );
}

export default Search;
