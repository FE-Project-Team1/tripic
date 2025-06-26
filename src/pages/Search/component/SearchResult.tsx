import basicProfile from '../../../assets/basic-profile.svg';

function List() {
  return (
    <li className="px-4 flex items-center gap-3">
      <figure className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
        <img
          src={basicProfile}
          alt="사용자 프로필 이미지"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="flex flex-col space-y-[6px]">
        <h2 className="text-sm font-medium flex items-center">
          <span className="text-[color:var(--color-main)] font-medium mr-1">
            애월읍
          </span>
          <span className="text-black">위니브 감귤농장</span>
        </h2>
        <p className="text-xs text-[color:var(--color-gray)]">
          @ weniv_Mandarin
        </p>
      </div>
    </li>
  );
}

function SearchResult() {
  return (
    <ul className="min-h-screen pt-17">
      <List />
    </ul>
  );
}

export default SearchResult;
