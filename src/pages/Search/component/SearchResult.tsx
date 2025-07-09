import { useSearchContext } from '../../../context/SearchContext';
import { useUserSearch } from '../../../hooks/useUserSearch';
import SearchList from './SearchList';

function SearchResult() {
  const { keyword } = useSearchContext();
  const { data } = useUserSearch(keyword);

  if (!data) {
    return null;
  }

  return (
    <section className="pt-17 pb-19 px-4">
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
  );
}

export default SearchResult;
