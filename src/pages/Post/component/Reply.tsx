import loVer from '../../../assets/Ellipse 40.svg'
import moreVertical from '../../../assets/more-vertical.svg';

function Reply() {
  return (
    <article className="bg-white max-w-md mx-auto mb-[66px]">
      <div className="flex items-center justify-between mb-[4px]">
        <div className="flex items-center gap-[12px]">
          <img src={loVer} alt="프로필 사진" />
          <div className="flex items-center gap-[6px]">
            <span className="font-medium text-sm">감귤러버</span>
            <time className="text-[10px] text-gray">· 15분 전</time>
          </div>
        </div>
        <button>
          <img src={moreVertical} alt="더보기 버튼" />
        </button>
      </div>
      <p className="w-[310px] h-[36px] text-[#333333] text-sm pl-[48px] tracking-tight">
        안녕하세요. 사진이 너무 멋있어요. 한라봉 언제 먹을 수 있나요? 기다리기 지쳤어요 땡뻘땡뻘...
      </p>
    </article>
  );
}

export default Reply;