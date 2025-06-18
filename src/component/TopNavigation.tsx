import iconSearch from '../assets/icon-search.svg';

function TopNavigation() {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b-[1px] border-[#dbdbdb] fixed w-full z-50 bg-white">
      <div className="text-lg font-medium">감귤마켓 피드</div>
      <div className="text-gray-500">
        <img src={iconSearch} alt="Search" className="h-6 w-6" />
      </div>
    </div>
  );
}

export default TopNavigation;
