import CommonBtn from '../../component/CommonBtn';
import icon404 from '../../assets/icon-404.svg';

function ErrorPage() {
  return (
    <main className="flex flex-col items-center text-center min-h-screen">
      <figure className="mt-56 mb-[30px]">
        <img
          src={icon404}
          alt="404 에러 아이콘"
          className="w-[158px] h-[158px] mx-auto"
        />
      </figure>
      <p className="text-sm text-[#767676] mb-5">
        페이지를 찾을 수 없습니다. :(
      </p>
      <div className="w-[120px]">
        <CommonBtn text="이전 페이지" />
      </div>
    </main>
  );
}

export default ErrorPage;
