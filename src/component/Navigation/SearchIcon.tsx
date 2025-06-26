import { Link } from 'react-router-dom';
import iconSearch from '../../assets/icon-search.svg';

function SearchIcon() {
  return (
    <Link
      to="/search"
      type="button"
      className="flex items-center justify-center text-gray-500 h-6 w-6"
      aria-label="검색"
    >
      <img src={iconSearch} alt="" className="h-6 w-6" />
    </Link>
  );
}

export default SearchIcon;
