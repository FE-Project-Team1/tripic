import TopNavigation from '../../component/Navigation/TopNavigation';
import BottomNavigation from '../../component/BottomNavigation';
import SearchList from './component/SearchList';
import { SearchProvider } from '../../context/SearchContext';
import { useUserSearch } from '../../hooks/useUserSearch';
import { useSearchContext } from '../../context/SearchContext';

function SearchContent() {
  const { keyword } = useSearchContext();
  const { data } = useUserSearch(keyword);

  console.log(data);

  return (
    <>
      <TopNavigation backBtn={true} searchInput={true} />
      <section className="pt-17 px-4">
        <ul className="flex flex-col gap-4">
          {data?.map((item) => (
            <SearchList
              key={item['_id']}
              username={item['username']}
              accountname={item['accountname']}
              img={item['image']}
            />
          ))}
        </ul>
      </section>
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
