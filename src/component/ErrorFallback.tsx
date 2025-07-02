import ErrorIcon from '../assets/icon-error.svg';

function ErrorFallback() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full">
      <div className={`animate-bounce`}>
        <img src={ErrorIcon} alt="에러 아이콘" className="" />
      </div>
      <span className={`font-bold text-red-500`}>에러 발생!</span>
      <p className={` text-[#767676] text-center`}>
        데이터를 불러오는 중 에러가 발생했습니다.
      </p>
    </section>
  );
}

export default ErrorFallback;
