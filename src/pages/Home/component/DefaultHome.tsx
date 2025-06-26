import symbolLogo from '../../../assets/symbol-logo.svg';
import CommonBtn from '../../../component/CommonBtn';

function DefaultHome() {
  return (
    <section className="flex flex-col min-h-screen justify-center items-center gap-5">
      <h2 className="sr-only">유저 검색</h2>
      <img
        src={symbolLogo}
        alt={symbolLogo}
        className="w-[100px] h-[100px] inline-block"
      ></img>
      <p className="text-sm color-gray">유저를 검색해 팔로우 해보세요!</p>
      <div className="w-30">
        <CommonBtn text="검색하기" />
      </div>
    </section>
  );
}

export default DefaultHome;
