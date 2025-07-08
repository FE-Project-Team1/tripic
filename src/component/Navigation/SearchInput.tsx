import { useSearchContext } from '../../context/SearchContext';

function SearchInput() {
  const { keyword, setKeyword } = useSearchContext();
  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      className="flex items-center w-[316px] h-8 rounded-full bg-[#F2F2F2]"
      onSubmit={handleSumbit}
    >
      <label htmlFor="account-search-input" className="sr-only">
        계정 검색
      </label>
      <input
        id="account-search-input"
        type="text"
        placeholder="계정 검색"
        className="flex-grow outline-none text-sm bg-transparent placeholder-light-gray-02 px-4 placeholder:text-sm"
        autoFocus
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </form>
  );
}

export default SearchInput;
