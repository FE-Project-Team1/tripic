import LoadingIcon from '../assets/icon-loading.svg';

function Loading() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full bg-white h-full"
      aria-live="polite"
    >
      <div className="flex items-center justify-center">
        <img
          src={LoadingIcon}
          alt="로딩 스피너"
          className="w-full h-full animate-spin"
        />
      </div>
      <span className={`font-bold text-main animate-pulse`} role="status">
        Loading...
      </span>
      <p className={`text-[#767676]`}>로딩중입니다. 잠시만 기다려주세요!</p>
    </div>
  );
}

export default Loading;
