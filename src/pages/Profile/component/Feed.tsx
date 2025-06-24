import homeImage from '../../../assets/unsplash_FWtiv70Z_ZY.svg';
import heartBtn from '../../../assets/heart.svg';
import messageCircleBtn from '../../../assets/message-circle.svg';
import profileImage from '../../../assets/profile-img.svg';
import moreBtn from '../../../assets/s-icon-more-vertical.svg';

function Feed() {
  return (
    <article className="w-[358px] h-[434px]">
      {/* 프로필 헤더 영역 */}
      <div className="flex justify-between items-center">
        <div className="flex items-start gap-[12px]">
          <img src={profileImage} alt="프로필이미지" className="start-0" />
          <div>
            <p className="text-[14px] font-bold pt-[4px] pb-[2px] ">
              애월읍 위니브 감귤농장
            </p>
            <p className="text-[12px] text-gray w-[107px] h-[14px]">
              @weniv_Mandarin
            </p>
          </div>
        </div>
        <button>
          <img src={moreBtn} alt="더보기 버튼" />
        </button>
      </div>

      {/* 본문 영역 */}
      <p className="text-[14px] w-[304px] h-[72px]  leading-[14px] pt-[16px] pl-[54px]">
        옷을 인생을 그러므로 없으면 것은 이상은 것은 우리의 위하여, 뿐이다.
        이상의 청춘의 뼈 따뜻한 그들의 그와 약동하다. 대고, 못할 넣는 풍부하게
        뛰노는 인생의 힘있다.
      </p>

      {/* 이미지 영역 */}
      <div className="mt-[16px] mb-[12px] pl-[54px]">
        <img src={homeImage} alt="홈 이미지" />
      </div>

      {/* 좋아요, 댓글 영역 */}
      <ul className="flex items-center gap-[16px] px-[15px] pl-[54px]">
        <li className="flex items-center gap-[6px]">
          <button>
            <img src={heartBtn} alt="좋아요" />
          </button>
          <span className="text-[12px] text-gray">58</span>
        </li>
        <li className="flex items-center gap-[6px]">
          <button>
            <img src={messageCircleBtn} alt="메세지" />
          </button>
          <span className="text-[12px] text-gray">12</span>
        </li>
      </ul>

      <p className="text-[10px] text-gray mt-[16px] mb-[4px] pl-[54px] px-[15px]">
        2020년 10월 21일
      </p>
    </article>
  );
}

export default Feed;
