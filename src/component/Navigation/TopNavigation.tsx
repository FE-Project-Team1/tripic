import BackBtn from './BackBtn';
import SearchIcon from './SearchIcon';
import SearchInput from './SearchInput';

interface ITopNav {
  backBtn?: boolean;
  searchInput?: boolean;
  searchIcon?: boolean;
  heading?: string;
}

function TopNavigation({
  backBtn = false,
  searchInput = false,
  searchIcon = false,
  heading,
}: ITopNav) {
  return (
    <nav className="flex items-center justify-between px-4 border-b-[1px] border-[#dbdbdb] fixed w-full h-12 z-50 bg-white">
      <div className="flex gap-2">
        {backBtn && <BackBtn />}
        {heading && (
          <h1 className="text-[18px] leading-[22px] font-medium w-26 h-[22px]">
            {heading}
          </h1>
        )}
      </div>
      <div>
        {searchIcon && <SearchIcon />}
        {searchInput && <SearchInput />}
      </div>
    </nav>
  );
}

export default TopNavigation;
