import BackBtn from './BackBtn';
import SearchIcon from './SearchIcon';
import SearchInput from './SearchInput';
import SettingBtn from './SettingBtn';
import CommonBtn from '../CommonBtn';

interface ITopNav {
  backBtn?: boolean;
  settingBtn?: boolean;
  searchInput?: boolean;
  searchIcon?: boolean;
  heading?: string;
  headingSize?: string;
  saveBtn?: boolean;
}

function TopNavigation({
  backBtn = false,
  settingBtn = false,
  searchInput = false,
  searchIcon = false,
  heading,
  headingSize = 'text-[18px]',
  saveBtn = false,
}: ITopNav) {
  return (
    <nav className="flex items-center justify-between px-4 border-b-[1px] border-[#dbdbdb] fixed w-full h-12 z-50 bg-white">
      <div className="flex gap-2">
        {backBtn && <BackBtn />}
        {heading && (
          <h1
            className={`${headingSize} leading-[22px] font-medium h-[22px] truncate whitespace-nowrap overflow-hidden`}
          >
            {heading}
          </h1>
        )}
      </div>
      <div>
        {searchIcon && <SearchIcon />}
        {searchInput && <SearchInput />}
        {settingBtn && <SettingBtn />}
        {saveBtn && (
          <div className="w-[90px]">
            <CommonBtn text="저장" size="small" disabled={true} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default TopNavigation;
