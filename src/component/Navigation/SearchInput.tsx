function SearchInput() {
  return (
    <form className="flex items-center w-[316px] h-8 rounded-full bg-[#F2F2F2]">
      <label htmlFor="account-search-input" className="sr-only">
        계정 검색
      </label>
      <input
        id="account-search-input"
        type="text"
        placeholder="계정 검색"
        className="flex-grow outline-none text-sm bg-transparent placeholder-light-gray-02 px-4 placeholder:text-sm"
        autoFocus
      />
    </form>
  );
}

export default SearchInput;
