import { Link } from 'react-router-dom';
import basicProfile from '../../../assets/basic-profile.svg';
import { useSearchContext } from '../../../context/SearchContext';
import { HighlightText } from '../../../utils/highlightText';

interface ISearchList {
  username: string;
  accountname: string;
  img: string;
}

const BASICPROFILE = '/Ellipse.png';

function SearchList({ username, accountname, img }: ISearchList) {
  const { keyword } = useSearchContext();

  return (
    <li>
      <Link
        to={`/your-profile/${accountname}`}
        className="flex items-center gap-3"
      >
        <figure className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={img === BASICPROFILE ? basicProfile : img}
            alt="사용자 프로필 이미지"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </figure>
        <div className="flex flex-col space-y-[6px]">
          <h2 className="text-sm font-medium flex items-center">
            <HighlightText text={username} searchTerm={keyword} />
          </h2>
          <p className="text-xs text-[color:var(--color-gray)]">
            @{accountname}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default SearchList;
