import iconSearch from '../assets/icon-search.svg';

function TopNavigation() {
  return (
    <header className="flex items-center justify-between px-4 border-b-[1px] border-[#dbdbdb] fixed w-full h-12 z-50 bg-white">
      <h1 className="text-[18px] leading-[22px] font-medium w-26 h-[22px]">감귤마켓 피드</h1>
      <nav aria-label="검색">
        <button type="button" className="flex items-center justify-center text-gray-500 h-6 w-6" aria-label="검색">
          <img src={iconSearch} alt="" className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
}

export default TopNavigation;
