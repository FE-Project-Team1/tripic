import basicProfile from "../../../assets/basic-profile.svg";

function SearchResult() {
    return (
        <article className="flex items-center gap-2 py-2 bg-yellow-100 mt-12">
        <figure className="w-8 h-8 rounded-full bg-[#dbdbdb] flex items-center justify-center overflow-hidden">
            <img
            src={basicProfile}
            alt="프로필 이미지"
            className="w-6 h-6 object-cover"
            />
        </figure>
        <div>
            <h2 className="text-sm font-normal flex items-center">
            <span className="text-[color:var(--color-main)] font-medium mr-1">애월읍</span>
            <span className="text-black">위니브 감귤농장</span>
            </h2>
            <p className="text-xs text-[color:var(--color-gray)]">@weniv_Mandarin</p>
        </div>
        </article>
    );
}

export default SearchResult;
