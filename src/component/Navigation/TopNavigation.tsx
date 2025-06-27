import BackBtn from './BackBtn';
import SearchIcon from './SearchIcon';
import SearchInput from './SearchInput';
import SettingBtn from './SettingBtn';

interface ITopNav {
  backBtn?: boolean;
  settingBtn?: boolean;
  searchInput?: boolean;
  searchIcon?: boolean;
  heading?: string;
  headingSize?: string;
}

function TopNavigation({
  backBtn = false,
  settingBtn = false,
  searchInput = false,
  searchIcon = false,
  heading,
  headingSize = "text-[18px]",
}: ITopNav) {
  return (
    <nav className="flex items-center justify-between px-4 border-b-[1px] border-[#dbdbdb] fixed w-full h-12 z-50 bg-white">
      <div className="flex gap-2">
        {backBtn && <BackBtn />}
        {heading && (
          <h1 className={`${headingSize} leading-[22px] font-medium h-[22px] truncate whitespace-nowrap overflow-hidden`}>
            {heading}
          </h1>
        )}
      </div>
      <div>
        {searchIcon && <SearchIcon />}
        {searchInput && <SearchInput />}
        {settingBtn && <SettingBtn />}
      </div>
    </nav>
  );
}

export default TopNavigation;
